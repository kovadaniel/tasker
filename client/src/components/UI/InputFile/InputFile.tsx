import Form from "react-bootstrap/Form";
import {FC} from 'react'
import cl from './style.module.css'
import classNames from "classnames";

export interface InputFileProps{
    setFiles: (files: File[]) => void,
}

const InputFile:FC<InputFileProps & React.HTMLAttributes<HTMLDivElement>> = ({setFiles, className, ...props}) => {
    return (  
        <Form.Group 
            controlId="formFile" 
            className={classNames("file-input-form", className)} 
            {...props}>
            
            <Form.Control 
                type="file" 
                multiple={true}
                onChange={e => {
                    const files = (e.currentTarget as HTMLInputElement).files;
                    const filesArray = files ? Array.from(files) : [];
                    setFiles(filesArray);
                }}/>
        </Form.Group>
    );
}
 
export default InputFile;