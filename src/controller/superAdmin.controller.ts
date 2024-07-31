import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost } from "inversify-express-utils";
import { SuperAdminService } from "../services/superAdmin.service";
import { TYPES } from "../constants";
import { errorHandler, module } from "../utils";

@controller('/superAdmin')
export class SuperAdminController {

    constructor(
        @inject<SuperAdminService>(TYPES.SuperAdminService) private superAdminService: SuperAdminService
    ) { }
    @httpPost('/role')
    async addRole(req: Request, res: Response) {
        try {
            const { roleName } = req.body
            if (!roleName) {
                throw new Error('Role must have a name')
            }
            await this.superAdminService.addRole(roleName)
            res.json({ status: true, message: "Role Added" })
        } catch (error: any) {
            let message = ""
            if (error.code === 11000) {
                message = "Role already exists"
            } else {
                message = errorHandler(error)
            }
            res.json({ status: false, message })
        }
    }

    @httpPost('/module')
    async addModule(req: Request, res: Response) {
        try {
            const { moduleName } = req.body
            if (!moduleName) {
                throw new Error('Module must have a name')
            }
            await this.superAdminService.addModule(moduleName)
            res.json({ status: true, message: "Module Added" })
        } catch (error: any) {
            let message = ""
            if (error.code === 11000) {
                message = "Module already exists"
            } else {
                message = errorHandler(error)
            }
            res.json({ status: false, message })
        }
    }

    @httpPost('/permission')
    async addPermissions(req: Request, res: Response) {
        try {
            const {roleId,moduleId,read,write} = req.body
            await this.superAdminService.addPermissions({roleId,moduleId,read,write})
            res.json({status:true,message:"Permissions assigneddd"})
        } catch (error) {
            const message = errorHandler(error)
            res.json({ status: false, message })
        }
    }

    @httpDelete('/user/:id',TYPES.AuthMiddleware,module('user'),TYPES.WritePermission)
    async deleteUser(req:Request,res:Response){
        try {
           console.log('in controller')
        } catch (error) {
            const message = errorHandler(error)
            res.json({ status: false, message })
        }
    }

}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjllNGYxMWVkMWM2ZGE3NTFiYmU2MDYiLCJyb2xlSWQiOiI2NjllMzVhZWRmODIyOGUzMjFmN2VkZGEiLCJpYXQiOjE3MjE3MTQ0OTN9.4rqyV7Fy74KvFhM9Me4L9-n7yv7dqR6lBomBGPK6I80