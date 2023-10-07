import { ITask } from "../../../models/ITask";
import {Action} from 'redux';

export interface TaskState{
    tasks: ITask[];
    isLoading: boolean;
    error: string;
}

export enum TaskActionsEnum{
    SET_TASKS = "SET_TASKS",
    SET_TASK = "SET_TASK",
    SET_IS_LOADING = "SET_IS_LOADING",
    SET_ERROR = "SET_ERROR",

    FETCH_TASKS = "FETCH_TASKS",
    SAVE_TASKS = "SAVE_TASKS",
}

type myAction<T, P> = { type: T, payload: P }

export type SetTasksAction = myAction<TaskActionsEnum.SET_TASKS, ITask[]>;
export type SetTaskAction = myAction<TaskActionsEnum.SET_TASK, ITask>;
export type SetIsLoadingAction = myAction<TaskActionsEnum.SET_IS_LOADING, boolean>;
export type SetErrorAction = myAction<TaskActionsEnum.SET_ERROR, string>;

export type FetchTasksAction = { type: TaskActionsEnum.FETCH_TASKS };
export type SaveTasksAction = myAction<TaskActionsEnum.SAVE_TASKS, ITask[]>;

export type TaskAction = 
    SetTasksAction | 
    SetTaskAction |
    SetIsLoadingAction | 
    SetErrorAction |
    FetchTasksAction |
    SaveTasksAction