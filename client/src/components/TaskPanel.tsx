import { FC, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import { FiMoreHorizontal } from "react-icons/fi";
import { getPriorityColor } from "../utils/task";
import { ITask } from "../models/ITask";
import TaskModal from "./TaskModal";
import cl from '../style/task.module.css';
import classNames from "classnames";


interface ITaskPanel{
    task: ITask
}

/**
 * a panel on a task list item
 */
const TaskPanel:FC<ITaskPanel> = ({task}) => {
    const [showModal, setShowModal] = useState(false)
    return (  
        <Card.Header className="float-end d-flex align-items-center pt-0 border-0 pe-0">
            <FiMoreHorizontal
                className={classNames(cl.settings, 'ms-1')}
                role="button"
                onClick={() => setShowModal(true)}/>
            <Badge 
                bg={getPriorityColor(task.priority)} 
                className={classNames(cl.priority, "ms-1")}/>
            <TaskModal 
                task={task} 
                isVisible={showModal} 
                setIsVisible={setShowModal}/>
    </Card.Header>
    );
}
 
export default TaskPanel;