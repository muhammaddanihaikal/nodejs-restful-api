import { prismaClient } from "../application/database.js";
import { registerUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validate.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const userExist = await prismaClient.user.findUnique({
    where: {
      username: user.username,
    },
  });

  if (userExist) {
    throw new ResponseError(400, "Username already exist");
  }

  // hashing password
  user.password = await bcrypt.hash(user.password, 10);

  return await prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });
};

export default { register };
