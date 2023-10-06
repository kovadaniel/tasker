import { TaskAction, TaskActionsEnum, TaskState } from "./types";

const initialState: TaskState = {
    tasks: [],
    error: '',
    isLoading: false,
}

export default function TaskReducer (state = initialState, action: TaskAction): TaskState {
    switch(action.type){
        case TaskActionsEnum.SET_TASKS:
            return {...state, tasks: action.payload};
        case TaskActionsEnum.SET_TASK:
            const tasks = state.tasks.map(t => {
                if(t.id === action.payload.id) return action.payload;
                else return t;
            })
            return {...state, tasks};
        case TaskActionsEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload};
        case TaskActionsEnum.SET_ERROR:
            return {...state, error: action.payload, isLoading: false}
        default:
            return state;
    }
}