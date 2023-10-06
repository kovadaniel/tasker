import { ITask, PriorityEnum, StatusEnum } from "../models/ITask"

export const getProgress = (subtasks: ITask[]): number => {
    const length = subtasks.length;
    return subtasks.reduce((progress, task) => {
        if(task.status === StatusEnum.DONE){
            return progress + (1/length)*100; 
        } else{
            return progress
        }
    }, 0)
}

interface idable{
    id: number;
}
export function findById<T extends idable>(arr: T[], id: number):T|null{
    for(let el of arr){
        if(el.id === id){
            return el;
        }
    }
    return null;
}

export const  getPriorityColor = (status: PriorityEnum) => {
    switch (status){
        case PriorityEnum.LOW:
            return 'success';
        case PriorityEnum.MIDDLE:
            return 'warning';
        case PriorityEnum.HIGH:
            return 'danger';
    }
}

export const getAnchorTitle = (id: number, title: string) => {
    return "#"+id+'. '+title;
}

export const getUnrelatedTasks = (task:ITask, tasks:ITask[]) =>{
    return tasks.filter(t => {
        return !task.subtaskIds.includes(t.id) && t.id !== task.id && !t.supertaskId;
    })
}