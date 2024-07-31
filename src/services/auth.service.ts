import { injectable } from "inversify";
import { Role, User } from "../models";
import { roles } from "../constants";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from 'config'
@injectable()
export class AuthService{
    async registerUser(data:any){
        try {
            let {email,password,userName,roleId} = data
            if(!roleId){
                const role:any = await Role.findOne({roleName:roles.USER})
                roleId = role._id
            }
            await User.create({email,password,userName,roleId})
        } catch (error) {
            throw(error)
        }
    }
    async loginUser(data:any){
        try {
            let {email,password} = data
           const userExists = await User.findOne({email})
           if(!userExists){
            throw new Error('Please Register')
           }

          const matchPass = bcrypt.compareSync(password,userExists.password)
          if(!matchPass){
            throw new Error('Invalid credentials')
          }
          const payload = {
            _id:userExists._id,
            roleId:userExists.roleId
          }
          const token = jwt.sign(payload,config.get('SECRET_KEY'))
          return {data:userExists,token}
        } catch (error) {
            throw(error)
        }
    }
}