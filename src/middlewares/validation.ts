import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const validation = (schema: Joi.ObjectSchema) => {
    return (req:Request,res:Response,next:NextFunction)=>{
        const validate = schema.validate(req.body)
        console.log(validate);
        
        next()
    }
};
export { validation };
