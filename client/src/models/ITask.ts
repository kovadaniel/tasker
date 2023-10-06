import { IComment } from "./IComment";

export interface ITask{
    id: number,
    title: string,
    description: string,
    createdAt: number,
    workingTime: number,
    finishTime: number,
    priority: PriorityEnum,
    files: File[],
    status: StatusEnum,
    subtaskIds: number[], // array of ids of subtasks
    supertaskId: number | null, // id of a task to which this task is a subtask 
    comments: IComment[],
}

export interface ITaskList{
    id: number,
    title: string,
    type: StatusEnum,
    tasks: ITask[],
}

export enum PriorityEnum{
    HIGH = 'HIGH',
    MIDDLE = 'MIDDLE',
    LOW = 'LOW',
}

export enum StatusEnum{
    QUEUE = 'QUEUE',
    DEVELOPMENT = 'DEVELOPMENT',
    DONE = 'DONE',
}