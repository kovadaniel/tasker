import {useMemo} from 'react'
import { ITask } from '../models/ITask';
import { findById, getProgress } from '../utils/task';

const useProgress = (task:ITask, tasks:ITask[]) => {
    const progress = useMemo(() => {
        const subtasks = task.subtaskIds.map(id => findById(tasks, id)) as ITask[];
        return getProgress(subtasks);
    }, [task, tasks])

    return progress;
}
 
export default useProgress;