import { FC, useRef, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import cl from '../style/form.module.css';

interface IFormTextarea{
    text: string;
    setText: (task: string) => void;
    label: string;
    editMode: boolean;
}

const FormTextarea:FC<IFormTextarea & React.HTMLAttributes<HTMLDivElement>> = 
    ({text, setText, label, editMode, ...props}) => {
    const ref = useRef<HTMLTextAreaElement >(null)
    const autoGrow = (element: HTMLElement) => {
        element.style.height = "0px";
        element.style.height = (element.scrollHeight) + "px";
    }
    useEffect(() => {
        ref.current && autoGrow(ref.current)
    }, [ref, editMode])

    return (
        <Form.Group {...props}>
        {editMode 
            ? 
            <FloatingLabel
                className={cl.labelWrap}
                label = {<p className='text-secondary'>{label}</p>}
            >
                <Form.Control 
                    ref={ref}
                    className={cl.inputOn}
                    type="text"
                    as="textarea"
                    value={text}
                    onInput={e => {
                        setText(e.currentTarget.value);
                        autoGrow(e.currentTarget)
                    }}
                    placeholder='Input your description'/>
            </FloatingLabel>
            : 
            <p className='mb-0'>{text}</p>
        }
    </Form.Group>
    );
}
 
export default FormTextarea;