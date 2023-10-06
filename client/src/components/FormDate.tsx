import { FC, ReactElement, useRef, useState } from "react";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import classNames from "classnames";
import cl from '../style/form.module.css';
import { ISOtoDate, formatDate, formatTime, dateToISO, timeToISO } from "../utils/date";
import { maxDateToPick } from "../utils/consts";

interface IFormDate{
    title: string,
    date: Date;
    setDate: (dateMS: number) => void;
    icon?: ReactElement;
    editMode: boolean;
}

const FormDate:FC<IFormDate & React.HTMLAttributes<HTMLDivElement>> = 
    ({title, date, setDate, icon, editMode, ...props}) => {
    const curTimeRef = useRef<HTMLInputElement>(null);
    const curDateRef = useRef<HTMLInputElement>(null);
/*
    const timeHandler = (currentTime: string) => {
        console.log('new time: ', currentTime);
        const currentDate = dateToISO(date); // a string "yyyy:mm:dd"
        console.log('full current date: ', currentDate + ' ' + currentTime);

        const newDate = ISOtoDate(currentDate + ' ' + currentTime) // a Date object from a string "yyyy-mm-dd hh:ss"
        setDate(newDate.getTime());
    }
    const dateHandler = (currentDate: string) => {
        console.log('new date: ', currentDate);
        const currentTime = timeToISO(date); // a string "hh:mm"
        const newDate = ISOtoDate(currentDate + ' ' + currentTime) // a Date object from a string "yyyy-mm-dd hh:ss"
        setDate(newDate.getTime());
    }*/

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
                        classNames(editMode ? cl.inputOn : cl.inputOff, cl.timeInput)}
                    type="date"
                    min={dateToISO(new Date())}
                    max={maxDateToPick}
                    defaultValue={dateToISO(date)}
                    //onKeyDown={e => e.preventDefault()}
                    onBlur={saveDate}
                    disabled={!editMode}/>
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
                        classNames(editMode ? cl.inputOn : cl.inputOff, cl.timeInput)}
                    type="time"
                    defaultValue={timeToISO(date)}
                    onBlur={saveDate}
                    disabled={!editMode}/>
            </FloatingLabel>
        </Form.Group>
    );
}
 
export default FormDate;