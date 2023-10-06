import { FC } from "react";
import Card from "react-bootstrap/Card";
import { ITask, ITaskList, StatusEnum,} from "../models/ITask";
import { IHandlers } from "../models/IHandlers";
import classNames from "classnames";
import { SiSubstack } from "react-icons/si"
import ProgressBar from "react-bootstrap/ProgressBar";
import { useAppSelector } from "../hooks/useAppSelector";
import useProgress from "../hooks/useProgress";
import TaskPanel from "./TaskPanel";
import { isOutdated } from "../utils/date";

import cl from '../style/task.module.css';
import { truncate } from "../utils";



interface ITaskListItem{
    task: ITask,
    board: ITaskList,
    handlers: IHandlers;
}
const TaskListItem:FC<ITaskListItem> = ({task, board, handlers}) => {
    const {tasks} = useAppSelector(state => state.task);
    const progress = useProgress(task, tasks);
    const checkOutdated = (task: ITask) => 
        isOutdated(task.finishTime) && task.status !== StatusEnum.DONE
    
    return (  
        <Card
            className={classNames(cl.task, "task-item")} // "task-item" for drag styling support
            style={{viewTransitionName: 'task-'+task.id}} // a field to enable browser animation to occur
            bg={checkOutdated(task) ? 'danger' : ''}
            text="light"
            draggable
            onDragStart={(e) => handlers.dragStartHandler(e, task)}
            onDragLeave={(e) => handlers.dragLeaveHandler(e)}
            onDragEnd={(e) => handlers.dragEndHandler(e)}
            onDragOver={(e) => handlers.dragOverHandler(e)}
            onDrop={(e) => handlers.dropHandler(e, board, task)}
        >
            <Card.Body>
                <TaskPanel task={task}/>
                <Card.Title>{truncate(task.title)}</Card.Title>
                <Card.Text>{truncate(task.description, 15, 150)}</Card.Text>
                {task.supertaskId &&  
                    <div className="mb-2">
                        <SiSubstack className="w-auto me-2"/> 
                        {tasks[task.supertaskId].title}
                    </div>
                }
                {!!task.subtaskIds.length &&
                 <ProgressBar 
                    now={progress}
                    variant="success"
                    animated/>}
            </Card.Body>


        </Card>
    );
}
 
export default TaskListItem;