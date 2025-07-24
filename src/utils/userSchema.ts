import Joi from "joi";

class UserSchema {
  private static instance: UserSchema;

  public static getInstance(): UserSchema {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public registerSchema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    mobile: Joi.number().integer().min(1000000000).max(9999999999).required(),
    gender: Joi.string().valid("male", "female", "other").required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  public loginSchema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  public profileSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    age: Joi.number().required(),
    hobbies: Joi.array().items(Joi.string()),
    address: Joi.object({
      city: Joi.string(),
      zip: Joi.number(),
    }),
  });
}

export default UserSchema.getInstance();
