import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema({
    moduleId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'module'
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'role'
    },
    read: {
        type: Boolean,
        default: false
    },
    write: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Permission = mongoose.model('permission', PermissionSchema)
export { Permission }