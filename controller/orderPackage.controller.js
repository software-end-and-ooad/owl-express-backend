import Validator from 'validatorjs'
import jwt from 'jsonwebtoken'

import Order from '../models/Order';
import Handler from './handlers/handlers';
import jwtconfig from '../config/jwtconfig'

function OrderPackageController(req, res) {
  const header = req.headers['authorization']
  const token = Handler.getTokenFormHeader(header) // Get token from authorization

  jwt.verify(token, jwtconfig.secret, async function(err, decoded) {

    if (!err) {

      const userId = decoded.sub

      const {
        size,
        transportType,
        srcSubdistrict,
        srcDistrict,
        srcProvince,
        srcAddressOther,
        destSubdistrict,
        destDistrict,
        destProvince,
        destAddressOther,
        pickupDate
      } = req.body

      const data = {
        userId: userId,
        size: size,
        transportType: transportType,
        srcSubdistrict: srcSubdistrict,
        srcDistrict: srcDistrict,
        srcProvince: srcProvince,
        srcAddressOther: srcAddressOther,
        destSubdistrict: destSubdistrict,
        destDistrict: destDistrict,
        destProvince: destProvince,
        destAddressOther: destAddressOther,
        pickupDate: pickupDate,
        present: new Date() // Use for validate pickupDate (present Time)
      }

      const rules = {
        size: 'in:XL,L,M,S|string',
        transportType: 'required|string|in:EMS,sameday',
        srcSubdistrict: 'required|integer',
        srcDistrict: 'required|integer',
        srcProvince: 'required|integer',
        srcAddressOther: 'required|string|max:255',
        destSubdistrict: 'required|integer',
        destDistrict: 'required|integer',
        destProvince: 'required|integer',
        destAddressOther: 'required|string|max:255',
        pickupDate: 'date|after:present'
      };

      const errMessage = {
        required: ':attribute_IS_REQUIRED',
        in: ':attribute_IS_NOT_IN_SPECIFICATIONS',
        integer: ':attribute_MUST_BE_INTEGER',
        max: ':attribute_MUST_LESS_THAN_:max',
        string: ':attribute_MUST_BE_STRING',
        date: ':attribute_MUST_BE_DATE',
        after: ':attribute_MUST_AFTER_PRESENT',
      }

      const validation = new Validator(data, rules, errMessage);

      validation.passes(async function() {

        const track = await Handler.genTrackNumber() // Generate track number

        const data_db = {
          user_id: userId,
          track: track,
          size: size,
          transport_type: transportType,
          src_subdistrict: srcSubdistrict,
          src_district: srcDistrict,
          src_province: srcProvince,
          src_address_other: srcAddressOther,
          dest_subdistrict: destSubdistrict,
          dest_district: destDistrict,
          dest_province: destProvince,
          dest_address_other: destAddressOther,
          pickup_date: pickupDate
        }
        if (pickupDate==undefined || pickupDate==null || pickupDate=='')
          delete data_db.pickup_date

        const results = await Order.create(data_db)
        data.track = track // Append track property into data
        const obj = data
        delete obj.present


        res.status(200).json({ success: true, data: data })
      })


      validation.fails(function() {
        const errMsg = validation.errors.all()
        res.status(400).json({ success: false, data: errMsg})
      })



    } else {
      // Custom popular jwt error message
      if (err.message == 'jwt expired')
        err.message = 'TOKEN_EXPIRED'
      else if(err.message == 'invalid signature') // jwt secret is not match || token not match
        err.message = 'TOKEN_INVALID'
      else if(err.message == 'jwt must be provided')
        err.message = 'TOKEN_MUST_BE_PROVIDED'

      res.status(401).json({ sucess: false, data: err.message })
    }
  });
}

module.exports = OrderPackageController
