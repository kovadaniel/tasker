import { allActionCreators } from "../store/reducers/action-creators";
import { useAppDispatch } from "./useAppDispatch"
import { bindActionCreators } from "redux";

export const useActions = () => {
    const dispatch = useAppDispatch();
    return bindActionCreators(allActionCreators, dispatch);
}