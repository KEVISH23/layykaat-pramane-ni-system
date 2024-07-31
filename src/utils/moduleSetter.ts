import { NextFunction, Request, Response } from "express"

export function module(moduleName:string) {
    return(req:Request,res:Response,next:NextFunction)=>{
        req.headers.module = moduleName
        next()
    }
}
