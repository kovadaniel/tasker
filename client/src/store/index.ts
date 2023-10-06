import { createStore, applyMiddleware, combineReducers } from "redux";
import reducers from "./reducers" 
import createSagaMiddleware from "redux-saga";
import { rootWatcher } from "../saga";

export const rootReducer = combineReducers(reducers)
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

// run saga with rootWatcher to enable async actions
sagaMiddleware.run(rootWatcher)

