import React, { FC, useState } from "react";
import { IComment } from "../../../models/IComment";
import { anonUserImage, anonUserName } from "../../../utils/consts";
import CommentList from "../../CommentList";
import cl from './style.module.css'
import {FaReply} from 'react-icons/fa'
import CommentInput from "../CommentInput/CommentInput";
import { ITask } from "../../../models/ITask";

interface CommentProps{
    comment: IComment;
    sendComment: (id:number) => (e: React.FormEvent<HTMLFormElement>, text: string) => void;
}

const Comment:FC<CommentProps> = ({comment, sendComment}) => {
    const [showComment, setShowComment] = useState(false)
    const {id, user, text, comments} = comment;

    const openInput = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
        e.stopPropagation()
        setShowComment(true)
    }
    const hideInput = () => {
        setShowComment(false);
    }
    
    return ( 
        <> 
            <div className={cl.container} onClick={hideInput}>
                <img src={user.image || anonUserImage} alt="user" className={cl.image}/>
                <div className={cl.content}>
                    <h6 className={cl.name}>{user.name || anonUserName}</h6>
                    <p className={cl.text}>{text}</p>
                    <div className={cl.panel}>
                        <label 
                            htmlFor={"comment-"+id} 
                            onClick={openInput}
                            className={cl.label}>
                            <FaReply className={cl.panelIcon}/>
                        </label>
                    </div>
                </div>
            </div>
            <CommentList 
                comments={comments} 
                sendComment={sendComment}
                className={cl.section}/>
            {showComment && 
            <CommentInput 
                id={"comment-"+id}
                className={cl.input}
                onSend={sendComment(id)}
                hide={hideInput}/>}
        </>
    );
}
 
export default Comment;