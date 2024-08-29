import { User } from "../models/User";

export const createUser = async (user: any) => {
  try {
    const newUser = new User(user);
    return await User.create(user);
  } catch (error) {
    return error;
  }
};

export const getUserById = async (id: string) => {
  try {
    return await User.findByPk(id);
  } catch (error) {
    return error;
  }
};

export const getUserByPhoneNumber = async (phone_number: string) => {
  try {
    return await User.findOne({ where: { phone_number } });
  } catch (error) {
    return error;
  }
};

export const updateUser = async (id: string, user: any) => {
  try {
    return await User.update(user, { where: { id } });
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    return await User.destroy({ where: { id } });
  } catch (error) {
    return error;
  }
};
