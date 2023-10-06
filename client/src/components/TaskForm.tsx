import { FC, useState } from 'react' 
import { Button, Form } from 'react-bootstrap';
import { ITask, PriorityEnum, StatusEnum } from '../models/ITask';
import classNames from 'classnames';

import { CiCalendarDate } from 'react-icons/ci';
import FormText from './FormText';
import FormTextarea from './FormTextarea';
import FormDate from './FormDate';
import cl from '../style/form.module.css';
import { useActions } from '../hooks/useActions';
import { GiFinishLine } from 'react-icons/gi';
import FormSelect from './FormSelect';
import FormList from './FromList';
import { useAppSelector } from '../hooks/useAppSelector';
import { findById, getAnchorTitle, getUnrelatedTasks } from '../utils/task';
import { naturalIndexOf, notEmpty } from '../utils';
import SearchedDropdown from './SearchedDropdown';
import useTaskRelation from '../hooks/useTaskRelation';
import InputFile from './UI/InputFile/InputFile';
import { IComment } from '../models/IComment';
import { msInHour } from '../utils/date';

interface ITaskForm{
    task?: ITask;
    isCreation?: boolean;
    close?: () => void;
}

/*
const emptyTask: ITask = {
    id: Date.now(),
    title: '',
    description: '',
    createdAt: 0,
    workingTime: 0,
    finishTime: 0,
    priority: PriorityEnum.LOW,
    files: [],
    status: StatusEnum.QUEUE,
    subtaskIds: [],
    supertaskId: null,
    comments: [],
}*/

const now = Date.now() + 3 * msInHour; // GMT+3

const emptyTask = {
    id: now,
    title: "Task #" + now, 
    description: '',
    status: StatusEnum.QUEUE,
    priority: PriorityEnum.LOW,
    createdAt: now,
    finishTime: now,
    workingTime: 0,
    subtaskIds: [],
    supertaskId: null,
    comments: [] as IComment[],
    files: [] as File[],
} as ITask;

const TaskForm:FC<ITaskForm> = ({task = emptyTask, isCreation = false, close}) => {
    const {tasks} = useAppSelector(state => state.task)
    const [currentTask, setCurrentTask] = useState<ITask>(task);
    const {setTask, setTasks} = useActions();

    const save = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setTask(currentTask);
    }

    const create = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setTasks([...tasks, currentTask]);
        close && close();
    }

    const children = currentTask.subtaskIds.map(id => {
        const task = findById(tasks, id);
        return task && 
            {id: task.id, title: getAnchorTitle(naturalIndexOf(task, tasks), task.title)}
    }).filter(notEmpty);

    const [relate, unrelate] = useTaskRelation(currentTask);

    return (  
        <Form>
            <FormText
                className="mb-1 d-flex align-items-center" 
                label='Title'
                text={currentTask.title}
                setText={title => setCurrentTask({...currentTask, title})}/>
            <FormTextarea 
                className="mb-1 d-flex align-items-center"
                text={currentTask.description}
                setText={description => setCurrentTask({...currentTask, description})}
                label='Description'/>
            <FormDate
                className='mb-1 d-flex'
                title="Start"
                date={new Date(currentTask.createdAt)} 
                setDate={dateMS => setCurrentTask({...currentTask, createdAt: dateMS})}
                icon={<CiCalendarDate 
                        className={classNames(cl.fieldIcon, "me-1")}/>}/>

            <FormDate
                className='mb-1 d-flex'
                title="Finish"
                date={new Date(currentTask.finishTime)} 
                setDate={dateMS => setCurrentTask({...currentTask, finishTime: dateMS})}
                icon={<GiFinishLine 
                        className={classNames(cl.fieldIcon, "me-1")}/>}/>

            <FormSelect
                className='mb-1'
                label='Priority'
                options={Object.values(PriorityEnum)}
                value={currentTask.priority}
                setValue={(priority) => setCurrentTask({...currentTask, priority})}/>

            <FormSelect
                className='mb-3'
                label='Status'
                options={Object.values(StatusEnum)}
                value={currentTask.status}
                setValue={(status) => setCurrentTask({...currentTask, status})}/>

            {!isCreation && <FormList 
                className='mb-1'
                label="Subtasks"
                items={children}
                setItems={unrelate}>

                <SearchedDropdown
                    className="d-flex justify-content-end"
                    title='Add a subtask'
                    // 1. get unrelated tasks (filter current tusk and its children, 
                    //    and those that has a supertaskId) -->
                    // 2. get string like "#1. Wash hands" for each remained task
                    items={getUnrelatedTasks(task, tasks).map(task => ({
                            id: task.id, 
                            title: getAnchorTitle(naturalIndexOf(task, tasks), task.title)
                    }))}
                    setItem={relate}/> 
            </FormList>}

            {!!currentTask.files.length && <FormList 
                className='mb-1'
                label="Files"
                items={currentTask.files.map((file, i) => 
                    ({id: i, title: file.name}))}
                setItems={unrelate}/>}
            <InputFile 
                    className="mb-1 m-auto"
                    setFiles={(files) => setCurrentTask({...currentTask, files})}/>

            <Button 
                disabled={!isCreation && JSON.stringify(task) === JSON.stringify(currentTask)}
                variant="success" 
                type="submit"
                className='d-block ms-auto me-auto mt-3 w-25'
                onClick={isCreation ? create : save}>
                {isCreation ?  'Create' : 'Save'}
            </Button>
        </Form>
    );
}
 
export default TaskForm;