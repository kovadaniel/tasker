import { ITask } from "../../../models/ITask";

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
}

type Action<T, P> = { type: T, payload: P }

export type SetTasksAction = Action<TaskActionsEnum.SET_TASKS, ITask[]>;
export type SetTaskAction = Action<TaskActionsEnum.SET_TASK, ITask>;
export type SetIsLoadingAction = Action<TaskActionsEnum.SET_IS_LOADING, boolean>;
export type SetErrorAction = Action<TaskActionsEnum.SET_ERROR, string>;

export type FetchTasksAction = { type: TaskActionsEnum.FETCH_TASKS };

export type TaskAction = 
    SetTasksAction | 
    SetTaskAction |
    SetIsLoadingAction | 
    SetErrorAction |
    FetchTasksAction