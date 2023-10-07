import { put, takeEvery, call } from "redux-saga/effects";
import { ITask } from "../../../models/ITask";
import { TaskActionCreators } from "../../../store/reducers/task/action-creators";
import { TaskActionsEnum, TaskAction, SaveTasksAction } from "../../../store/reducers/task/types";
import TaskService from "../../../api/TaskService";
//import dummyTasks from '../../../utils/tasks.json'

function* fetchTasksWorker(){
    try{
        yield put(TaskActionCreators.setTaskIsLoading(true))
        const tasks:ITask[] = yield call(TaskService.getTasks);
        
        yield put(TaskActionCreators.setTasks(tasks))
        yield put(TaskActionCreators.setTaskIsLoading(false))

    } catch(e:unknown){
        if (e instanceof Error) {
            yield put(TaskActionCreators.setTaskError(e.message))
        } else{
            yield put(TaskActionCreators.setTaskError('Error in fetchTasksWorker'))
        }
        yield put(TaskActionCreators.setTaskIsLoading(false))
    }
}

function* saveTasksWorker({payload}: SaveTasksAction){
    try{
        TaskService.setTasks(payload);
    } catch(e:unknown){
        if (e instanceof Error) {
            yield put(TaskActionCreators.setTaskError(e.message))
        } else{
            yield put(TaskActionCreators.setTaskError('Error in saveTasksWorker'))
        }
        yield put(TaskActionCreators.setTaskIsLoading(false))
    }
}

export function* taskWatcher(){
    yield takeEvery(TaskActionsEnum.FETCH_TASKS, fetchTasksWorker);
    yield takeEvery<SaveTasksAction>(TaskActionsEnum.SAVE_TASKS, saveTasksWorker);
}