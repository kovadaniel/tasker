import { put, takeEvery, call } from "redux-saga/effects";
import { ITask } from "../../../models/ITask";
import axios, { AxiosResponse } from "axios"; 
import { TaskActionCreators } from "../../../store/reducers/task/action-creators";
import { TaskActionsEnum } from "../../../store/reducers/task/types";
import dummyTasks from '../../../utils/tasks.json'

const fetchTasksFromApi = () => 
    axios.get<ITask[]>('https://jsonplaceholder.typicode.com/todos?_limit=10')

function* fetchTasksWorker(){
    try{
        yield put(TaskActionCreators.setTaskIsLoading(true))
        yield put(TaskActionCreators.setTasks(dummyTasks as ITask[]))
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

export function* taskWatcher(){
    yield takeEvery(TaskActionsEnum.FETCH_TASKS, fetchTasksWorker)
}