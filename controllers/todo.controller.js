const { Op } = require('sequelize');
const { Todo } = require('./../models');

class TodoController {
  static async getAll(req, res, next) {
    try {
      const { id } = req.loggedUser;

      const todo = await Todo.findAll({
        where: { user_id: id },
        attributes: { exclude: ['user_id', 'createdAt', 'updatedAt'] },
        order: [
          ['status', 'ASC'],
          ['createdAt', 'DESC'],
        ],
      });

      res.status(200).json({
        message: 'Success',
        data: todo,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const { id: userId } = req.loggedUser;

      const todo = await Todo.findOne({
        where: { [Op.and]: [{ id }, { user_id: userId }] },
        attributes: { exclude: ['user_id', 'createdAt', 'updatedAt'] },
      });

      if (!todo) throw { name: 'dataNotFound' };

      res.status(200).json({
        message: 'Success',
        data: todo,
      });
    } catch (error) {
      next(error);
    }
  }

  static async post(req, res, next) {
    try {
      const { id } = req.loggedUser;
      const { task, description, priority } = req.body;

      if (!task || !description || !priority) {
        throw { name: 'badRequest' };
      }

      const todo = await Todo.create({
        user_id: id,
        task,
        description,
        priority,
      });

      res.status(201).json({
        message: 'Successfully created',
        data: todo.id,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { id: userId } = req.loggedUser;
      const { task, description, status, priority } = req.body;

      const foundTodo = await Todo.findOne({
        where: { [Op.and]: [{ id }, { user_id: userId }] },
      });

      if (!foundTodo) throw { name: 'dataNotFound' };

      if (!task || !description || !status || !priority) {
        throw { name: 'badRequest' };
      }

      await Todo.update(
        {
          task,
          description,
          status,
          priority,
        },
        {
          where: { [Op.and]: [{ id }, { user_id: userId }] },
        }
      );

      res.status(200).json({
        message: 'Successfully update',
        id: foundTodo.id,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { id: userId } = req.loggedUser;
      const status = req.body;

      const foundTodo = await Todo.findOne({
        where: { [Op.and]: [{ id }, { user_id: userId }] },
      });

      if (!foundTodo) throw { name: 'dataNotFound' };

      if (!status) {
        throw { name: 'badRequest' };
      }

      await Todo.update(status, {
        where: { [Op.and]: [{ id }, { user_id: userId }] },
      });

      res.status(200).json({
        message: 'Successfully update',
        id: foundTodo.id,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const { id: userId } = req.loggedUser;

      const foundTodo = await Todo.destroy({
        where: {
          [Op.and]: [{ id }, { user_id: userId }],
        },
      });

      if (!foundTodo) throw { name: 'dataNotFound' };

      res.status(200).json({
        message: 'Successfully deleted',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TodoController;
