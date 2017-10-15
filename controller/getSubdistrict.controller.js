import Subdistrict from '../models/Subdistrict'

async function SubdistrictController(req, res) {

  const result = await Subdistrict.findOne({
    where: {
      id: userid
    },
    attributes: []
  })

}
module.exports = SubdistrictController
