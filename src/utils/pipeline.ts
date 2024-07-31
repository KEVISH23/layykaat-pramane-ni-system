import { PipelineStage } from "mongoose";

const getPermissionPipeline: PipelineStage[] = [

    {
        $lookup: {
            from: "modules",
            localField: "moduleId",
            foreignField: "_id",
            as: "modules",
        },
    },
    {
        $lookup: {
            from: "roles",
            localField: "roleId",
            foreignField: "_id",
            as: "roles",
        },
    },
    {
        $unwind: {
            path: "$roles",
        },
    },
    {
        $unwind: {
            path: "$modules",
        },
    },
    {
        $addFields: {
            moduleName: "$modules.moduleName",
            roleName: "$roles.roleName",
        },
    },

]

const projectPipeline: PipelineStage[] = [
    {
        $project: {
            read: {
                $cond: {
                    if: "$read",
                    then: "$read",
                    else: "$$REMOVE",
                },
            },
            write: {
                $cond: {
                    if: "$write",
                    then: "$write",
                    else: "$$REMOVE",
                },
            },
            roleName:1
        },
    },
]

export {getPermissionPipeline,projectPipeline}