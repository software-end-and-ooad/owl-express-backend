import Subdistrict from '../models/Subdistrict'

async function SubDistrictController(req, res) {
  const district_id = req.params.districtId
  const subdistrictId = req.params.subdistrictId

  if (subdistrictId == undefined) { // Get all subdistrict

    const result = await Subdistrict.findAll({
      where: {
        AMPHUR_ID: district_id
      },
      attributes: [
        ['DISTRICT_ID', 'SUBDISTRICT_ID'],
        ['DISTRICT_CODE', 'SUBDISTRICT_CODE'],
        ['DISTRICT_NAME', 'SUBDISTRICT_NAME'],
        ['DISTRICT_ID', 'DISTRICT_ID'],
        'PROVINCE_ID',
        'GEO_ID'
      ]
    })

    if (result != null) {

      res.status(200).json({ sucess: true, data: result })
    } else {

      res.status(400).json({ sucess: false, data: 'SUBDISTRICT_NOT_FOUND' })
    }

  } else { // Query one subdistrict by subdistrict id

    const result = await Subdistrict.findOne({
      where: {
        AMPHUR_ID: district_id,
        DISTRICT_ID: subdistrictId
      },
      attributes: [
        ['DISTRICT_ID', 'SUBDISTRICT_ID'],
        ['DISTRICT_CODE', 'SUBDISTRICT_CODE'],
        ['DISTRICT_NAME', 'SUBDISTRICT_NAME'],
        ['DISTRICT_ID', 'DISTRICT_ID'],
        'PROVINCE_ID',
        'GEO_ID'
      ]
    })

    res.status(200).json({ sucess: true, data: result })

  }


}
module.exports = SubDistrictController
