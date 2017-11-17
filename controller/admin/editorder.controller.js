import jwt from 'jsonwebtoken'
import Validator from 'validatorjs'

import Order from '../../models/Order'
import jwtconfig from '../../config/jwtconfig'
import handler from '../handlers/handlers';

function EditOrderController(req, res) {

  const header = req.headers['authorization']
  const token = handler.getTokenFormHeader(header) // Get token from authorization

  jwt.verify(token, jwtconfig.adminSecret, async function(err, decoded) {

    if (!err) {
      const {
        track,
        price,
        size,
        pickupDate,
        status,
        tell,
        transportType,
        postmanId,
        srcSubdistrict,
        srcDistrict,
        srcProvince,
        srcAddressOther,
        destSubdistrict,
        destDistrict,
        destProvince,
        destAddressOther,
      } = req.body

      const data = {
        track: track,
        price: price,
        size: size,
        pickupDate: pickupDate,
        status: status,
        tell: tell,
        transportType: transportType,
        postmanId: postmanId,
        srcSubdistrict: srcSubdistrict,
        srcDistrict: srcDistrict,
        srcProvince: srcProvince,
        srcAddressOther: srcAddressOther,
        destSubdistrict: destSubdistrict,
        destDistrict: destDistrict,
        destProvince: destProvince,
        destAddressOther: destAddressOther,
        present: new Date() // Use for validate pickupDate (present Time)
      }

      const rules = {
        price: 'integer',
        size: 'string|in:XL,L,M,S',
        pickupDate: 'date|after:present',
        status: 'integer|in:1,2,3,4',
        tell: 'required|min:9|max:10', //unique
        transportType: 'required|string|in:EMS,sameday',
        postmanId: 'integer', //unique
        srcSubdistrict: 'required|integer',
        srcDistrict: 'required|integer',
        srcProvince: 'required|integer',
        srcAddressOther: 'required|max:255|string',
        destSubdistrict: 'required|integer',
        destDistrict: 'required|integer',
        destProvince: 'required|integer',
        destAddressOther: 'required|max:255|string',
      };

      const errMessage = {
        required: ':attribute_IS_REQUIRED',
        max: ':attribute_MUST_LESS_THAN_:max',
        min: ':attribute_MUST_MORE_THAN_:min',
        string: ':attribute_MUST_BE_STRING',
        integer: ':attribute_MUST_BE_INTEGER',
        in: ':attribute_IS_NOT_IN_SPECIFIC',
        between: ':attribute_MUST_BE_IN_RANGE'
      }

      const validation = new Validator(data, rules, errMessage);

      validation.passes(async function() {

        const userId = decoded.sub
        if (track != undefined) {

          const update = await Order.update({
            price: price<0? 0: price,
            size: size,
            pickupDate: pickupDate,
            status: status,
            tell: tell,
            transportType: transportType,
            postman_id: postmanId==''? null: postmanId==undefined? null: postmanId,
            src_subdistrict: srcSubdistrict==undefined? null: srcSubdistrict==''? null: srcSubdistrict,
            src_district: srcDistrict==undefined? null: srcDistrict==''? null: srcDistrict,
            src_province: srcProvince==undefined? null: srcProvince==''? null: srcProvince,
            src_address_other: srcAddressOther==undefined? null: srcAddressOther==''? null: srcAddressOther,
            dest_subdistrict: destSubdistrict==undefined? null: destSubdistrict==''? null: destSubdistrict,
            dest_district: destDistrict==undefined? null: destDistrict==''? null: destDistrict,
            dest_province: destProvince==undefined? null: destProvince==''? null: destProvince,
            dest_address_other: destAddressOther==undefined? null: destAddressOther==''? null: destAddressOther,
          }, {
            where: {
              track: track
            },
          })

          if (update[0] > 0) { // If found id and updated

            res.status(200).json({ sucess: true })
          } else {

            res.status(401).json({ sucess: false })
          }

        } else {

          res.status(400).json({ sucess: false, data: 'track_IS_REQUIRED' })
        }
      })

      validation.fails(function() {
        const errMsg = validation.errors.all()
        res.status(400).json({ success: false, data: errMsg})
      })

    } else {
      // Custom popular jwt error message
      if (err.message == 'jwt expired')
        err.message = 'TOKEN_EXPIRED'
      else if(err.message == 'invalid signature') // jwt admin secret is not match || token not match
        err.message = 'TOKEN_INVALID'
      else if(err.message == 'jwt must be provided')
        err.message = 'TOKEN_MUST_BE_PROVIDED'

      res.status(401).json({ sucess: false, data: err.message })
    }
  });

}

module.exports = EditOrderController

import Order from '../../models/Order'
import jwtconfig from '../../config/jwtconfig'
import handler from '../handlers/handlers';

function EditOrderController(req, res) {

  const header = req.headers['authorization']
  const token = handler.getTokenFormHeader(header) // Get token from authorization

  jwt.verify(token, jwtconfig.adminSecret, async function(err, decoded) {

    if (!err) {
      const {
        track,
        price,
        size,
        pickupDate,
        status,
        tell,
        transportType,
        postmanId,
        srcSubdistrict,
        srcDistrict,
        srcProvince,
        srcAddressOther,
        destSubdistrict,
        destDistrict,
        destProvince,
        destAddressOther,
      } = req.body

      const data = {
        track: track,
        price: price,
        size: size,
        pickupDate: pickupDate,
        status: status,
        tell: tell,
        transportType: transportType,
        postmanId: postmanId,
        srcSubdistrict: srcSubdistrict,
        srcDistrict: srcDistrict,
        srcProvince: srcProvince,
        srcAddressOther: srcAddressOther,
        destSubdistrict: destSubdistrict,
        destDistrict: destDistrict,
        destProvince: destProvince,
        destAddressOther: destAddressOther,
        present: new Date() // Use for validate pickupDate (present Time)
      }

      const rules = {
        price: 'integer',
        size: 'string|in:XL,L,M,S',
        pickupDate: 'date|after:present',
        status: 'integer|in:1,2,3,4',
        tell: 'required|min:9|max:10', //unique
        transportType: 'required|string|in:EMS,sameday',
        postmanId: 'integer', //unique
        srcSubdistrict: 'required|integer',
        srcDistrict: 'required|integer',
        srcProvince: 'required|integer',
        srcAddressOther: 'required|max:255|string',
        destSubdistrict: 'required|integer',
        destDistrict: 'required|integer',
        destProvince: 'required|integer',
        destAddressOther: 'required|max:255|string',
      };

      const errMessage = {
        required: ':attribute_IS_REQUIRED',
        max: ':attribute_MUST_LESS_THAN_:max',
        min: ':attribute_MUST_MORE_THAN_:min',
        string: ':attribute_MUST_BE_STRING',
        integer: ':attribute_MUST_BE_INTEGER',
        in: ':attribute_IS_NOT_IN_SPECIFIC',
        between: ':attribute_MUST_BE_IN_RANGE'
      }

      const validation = new Validator(data, rules, errMessage);

      validation.passes(async function() {

        const userId = decoded.sub
        if (track != undefined) {

          const update = await Order.update({
            price: price<0? 0: price,
            size: size,
            pickupDate: pickupDate,
            status: status,
            tell: tell,
            transportType: transportType,
            postmanId: postmanId,
            src_subdistrict: srcSubdistrict==undefined? null: srcSubdistrict==''? null: srcSubdistrict,
            src_district: srcDistrict==undefined? null: srcDistrict==''? null: srcDistrict,
            src_province: srcProvince==undefined? null: srcProvince==''? null: srcProvince,
            src_address_other: srcAddressOther==undefined? null: srcAddressOther==''? null: srcAddressOther,
            dest_subdistrict: destSubdistrict==undefined? null: destSubdistrict==''? null: destSubdistrict,
            dest_district: destDistrict==undefined? null: destDistrict==''? null: destDistrict,
            dest_province: destProvince==undefined? null: destProvince==''? null: destProvince,
            dest_address_other: destAddressOther==undefined? null: destAddressOther==''? null: destAddressOther,
          }, {
            where: {
              track: track
            },
          })

          if (update[0] > 0) { // If found id and updated

            res.status(200).json({ sucess: true })
          } else {

            res.status(401).json({ sucess: false })
          }

        } else {

          res.status(400).json({ sucess: false, data: 'track_IS_REQUIRED' })
        }
      })

      validation.fails(function() {
        const errMsg = validation.errors.all()
        res.status(400).json({ success: false, data: errMsg})
      })

    } else {
      // Custom popular jwt error message
      if (err.message == 'jwt expired')
        err.message = 'TOKEN_EXPIRED'
      else if(err.message == 'invalid signature') // jwt admin secret is not match || token not match
        err.message = 'TOKEN_INVALID'
      else if(err.message == 'jwt must be provided')
        err.message = 'TOKEN_MUST_BE_PROVIDED'

      res.status(401).json({ sucess: false, data: err.message })
    }
  });

}

module.exports = EditOrderController

import Order from '../../models/Order'
import jwtconfig from '../../config/jwtconfig'
import handler from '../handlers/handlers';

function EditOrderController(req, res) {

  const header = req.headers['authorization']
  const token = handler.getTokenFormHeader(header) // Get token from authorization

  jwt.verify(token, jwtconfig.adminSecret, async function(err, decoded) {

    if (!err) {
      const {
        track,
        price,
        size,
        pickupDate,
        status,
        tell,
        transportType,
        postmanId,
        srcSubdistrict,
        srcDistrict,
        srcProvince,
        srcAddressOther,
        destSubdistrict,
        destDistrict,
        destProvince,
        destAddressOther,
      } = req.body

      const data = {
        track: track,
        price: price,
        size: size,
        pickupDate: pickupDate,
        status: status,
        tell: tell,
        transportType: transportType,
        postmanId: postmanId,
        srcSubdistrict: srcSubdistrict,
        srcDistrict: srcDistrict,
        srcProvince: srcProvince,
        srcAddressOther: srcAddressOther,
        destSubdistrict: destSubdistrict,
        destDistrict: destDistrict,
        destProvince: destProvince,
        destAddressOther: destAddressOther,
        present: new Date() // Use for validate pickupDate (present Time)
      }

      const rules = {
        price: 'integer',
        size: 'string|in:XL,L,M,S',
        pickupDate: 'date|after:present',
        status: 'integer|in:1,2,3,4',
        tell: 'required|min:9|max:10', //unique
        transportType: 'required|string|in:EMS,sameday',
        postmanId: 'integer', //unique
        srcSubdistrict: 'required|integer',
        srcDistrict: 'required|integer',
        srcProvince: 'required|integer',
        srcAddressOther: 'required|max:255|string',
        destSubdistrict: 'required|integer',
        destDistrict: 'required|integer',
        destProvince: 'required|integer',
        destAddressOther: 'required|max:255|string',
      };

      const errMessage = {
        required: ':attribute_IS_REQUIRED',
        max: ':attribute_MUST_LESS_THAN_:max',
        min: ':attribute_MUST_MORE_THAN_:min',
        string: ':attribute_MUST_BE_STRING',
        integer: ':attribute_MUST_BE_INTEGER',
        in: ':attribute_IS_NOT_IN_SPECIFIC',
        between: ':attribute_MUST_BE_IN_RANGE'
      }

      const validation = new Validator(data, rules, errMessage);

      validation.passes(async function() {

        const officer_no = decoded.pmi // my postman_id
        if (track != undefined) {
          if (officer_no != postmanId) { // protect update order that accepted by other postman

            const update = await Order.update({
              price: price<0? 0: price,
              size: size,
              pickupDate: pickupDate,
              status: status,
              tell: tell,
              transportType: transportType,
              postmanId: postmanId,
              src_subdistrict: srcSubdistrict==undefined? null: srcSubdistrict==''? null: srcSubdistrict,
              src_district: srcDistrict==undefined? null: srcDistrict==''? null: srcDistrict,
              src_province: srcProvince==undefined? null: srcProvince==''? null: srcProvince,
              src_address_other: srcAddressOther==undefined? null: srcAddressOther==''? null: srcAddressOther,
              dest_subdistrict: destSubdistrict==undefined? null: destSubdistrict==''? null: destSubdistrict,
              dest_district: destDistrict==undefined? null: destDistrict==''? null: destDistrict,
              dest_province: destProvince==undefined? null: destProvince==''? null: destProvince,
              dest_address_other: destAddressOther==undefined? null: destAddressOther==''? null: destAddressOther,
            }, {
              where: {
                track: track
              },
            })

            if (update[0] > 0) { // If found id and updated

              res.status(200).json({ sucess: true })
            } else {

              res.status(401).json({ sucess: false })
            }

          } else {

            res.status(400).json({ sucess: false, data: 'CANNOT_ACCEPT_ORDER_ACCEPTED' })
          }
        } else {

          res.status(400).json({ sucess: false, data: 'track_IS_REQUIRED' })
        }
      })

      validation.fails(function() {
        const errMsg = validation.errors.all()
        res.status(400).json({ success: false, data: errMsg})
      })

    } else {
      // Custom popular jwt error message
      if (err.message == 'jwt expired')
        err.message = 'TOKEN_EXPIRED'
      else if(err.message == 'invalid signature') // jwt admin secret is not match || token not match
        err.message = 'TOKEN_INVALID'
      else if(err.message == 'jwt must be provided')
        err.message = 'TOKEN_MUST_BE_PROVIDED'

      res.status(401).json({ sucess: false, data: err.message })
    }
  });

}

module.exports = EditOrderController
