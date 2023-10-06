import React, { FC } from "react";
import cl from "./style.module.css";
import classNames from "classnames";

interface IAnchor{
    title: string,
    anchorClassname?: string;
    closable?: boolean;
    onClose?: () => void;
}
/**
 * a component for displaying some text in rectangular frame with --dark-blue background
 */
const Anchor:FC<IAnchor & React.HTMLAttributes<HTMLDivElement>> = 
    ({title, anchorClassname, closable = false, onClose = () => {}, ...props}) => {
    const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();

        onClose && onClose();
    }
    return (
        <div {...props}>
            <div className={classNames(cl.container, anchorClassname)}>
                <div className={cl.content}>
                    {title}
                </div>
                {closable && 
                <div className={cl.close} onClick={clickHandler}>✕</div>}
            </div>
        </div> 
    );
}
 
export default Anchor;