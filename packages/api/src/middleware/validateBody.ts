import { Request, Response } from "express";

import joi from "joi";
export const validateBody = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const method = req.method.toLowerCase();
  const schema = schemas[method];

  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    res.send(400);
  }
};

const schemas: { [key: string]: joi.ObjectSchema } = {
  post: joi.object({
    fullUrl: joi.string().uri(),
  }),
  patch: joi.object({
    urlId: joi.string(),
    newUrl: joi.string().uri(),
  }),
};
