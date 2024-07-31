import { Request, Response, NextFunction } from "express";
import { BaseMiddleware } from "inversify-express-utils";
import { responseMessage } from "../constants";
import { errorHandler } from "../utils";
import config from 'config'
import jwt from 'jsonwebtoken'
export class AuthMiddleware extends BaseMiddleware {
    handler(req: Request, res: Response, next: NextFunction): void {
        try {
            const token = req.headers.authorization?.split(' ')[1]
            if (!token) {
                throw new Error(responseMessage.TOKENNOTPROVIDED)
            }
            jwt.verify(token.toString(), config.get("SECRET_KEY"), (err: any, decoded: any) => {
                if (err) {
                    throw new Error(responseMessage.TOKENINVALID)
                }
                req.headers._id = decoded._id
                req.headers.roleId = decoded.roleId

                next()
            })
        } catch (error: any) {
            const message = errorHandler(error)
            res.json({ status: false, message })
        }
    }
}

