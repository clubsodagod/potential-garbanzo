"use client";

import { TaskService } from "@/_library/types-interfaces-classes/services";
import { approveTask } from "../utility/task/approve";
import { createTask } from "../utility/task/create";
import { denyTask } from "../utility/task/deny";
import { deleteTask } from "../utility/task/delete";
import { editTask } from "../utility/task/edit";



export const taskService: TaskService = {
    admin: {
        accounts: {
            approve: approveTask,
            deny: denyTask,
        },
        createTask: createTask,
        editTask: editTask,
        deleteTask: deleteTask,
    },
    user: {
        createTask: createTask,
        editTask: editTask,
    },
};
