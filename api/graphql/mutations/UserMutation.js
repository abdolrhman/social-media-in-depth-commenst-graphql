const merge = require('lodash.merge');
const { GraphQLString } = require('graphql');

const { UserType } = require('../types');
const { User } = require('../../models');
const { UserInputType } = require('../inputTypes');

const updateUser = {
  type: UserType,
  description: 'The mutation that allows you to update an existing User by Id',
  args: {
    user: {
      name: 'user',
      type: UserInputType('update'),
    },
  },
  resolve: async (_, { user }) => {
    const foundUser = await User.findByPk(user.id);

    if (!foundUser) {
      throw new Error(`User with id: ${user.id} not found!`);
    }

    const updatedUser = merge(foundUser, {
      username: user.username,
      email: user.email,
    });

    return foundUser.update(updatedUser);
  },
};

const createUser = {
  type: UserType,
  description: 'The mutation that allows you to create User',
  args: {
    username: {
      name: 'username',
      type: GraphQLString,
    },
    name: {
      name: 'name',
      type: GraphQLString,
    },
    email: {
      name: 'email',
      type: GraphQLString,
    },
  },
  resolve: (value, { username, email, name }) => (
    User.create({
      username, email, name,
    })
  ),

};

const deleteUser = {
  type: UserType,
  description: 'The mutation that allows you to delete a existing User by Id',
  args: {
    user: {
      name: 'user',
      type: UserInputType('delete'),
    },
  },
  resolve: async (_, { user }) => {
    const foundUser = await User.findByPk(user.id);

    if (!foundUser) {
      throw new Error(`User with id: ${user.id} not found!`);
    }

    await User.destroy({
      where: {
        id: user.id,
      },
    });

    return foundUser;
  },
};

module.exports = {
  updateUser,
  deleteUser,
  createUser,
};
