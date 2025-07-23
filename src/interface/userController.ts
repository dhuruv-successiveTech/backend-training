import { NextFunction, Request, Response } from "express";


export interface userControllerInterface{
    user(
        req:Request,
        res:Response,
        next:NextFunction
    ):void;
    login(
        req:Request,
        res:Response,
        next:NextFunction
    ):Promise<void>;
    register(
        req:Request,
        res:Response,
        next:NextFunction
    ):Promise<void>
}