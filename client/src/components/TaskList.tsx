import React, { FC, useRef} from "react";
import { Card, } from "react-bootstrap";
import {  ITaskList } from "../models/ITask";
import TaskListItem from "./TaskListItem";
import { Container } from "react-bootstrap";
import { IHandlers } from "../models/IHandlers";
import DropArea from "./UI/DropArea";
import classNames from "classnames";
import cl from '../style/board.module.css'

interface TaskListProps{
    board: ITaskList;
    handlers: IHandlers;
}
const TaskList:FC<TaskListProps> = ({board, handlers}) => {
    return (  
        <Card 
            className={classNames(cl.board, "board")} // class "board" for supporting drag animation
            onDragOver={handlers.dragOverHandler}
            onDragLeave={handlers.dragLeaveHandler}
            onDragEnd={handlers.dragEndHandler}
            onDrop={(e) => handlers.dropBoardHandler(e, board, false)}>
            <h4 className={cl.title}>{board.title}</h4>
            <Container>
                <DropArea 
                    board={board} 
                    handlers={handlers}/>
                {board.tasks.map(task => 
                <React.Fragment key={task.id}>
                    <TaskListItem 
                        task={task} 
                        board={board}
                        handlers={handlers}/>
                    <DropArea 
                        task={task}
                        board={board}  
                        handlers={handlers}/>
                </React.Fragment>
                )}
            </Container>
        </Card>
  
    );
}
 
export default TaskList;