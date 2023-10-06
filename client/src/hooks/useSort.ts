import { useEffect, useMemo, useState } from "react";
import { ITask, ITaskList, StatusEnum } from "../models/ITask";
import { capitalize } from "../utils";

export const useSort = (tasks: ITask[]) => {
    const sortedTasks = useMemo(() => {
        return Object.values(StatusEnum).map((status, i) => ({
            id: i,
            title: capitalize(status),
            type: StatusEnum[status],
            tasks: tasks.filter(task => task.status === status),
        }))
    }, [tasks]);

    return sortedTasks;
}


/**
 * Generic variant. I didn't implement it by KISS design principle

    interface Statused{
        status: string,
    }

    interface ISorted<T> {
        id: number,
        title: string,
        items: T[]
    }

    function useSort<T extends Statused>(items: T[], categories: string[]): ISorted<T>[]{
        return categories.map((categoty, i) => ({
            id: i,
            title: capitalize(categoty),
            items: items.filter(item => item.status === categoty),
        }))
    }
 */
 
export default useSort;