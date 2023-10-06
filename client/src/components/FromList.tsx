import { FC } from "react";
import Anchor from "./UI/Anchor/Anchor"
import classNames from 'classnames';
import cl from '../style/form.module.css';
import Form from "react-bootstrap/Form";
import InputFile from "./UI/InputFile/InputFile";

interface FormListProps{
    label: string;
    items: ({id: number; title: string})[];
    setItems: (id: number) => void;
}

const FormList:FC<FormListProps & React.HTMLAttributes<HTMLDivElement>> = 
    ({items, setItems, label, className, children, ...props}) =>{ 
    
    return (
        <Form.Group className={classNames(cl.list, className)} {...props}>
            <Form.Label className={cl.smallLabel}>{label}</Form.Label>
            {!!items.length && <div className={cl.listContent}>
                {items.map(item => 
                    <Anchor 
                        key={item.id}
                        className='mb-1 d-flex'
                        anchorClassname={cl.bgLight}
                        title={item.title}
                        closable={true}
                        onClose={() => setItems(item.id)}/>)}
                
            </div>}
            {children}

        </Form.Group>
    )
   
}


 
export default FormList;