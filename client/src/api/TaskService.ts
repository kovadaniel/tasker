import { ITask } from "../models/ITask";
import baseTasks from "../utils/tasks.json"

export default class TaskService{
    static getTasks(){
        //localStorage.removeItem('dtasker_tasks');
        const tasks = localStorage.getItem('dtasker_tasks') || baseTasks;
        return (typeof tasks === 'string' ? JSON.parse(tasks) : tasks) as ITask[];
    }

    static setTasks(tasks: ITask[]){
        return localStorage.setItem('dtasker_tasks', JSON.stringify(tasks))
    }
} 