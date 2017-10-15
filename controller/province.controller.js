import Province from '../models/Province'

async function ProvinceController(req, res) {

  const result = await Province.findAll({
    attributes: ['PROVINCE_ID', 'PROVINCE_CODE', 'PROVINCE_NAME', 'GEO_ID']
  })


  res.status(200).json({ sucess: true, data: result })
}



module.exports = ProvinceController
