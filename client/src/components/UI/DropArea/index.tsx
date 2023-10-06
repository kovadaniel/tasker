import React, { forwardRef } from "react";
import Card from "react-bootstrap/Card";
import { IHandlers } from "../../../models/IHandlers";
import classNames from "classnames";
import { ITask, ITaskList } from "../../../models/ITask";
import cl from './style.module.css'

interface IDropArea{
    task?: ITask,
    board: ITaskList,
    handlers: IHandlers;
}

const DropArea = forwardRef<HTMLElement, IDropArea>(({task, board, handlers}, ref) => {
    const dropHandler = (e: React.DragEvent<HTMLElement>) => {
        if(task) {
            return handlers.dropHandler(e, board, task) // inserts dragged element after given task
        } else{
            return handlers.dropBoardHandler(e, board, true) // inserts dragged element to the start
        }
    }
    
    return ( 
        <Card
            ref={ref as React.RefObject<HTMLDivElement>}
            className={classNames(cl.area, "drop-area")} //
            onDragEnter={handlers.dragOverHandler}
            onDragLeave={handlers.dragLeaveHandler}
            onDrop={dropHandler}/>
        
    )
})
 
export default DropArea;