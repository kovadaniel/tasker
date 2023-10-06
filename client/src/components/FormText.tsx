import { FC } from 'react'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import cl from '../style/form.module.css';

interface IFormText{
    text: string;
    setText: (task: string) => void
    label: string;
}

const FormText:FC<IFormText & React.HTMLAttributes<HTMLDivElement>> = 
    ({text, setText, label,...props}) => {
    return (
        <Form.Group {...props}>
            <FloatingLabel
                className={cl.labelWrap}
                label = {<span className='text-secondary'>{label}</span>}
            >
                <Form.Control 
                    className={cl.inputOn}
                    type="text" 
                    placeholder=''
                    value={text}
                    onInput={e => setText(e.currentTarget.value)}/>
            </FloatingLabel>
        </Form.Group>
    );
}
 
export default FormText;