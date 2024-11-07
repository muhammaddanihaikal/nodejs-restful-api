import { prismaClient } from "../application/database.js";
import { registerUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";

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

export default { register };
