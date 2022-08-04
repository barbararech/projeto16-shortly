import joi from "joi";

export const schemas = {
  signUpSchema: joi.object().keys({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
  }),

  signInSchema: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }),

  urlSchema: joi.object().keys({
    url: joi.string().uri().required(),
  }),
};
