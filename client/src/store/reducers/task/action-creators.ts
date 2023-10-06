import { ITask } from "../../../models/ITask";
import { FetchTasksAction, SetErrorAction, SetIsLoadingAction, SetTaskAction, SetTasksAction, TaskActionsEnum } from "./types";

export const TaskActionCreators = {
    setTasks: (tasks: ITask[]): SetTasksAction => ({
        type: TaskActionsEnum.SET_TASKS, 
        payload: tasks,
    }),
    setTask: (task: ITask): SetTaskAction => ({
        type: TaskActionsEnum.SET_TASK, 
        payload: task,
    }),
    setTaskIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
        type: TaskActionsEnum.SET_IS_LOADING, 
        payload: isLoading,
    }),
    setTaskError: (error: string): SetErrorAction => ({
        type: TaskActionsEnum.SET_ERROR, 
        payload: error,
    }),
    
    fetchTasks: (): FetchTasksAction => ({
        type: TaskActionsEnum.FETCH_TASKS, 
    }),
}