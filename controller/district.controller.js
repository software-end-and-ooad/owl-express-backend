import District from '../models/District'

async function DistrictController(req, res) {
  const province_id = req.params.provinceId

  const result = await District.findAll({
    where: {
      PROVINCE_ID: province_id
    },
    attributes: [
      ['AMPHUR_ID', 'DISTRICT_ID'],
      ['AMPHUR_CODE', 'DISTRICT_CODE'],
      ['AMPHUR_NAME', 'DISTRICT_NAME'],
      'GEO_ID',
      'PROVINCE_ID',
    ]
  })

  if (result != null) {

    res.status(200).json({ sucess: true, data: result })
  } else {

    res.status(400).json({ sucess: false, data: 'DISTRICT_NOT_FOUND' })
  }

}
module.exports = DistrictController
