import { QueryActionsEnum, SetErrorAction, SetIsLoadingAction, SetQueryAction } from "./types";

export const QueryActionCreators = {
    setQuery: (query: string): SetQueryAction => ({
        type: QueryActionsEnum.SET_QUERY, 
        payload: query,
    }),
    setQueryIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
        type: QueryActionsEnum.SET_IS_LOADING, 
        payload: isLoading,
    }),
    setQueryError: (error: string): SetErrorAction => ({
        type: QueryActionsEnum.SET_ERROR, 
        payload: error,
    }),
}