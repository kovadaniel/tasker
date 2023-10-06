import { ITask, ITaskList } from "./ITask";

export interface IHandlers{
    dragStartHandler(e: React.DragEvent<HTMLElement>, task: ITask): void;
    dragEndHandler(e: React.DragEvent<HTMLElement>,): void;
    dragLeaveHandler(e: React.DragEvent<HTMLElement>): void;
    dragOverHandler(e: React.DragEvent<HTMLElement>,): void;
    dropHandler(e: React.DragEvent<HTMLElement>, board: ITaskList, task: ITask): void;
    dropBoardHandler(e: React.DragEvent<HTMLElement>, board: ITaskList, start?: boolean): void;
}