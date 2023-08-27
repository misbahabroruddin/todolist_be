const { Op } = require('sequelize');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const JWT = require('../lib/jwt');

class AuthController {
  static async register(req, res, next) {
    try {
      const { first_name, last_name, username, email, password } = req.body;
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);

      const foundUser = await User.findOne({
        where: { [Op.or]: [{ username }, { email }] },
      });

      if (foundUser) throw { name: 'dataExist' };

      const user = await User.create({
        first_name,
        last_name,
        email,
        username,
        password: hashPassword,
      });

      res.status(201).json({
        message: 'Success',
        id: user.id,
      });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;

      const foundUser = await User.findOne({ where: { username } });

      const isPasswordMatch = bcrypt.compareSync(password, foundUser.password);

      if (!foundUser || !isPasswordMatch) throw { name: 'credential' };

      const token = JWT.generateToken(foundUser);

      res.status(200).json({
        message: 'Login Success',
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
