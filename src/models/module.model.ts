import mongoose from "mongoose";

const ModuleSchema = new mongoose.Schema(
    {
        moduleName: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
)

const Module = mongoose.model('module', ModuleSchema)
export { Module }