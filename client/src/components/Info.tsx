import { FC, useState } from "react";
import { ITask } from "../models/ITask";
import Container from "react-bootstrap/Container";
import { Badge } from "react-bootstrap";
import cl from '../style/info.module.css'
import InfoField from "./InfoField";

import { CgNotes } from 'react-icons/cg'
import { dmsInterval, dateToISO, timeToISO } from "../utils/date";
import { CiCalendarDate } from "react-icons/ci";
import { GiFinishLine } from "react-icons/gi";
import { MdPriorityHigh, MdWorkHistory } from "react-icons/md";
import { capitalize, findDeepComment, naturalIndexOf, notEmpty } from "../utils";
import classNames from "classnames";
import { TbProgressHelp, TbSubtask } from "react-icons/tb";
import { findById, getAnchorTitle, getPriorityColor } from "../utils/task";
import { useAppSelector } from "../hooks/useAppSelector";
import CommentList from "./CommentList";
import CommentInput from "./UI/CommentInput/CommentInput";
import { IComment } from "../models/IComment";
import { useActions } from "../hooks/useActions";


interface InfoProps{
    task: ITask;
}

const Info:FC<InfoProps> = ({task}) => {
    const {tasks} = useAppSelector(state => state.task);
    const {setTask} = useActions();

    const parent = task.supertaskId 
        ? findById(tasks, task.supertaskId) 
        : null;
    const children = task.subtaskIds.map(id => findById(tasks, id)).filter(notEmpty);

    const sendComment = (parentCommentId: number) => 
        (e: React.FormEvent<HTMLFormElement>, text: string) => {
            e.preventDefault();
            // if no comment text was entered:
            if(!text) return;

            const newComment = {
                id: Date.now(),
                user: { name: "Anonim", image: '' },
                text,
                comments: [] as IComment[],
            } as IComment;

            if(parentCommentId < 0) {
                // case for the general CommentInput that is below all comments
                task.comments = task.comments.concat(newComment); 
                setTask(task);
            } else{
                const parent = findDeepComment(task.comments, parentCommentId)
                parent?.comments.push(newComment);
                setTask(task);
            }

    }

    return (
        <Container>
            <InfoField
                className={cl.row}
                data={task.description}
                label="Description:"
                icon={<CgNotes/>}/>
            <InfoField
                className={classNames(cl.row, cl.singleRow)}
                data={dateToISO(new Date(task.createdAt))+' '+ timeToISO(new Date(task.createdAt))}
                label="Start:"
                icon={<CiCalendarDate/>}/>  
            <InfoField
                className={classNames(cl.row, cl.singleRow)}
                data={dateToISO(new Date(task.finishTime))+' '+ timeToISO(new Date(task.finishTime))}
                label="Finish:"
                icon={<GiFinishLine/>}/>  
            <InfoField
                className={classNames(cl.row, cl.singleRow)}
                data={dmsInterval(task.createdAt, Date.now())}
                label="At work:"
                icon={<MdWorkHistory/>}/>    
            <InfoField
                className={classNames(cl.row, cl.singleRow)}
                data={<Badge bg="secondary">{capitalize(task.status)}</Badge>}
                label="Priority:"
                icon={<MdPriorityHigh/>}/> 
            <InfoField
                className={classNames(cl.row, cl.singleRow)}
                data={<Badge bg={getPriorityColor(task.priority)}>{task.priority}</Badge>}
                label="Status:"
                icon={<TbProgressHelp/>}/>
            {parent 
            && <InfoField
                className={classNames(cl.row, cl.singleRow)}
                data={getAnchorTitle(naturalIndexOf(parent, tasks), parent.title)}
                label="Parent:"
                icon={<TbSubtask/>}/>
            }
            {!!children.length 
            && <InfoField
                className={classNames(cl.row)}
                data={children.map(child => getAnchorTitle(naturalIndexOf(child, tasks), child.title))}
                label="Children:"
                icon={<TbSubtask/>}/>
            }

            <InfoField
                className={classNames(cl.row)}
                data={
                    <div className={cl.commentPanel}>
                        {!!task.comments.length && 
                            <CommentList 
                                comments={task.comments} 
                                className="p-0"
                                sendComment={sendComment}
                                />}
                        <CommentInput onSend={sendComment(-1)}/>
                    </div>
                }
                label="Comments:"
                icon={<TbSubtask/>}/>
            
            
        </Container>
    );
}
 
export default Info;