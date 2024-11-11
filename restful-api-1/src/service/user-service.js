import { prismaClient } from "../application/database.js";
import {
  loginUserValidation,
  registerUserValidation,
  getUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { logger } from "../application/logging.js";
import { v4 as uuid } from "uuid";

const register = async (request) => {
  // validasi
  const user = validate(registerUserValidation, request);

  // cek jika user sudah ada
  const userExist = await prismaClient.user.findUnique({
    where: {
      username: user.username,
    },
  });

  // jika sudah ada maka lempar error
  if (userExist) {
    throw new ResponseError(400, "Username already exist");
  }

  // hashing password
  user.password = await bcrypt.hash(user.password, 10);

  // kembalikan data create
  return await prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });
};

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      username: loginRequest.username,
    },
    select: {
      username: true,
      password: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, "Username or password wrong");
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new ResponseError(401, "Username or password wrong");
  }

  const token = uuid();

  return prismaClient.user.update({
    where: {
      username: user.username,
    },
    data: {
      token,
    },
    select: {
      token: true,
    },
  });
};

const get = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
      name: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  return user;
};

export default { register, login, get };
