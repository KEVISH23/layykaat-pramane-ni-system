import mongoose from "mongoose";
const RoleSchema = new mongoose.Schema(
    {
        roleName: {
            type: String,
            required: true,
            unique:true
        }
    },
    {
        timestamps: true
    }
)

const Role = mongoose.model('role', RoleSchema)
export { Role }