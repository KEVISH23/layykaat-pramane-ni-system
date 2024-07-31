import { injectable } from "inversify";
import { Module, Permission, Role } from "../models";

@injectable()
export class SuperAdminService{
    async addRole(roleName:string){
        try {
            await Role.create({roleName})
        } catch (error) {
            throw(error)
        }
    }
    async addModule(moduleName:string){
        try {
            await Module.create({moduleName})
        } catch (error) {
            throw(error)
        }
    }

    async addPermissions(data:any){
        try {
            await Permission.create(data)
        } catch (error) {
            throw(error)
        }
    }
}