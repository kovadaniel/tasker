import { FC } from "react";
import { IComment } from "../models/IComment";
import Comment from "./UI/Comment/Comment";
import cl from '../style/comment.module.css'
import classNames from "classnames";


interface CommentListProps{
    comments: IComment[];
    className?: string;
    sendComment: (id: number) => 
        (e: React.FormEvent<HTMLFormElement>, text: string) => void;
}

const CommentList:FC<CommentListProps> = ({comments, className = '', sendComment}) => {

    return (  
        <ul className={classNames(cl.list, className)}>
            {comments.map(comment => 
                <li key={comment.id}>
                    <Comment 
                        comment={comment}
                        sendComment={sendComment}/>
                </li>)}
        </ul>
    );
}
 
export default CommentList;