import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { capitalize } from "../utils";
import cl from '../style/form.module.css';

interface FormSelectProps<T>{
    label: string;
    value: T;
    setValue:(value: T) => void;
    options: T[];
}

const FormSelect = <T extends string>({label, options, value, setValue, ...props}: FormSelectProps<T> & React.HTMLAttributes<HTMLDivElement>) => {
    return ( 
        <Form.Group {...props}>
            <FloatingLabel 
                label={<span className='text-secondary'>{label}</span>}
                className={cl.labelWrap}>
                <Form.Select 
                    aria-label="Floating label select example"
                    className={cl.input}
                    value={value}
                    onChange={e => setValue(e.currentTarget.value as any)}>
                    {options.map(option => 
                        <option key={option} value={option as any}>{capitalize((option as any) as string)}</option>)}
                </Form.Select>
            </FloatingLabel>
        </Form.Group>
    );
}
 
export default FormSelect;