import Validator from 'validatorjs'

function OrderPackageController(req, res) {
  const {
    userId,
    size,
    paymentStatus,
    paymentType,
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
    paymentStatus: paymentStatus,
    paymentType: paymentType,
    transportType: transportType,
    srcSubdistrict: srcSubdistrict,
    srcDistrict: srcDistrict,
    srcProvince: srcProvince,
    srcAddressOther: srcAddressOther,
    destSubdistrict: destSubdistrict,
    destDistrict: destDistrict,
    destProvince: destProvince,
    destAddressOther: destAddressOther,
    pickupDate: pickupDate
  }

  const rules = {
    userId: 'required|max:11',
    size: 'in:XL,L,M,S|string',
    paymentType: 'required|string|in:transfer,dest',
    transportType: 'required|string|in:EMS,sameday',
    srcSubdistrict: 'required|integer',
    srcDistrict: 'required|integer',
    srcProvince: 'required|integer',
    srcAddressOther: 'required|string|max:255',
    destSubdistrict: 'required|integer',
    destDistrict: 'required|integer',
    destProvince: 'required|integer',
    destAddressOther: 'required|string',
    pickupDate: 'required|date'
  };

  const errMessage = {
    required: ':attribute_IS_REQUIRED',
    in: ':attribute_IS_NOT_IN_SPECIFICATIONS',
    integer: ':attribute_MUST_BE_INTEGER',
    max: ':attribute_MUST_LESS_THAN_:max',
    string: ':attribute_MUST_BE_STRING',
    date: ':attribute_MUST_BE_DATE',
  }

  const validation = new Validator(data, rules, errMessage);

  validation.passes(function() {

    res.status(200).json({ data: true })
  })


  validation.fails(function() {
    const errMsg = validation.errors.all()
    res.status(400).json({ success: false, data: errMsg})
  })

}

module.exports = OrderPackageController
