import { Request, Response, NextFunction } from "express";
import { BaseMiddleware } from "inversify-express-utils";
import {  errorHandler } from "../utils";

export class RoleMiddleware extends BaseMiddleware{
    handler(req: Request, res: Response, next: NextFunction): void {
        try {
            if(req.headers.role === 'Admin'){
                next()
            }else{
                throw new Error('Not Authorized')
            }
        } catch (error) {
            const message = errorHandler(error)
            res.json({status:false,message})
        }
        
    }
    
}