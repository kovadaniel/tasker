import { ITask } from "../models/ITask";
import { naturalIndexOf } from "../utils";
import { useMemo } from 'react'

const useSearchedTasks = (tasks: ITask[], query: string) => {
    const searchedTasks = useMemo(() => tasks.filter(task => {
        const letters = query.replace(/\d|#/g,''); // remove all digits for string
        return naturalIndexOf(task, tasks).toString().startsWith(query) 
            || (letters && task.title.includes(letters))
            
    }), [tasks, query])
    return query ? searchedTasks : tasks;
}
 
export default useSearchedTasks;