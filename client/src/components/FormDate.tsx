import { FC, ReactElement, useRef, useState } from "react";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import classNames from "classnames";
import cl from '../style/form.module.css';
import { ISOtoDate, dateToISO, msInYear, timeToISO } from "../utils/date";
import { maxDateToPick } from "../utils/consts";

interface IFormDate{
    title: string,
    date: Date;
    setDate: (dateMS: number) => void;
    icon?: ReactElement;
}

const FormDate:FC<IFormDate & React.HTMLAttributes<HTMLDivElement>> = 
    ({title, date, setDate, icon, ...props}) => {
    const curTimeRef = useRef<HTMLInputElement>(null);
    const curDateRef = useRef<HTMLInputElement>(null);

    const saveDate = () => {
        const dateString = curDateRef.current?.value + ' ' + curTimeRef.current?.value; // a string "yyyy-mm-dd hh:ss"
        const newDate = ISOtoDate(dateString) // a Date object from 
        setDate(newDate.getTime()); // setDate(milliseconds)
    }

    return (
        <Form.Group {...props}>
            <FloatingLabel
                className={cl.labelWrap}
                label = {
                    <span className='text-secondary d-flex align-items-end'>
                        <span>{icon}</span>
                        <span>{title}</span>
                    </span>
                }
            >
                <Form.Control 
                    ref={curDateRef}
                    className= {
                        classNames(cl.input, cl.timeInput)}
                    type="date"
                    min={dateToISO(new Date(Date.now() - msInYear))}
                    max={maxDateToPick}
                    defaultValue={dateToISO(date)}
                    onBlur={saveDate}/>
            </FloatingLabel>

            <FloatingLabel
                className={cl.labelWrap}
                label = {
                    <span className='text-secondary d-flex align-items-end'>
                        <span>{icon}</span>
                        <span>{title}</span>
                    </span>
                }
            >
                <Form.Control 
                    ref={curTimeRef}
                    className= {
                        classNames(cl.input, cl.timeInput)}
                    type="time"
                    defaultValue={timeToISO(date)}
                    onBlur={saveDate}/>
            </FloatingLabel>
        </Form.Group>
    );
}
 
export default FormDate;