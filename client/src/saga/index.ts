import { all } from 'redux-saga/effects'
import { taskWatcher } from './sagas/task'

export function* rootWatcher(){
    yield all([taskWatcher()])
}