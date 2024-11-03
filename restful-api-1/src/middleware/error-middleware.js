import { ResponseError } from "../error/response-error.js";
import { ValidationError } from "joi";

const errorMiddleware = (error, req, res, next) => {
  if (!error) {
    next();
    return;
  }

  if (error instanceof ResponseError) {
    res
      .status(error.satatus)
      .json({
        errors: error.message,
      })
      .end();
  } else if (error instanceof ValidationError) {
    res
      .status(400)
      .json({
        error: error.message,
      })
      .end();
  } else {
    res
      .status(500)
      .json({
        errors: error.message,
      })
      .end();
  }
};

export { errorMiddleware };
