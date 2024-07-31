import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const UserSchema = new mongoose.Schema({
    userName:{
        type:String,
        trim:true,
        required:[true,'User must have a name']
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:[true,'Email is required']
    },
    password:{
        type:String,
        trim:true,
        required:[true,'Password is required']
    },
    roleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'role',
    },
},{
    timestamps:true
})
UserSchema.pre('save',async function(next){
    if(this.password){
        const hashPassword = bcrypt.hashSync(this.password,10)
        this.password = hashPassword
    }
    next()
})
const User = mongoose.model('user',UserSchema)
export {User}