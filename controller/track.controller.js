import jwt from 'jsonwebtoken'

import Order from '../models/Order'
import jwtconfig from '../config/jwtconfig'
import handler from './handlers/handlers';


async function TrackController(req, res) {

  const trackid = req.params.trackid

  const allOrder = await Order.findOne({
    where: {
      track: trackid
    },
    attributes: ['id', 'status', 'postman_id', 'updated_at']

  })
  if (allOrder != null) {

    res.status(200).json({ sucess: true, data: allOrder })
  } else {

    res.status(200).json({ sucess: true, data: undefined })
  }
}

module.exports = TrackController;

