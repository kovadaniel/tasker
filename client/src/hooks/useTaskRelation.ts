import { ITask } from "../models/ITask";
import { findById } from "../utils/task";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";
import { useCallback } from 'react'

const useTaskRelation = (task:ITask) => {
    const {setTask} = useActions();
    const {tasks} = useAppSelector(state => state.task);
    const unrelate = useCallback((childId:number) => {
        /**
         * action for unrelation parent and child tasks are occuring immediately after user click
         * without any need to click "Save" button
         */
        // 1. delete this child in current task
        task.subtaskIds = task.subtaskIds.filter(id => id !== childId);
        
        setTask(task);
        // 2. delete current task in 'parent' field of this child
        const child = findById(tasks, childId);
        if(child) {
            child.supertaskId = null;
            setTask(child);
        }
    }, [task])

    const relate = useCallback((childId:number) => {
        // 1. add this child id to the current task field 'subtaskIds'
        task.subtaskIds = task.subtaskIds.concat(childId);
        setTask(task);
        // 2. add current task in the field 'parent' of this child
        const child = findById(tasks, childId);
        if(child) {
            child.supertaskId = task.id;
            setTask(child);
        }
    }, [task])

    return [relate, unrelate];
}
 
export default useTaskRelation;