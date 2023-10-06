import Modal from "react-bootstrap/Modal";
import { ITask } from "../models/ITask";
import { FC, useState} from 'react'
import { useAppSelector } from "../hooks/useAppSelector";
import { naturalIndexOf } from "../utils";
import TaskForm from "./TaskForm";
import Info from "./Info";
import Button from "react-bootstrap/Button";
import { AiFillEdit, AiFillInfoCircle } from "react-icons/ai"

import cl from '../style/modal.module.css'

interface ITaskModal{
    task?: ITask;
    isVisible: boolean,
    setIsVisible: (bool: boolean) => void,
    creation?: boolean,
}

const TaskModal:FC<ITaskModal> = ({task, isVisible, setIsVisible, creation = false}) => {
    const {tasks} = useAppSelector(state => state.task)
    const hide = () => {
        setIsVisible(false);
    }

    const [editMode, setEditMode] = useState(creation)
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
                {!creation && 
                <Button 
                    className={cl.edit}
                    variant="outline-light" 
                    type="button"
                    onClick={changeMode}>
                    {editMode 
                        ? <AiFillInfoCircle className={cl.editIcon}/> 
                        : <AiFillEdit className={cl.editIcon}/>}
                </Button>}
            </Modal.Header>

            <Modal.Body>
            {!editMode && task
                ? <Info task={task}/>
                : <TaskForm 
                    task={task} 
                    isCreation={creation}
                    close={hide}/>}
            </Modal.Body>
        </Modal>
    );
}
 
export default TaskModal;