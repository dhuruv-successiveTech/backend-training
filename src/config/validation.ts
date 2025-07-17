import Joi from "joi";

interface validationInterface {
  [route: string]: {
    post?: {
      body?: Joi.ObjectSchema<any>;
      params?: Joi.ObjectSchema<any>;
      query?: Joi.ObjectSchema<any>;
    };
    get?: {
      body?: Joi.ObjectSchema<any>;
      params?: Joi.ObjectSchema<any>;
      query?: Joi.ObjectSchema<any>;
    };
  };
}

export const validationRules: validationInterface = {
  "/api/user/register": {
    post: {
      body: Joi.object({
        userName: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required(),
        phone: Joi.number()
          .integer()
          .min(1000000000)
          .max(9999999999)
          .required(),
        gender: Joi.string().valid("male", "female", "other"),
        password: Joi.string()
          .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
          .required(),
      }),
    },
  },
  "/api/user/login": {
    post: {
      body: Joi.object({
        userName: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string()
          .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
          .required(),
      }),
    },
  },
  "/api/user/:id": {
    post: {
      params: Joi.object({
        id: Joi.number().integer().required(),
      }),
    },
  },
};
