const e = require('express');
const { User } = require('./../models');
const bcrypt = require('bcrypt');

class UserController {
  static async getUserLogin(req, res, next) {
    try {
      const { id } = req.loggedUser;
      const user = await User.findOne({
        where: { id },
      });

      if (!user) throw { name: 'dataNotFound' };

      res.status(200).json({
        message: 'Success',
        data: user,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateUserLogin(req, res, next) {
    try {
      const { id } = req.loggedUser;
      const {
        first_name,
        last_name,
        username,
        email,
        old_password,
        new_password,
      } = req.body;

      let updatedUserData = {
        first_name,
        last_name,
        username,
        email,
      };

      const user = await User.findOne({
        where: { id },
      });

      if (!user) throw { name: 'dataNotFound' };

      if (
        !first_name ||
        !username ||
        !email ||
        !old_password ||
        !new_password
      ) {
        throw { name: 'badRequest' };
      }

      const isPasswordMatch = bcrypt.compareSync(old_password, user.password);

      if (isPasswordMatch) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(new_password, salt);
        updatedUserData = {
          ...updatedUserData,
          password: hashPassword,
        };
        await User.update(updatedUserData, { where: { id } });
      } else {
        throw { name: 'credential' };
      }

      res.status(200).json({
        message: 'Successfully updated',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
