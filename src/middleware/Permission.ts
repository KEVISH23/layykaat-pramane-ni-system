import { Request, Response, NextFunction } from "express";
import { BaseMiddleware } from "inversify-express-utils";
import { errorHandler, getPermissionPipeline, projectPipeline } from "../utils";
import mongoose from "mongoose";
import { Permission } from "../models";
import { PERMISSIONTYPES } from "../constants";

export class RetrievePermission extends BaseMiddleware {
    constructor(readonly permit: any) {
        super()
    }
    async handler(req: Request, res: Response, next: NextFunction) {
        try {
            const moduleName = req.headers.module as string
            if (!moduleName) {
                throw new Error('Module is not provided')
            }
            const pipeline = [
                {
                    $match: {
                        roleId: new mongoose.Types.ObjectId(req.headers.roleId as string)
                    },
                },
                ...getPermissionPipeline,
                {
                    $match: {
                        moduleName
                    }
                },
                ...projectPipeline
            ]
            const [permissions] = await Permission.aggregate(pipeline)
            if (this.permit === PERMISSIONTYPES.READ && permissions.read) {
                next()
            } else if (this.permit === PERMISSIONTYPES.WRITE && permissions.write) {
                next()
            }
            else {
                res.json({ status: false, message: 'Unauthorized access' })
            }
        } catch (error) {
            const message = errorHandler(error)
            res.json({ status: false, message })
        }
    }

}