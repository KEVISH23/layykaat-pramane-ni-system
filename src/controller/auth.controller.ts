import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { errorHandler, getPermissionPipeline, projectPipeline } from "../utils";
import { inject } from "inversify";
import { AuthService } from "../services/auth.service";
import { TYPES } from "../constants";
import mongoose from "mongoose";
import { Permission } from "../models";

@controller('/auth')
export class AuthController {

    constructor(
        @inject<AuthService>(TYPES.AuthService) private authService: AuthService
    ) { }
    @httpPost('/register')
    async register(req: Request, res: Response) {
        try {
            const { email, password, userName, roleId } = req.body
            await this.authService.registerUser({ email, password, userName, roleId })
            res.json({ status: true, message: "User Registered" })
        } catch (error) {
            const message = errorHandler(error)
            res.json({ status: false, message })
        }
    }
    @httpPost('/login')
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            const data = await this.authService.loginUser({ email, password })
            res.json({ status: true, message: "Logged In", data: data.data, token: data.token })
        } catch (error) {
            const message = errorHandler(error)
            res.json({ status: false, message })
        }
    }

    @httpGet('/getPermissions', TYPES.AuthMiddleware)
    async getPermission(req: Request, res: Response) {
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
            const permissions = await Permission.aggregate(pipeline)
            res.json({ status: true, data: permissions })
        } catch (error) {
            const message = errorHandler(error)
            res.json({ status: false, message })
        }
    }

}