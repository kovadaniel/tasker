import { QueryAction, QueryActionsEnum, QueryState } from "./types";

const initialState: QueryState = {
    query: '',
    isLoading: false,
    error: '',
}

export default function TaskReducer (state = initialState, action: QueryAction): QueryState {
    switch(action.type){
        case QueryActionsEnum.SET_QUERY:
            return {...state, query: action.payload};
        case QueryActionsEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload};
        case QueryActionsEnum.SET_ERROR:
            return {...state, error: action.payload, isLoading: false}
        default:
            return state;
    }
}