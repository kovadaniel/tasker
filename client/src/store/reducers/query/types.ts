export interface QueryState{
    query: string;
    isLoading: boolean;
    error: string;
}

export enum QueryActionsEnum{
    SET_QUERY= "SET_QUERY",
    SET_IS_LOADING = "SET_IS_LOADING",
    SET_ERROR = "SET_ERROR",
}

type Action<T, P> = { type: T, payload: P }

export type SetQueryAction = Action<QueryActionsEnum.SET_QUERY, string>;
export type SetIsLoadingAction = Action<QueryActionsEnum.SET_IS_LOADING, boolean>;
export type SetErrorAction = Action<QueryActionsEnum.SET_ERROR, string>;

export type QueryAction = 
    SetQueryAction | 
    SetIsLoadingAction | 
    SetErrorAction