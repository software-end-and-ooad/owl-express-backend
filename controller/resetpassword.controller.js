import passwordHash from 'password-hash'
import User from '../models/User';

import Handler from './handlers/handlers';


async function ResetPasswordController(req, res) {

  res.status(200).json({ success: true })
}

module.exports = ResetPasswordController;

