import Modal from "react-bootstrap/Modal";
import { ITask, PriorityEnum, StatusEnum } from "../models/ITask";
import { FC, useState} from 'react'
import { useAppSelector } from "../hooks/useAppSelector";
import { naturalIndexOf } from "../utils";
import TaskForm from "./TaskForm";
import Info from "./Info";
import Button from "react-bootstrap/Button";
import { IComment } from "../models/IComment";
import { AiFillEdit, AiFillInfoCircle } from "react-icons/ai"

import cl from '../style/modal.module.css'

interface ITaskModal{
    task?: ITask;
    isVisible: boolean,
    setIsVisible: (bool: boolean) => void,
    editable?: boolean,
}

const now = Date.now();

const dummyTask = {
    id: now,
    title: "Task #" + now, 
    description: '',
    status: StatusEnum.DEVELOPMENT,
    priority: PriorityEnum.LOW,
    createdAt: now,
    finishTime: now,
    workingTime: 0,
    subtaskIds: [],
    supertaskId: null,
    comments: [] as IComment[],
    files: [] as File[],
} as ITask;

const TaskModal:FC<ITaskModal> = ({task = dummyTask, isVisible, setIsVisible, editable = false}) => {
    const {tasks} = useAppSelector(state => state.task)
    const hide = () => {
        setIsVisible(false);
    }

    const [editMode, setEditMode] = useState(!editable)
    const changeMode = () => {
        setEditMode(!editMode);
    }

    const title = naturalIndexOf(task, tasks);
    
    return (
        <Modal
            show={isVisible} 
            onHide={hide}
            size="lg"
            centered
            className="task-modal"
            draggable={false}
        >
            <Modal.Header closeButton className={cl.header}>
                <span className={cl.title}>{title ? 'Task #'+title : 'New task'}</span>
                <Button 
                    className={cl.edit}
                    variant="outline-light" 
                    type="button"
                    onClick={changeMode}>
                    {editMode 
                        ? <AiFillInfoCircle className={cl.editIcon}/> 
                        : <AiFillEdit className={cl.editIcon}/>}
                </Button>
            </Modal.Header>
            {editMode
            ? <Modal.Body key={task.id}>
                <TaskForm task={task} editMode={editMode}/>
              </Modal.Body>
            : <Modal.Body key={task.id}>
                <Info task={task}/>
              </Modal.Body>
            }
        </Modal>
    );
}
 
export default TaskModal;