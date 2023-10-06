import { TaskActionCreators } from "./task/action-creators";
import { QueryActionCreators } from "./query/action-creators";


export const allActionCreators = {
    ...TaskActionCreators,
    ...QueryActionCreators,
}