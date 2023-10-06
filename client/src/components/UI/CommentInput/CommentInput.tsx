import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import cl from './style.module.css'
import { FiSend } from "react-icons/fi";
import { FC, useState } from "react";


interface CommentInputProps{
  onSend: (e: React.FormEvent<HTMLFormElement>, text: string) => void;
  hide?: () => void;
}

const CommentInput:FC<CommentInputProps & React.HTMLAttributes<HTMLDivElement>> = ({onSend, id, hide, ...props}) => {
  const [text, setText] = useState<string>('');

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSend(e, text); // add new comment to the state
    setText(''); // make input clear
    hide && hide(); // if hide function is provided, hide this input
  }
  
  return (
      <form onSubmit={submitHandler}>
        <InputGroup {...props}>
          <Form.Control
            name="comment"
            as="textarea"
            placeholder="Enter your comment..."
            rows={2}
            value={text}
            onInput={inputHandler}
            className={cl.textarea}
            id={id}
          />
          <Button 
            type="submit"
            variant="outline-secondary" 
            className={cl.button}>
            <FiSend className={cl.icon}/>
          </Button>
        </InputGroup>
      </form>
    );
}
 
export default CommentInput;