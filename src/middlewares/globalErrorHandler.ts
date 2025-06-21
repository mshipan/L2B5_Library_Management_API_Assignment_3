import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorResponse: any = {
    message,
    success: false,
    error: {},
  };

  // Validation Error
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = "Validation failed";
    errorResponse = {
      message,
      success: false,
      error: err,
    };
  }

  // Duplication error (as like, ISBN uniqueness)
  else if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate key error";
    const field = Object.keys(err.keyValue)[0];
    errorResponse = {
      message,
      success: false,
      error: {
        name: "MongoError",
        message: `${field} must be unique`,
        keyValue: err.keyValue,
      },
    };
  }

  // CastError (as like, invalid ObjectId)
  else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = "Invalid ID";
    errorResponse = {
      message,
      success: false,
      error: {
        name: "CastError",
        message: `Invalid ${err.path}: ${err.value}`,
        path: err.path,
        value: err.value,
      },
    };
  }

  // Custom error with statusCode
  else if (err.statusCode && err.message) {
    statusCode = err.statusCode;
    message = err.message;
    errorResponse = {
      message,
      success: false,
      error: err.error || {},
    };
  }

  // Default fallback
  else {
    errorResponse.message = err.message || message;
    errorResponse.error = err;
  }

  res.status(statusCode).json(errorResponse);
};

export default globalErrorHandler;
