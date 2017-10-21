import Province from '../models/Province'

async function ProvinceController(req, res) {
  const provinceId = req.params.provinceId


  if (provinceId == undefined) { // Get all province
    const result = await Province.findAll({
      attributes: ['PROVINCE_ID', 'PROVINCE_CODE', 'PROVINCE_NAME', 'GEO_ID']
    })


    res.status(200).json({ sucess: true, data: result })
  } else { // Query one province by province id

    const result = await Province.findOne({
      where: {
        PROVINCE_ID: provinceId
      },
      attributes: ['PROVINCE_ID', 'PROVINCE_CODE', 'PROVINCE_NAME', 'GEO_ID']
    })

    res.status(200).json({ sucess: true, data: result })
  }


}



module.exports = ProvinceController
