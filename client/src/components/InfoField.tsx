import React, { FC, ReactElement } from "react";
import Row from "react-bootstrap/Row";
import cl from "../style/info.module.css"
import Anchor from "./UI/Anchor/Anchor";

interface InfoFieldProps{
    data: string | string[] | ReactElement;
    label?: string;
    icon?: ReactElement;
}
const InfoField:FC<InfoFieldProps & React.HTMLAttributes<HTMLDivElement>> = ({data, label, icon, ...props}) => {
    return (  
        <Row {...props}>
            <div className={cl.labelWrap}>
                <span className={cl.icon}>{icon}</span>
                <span className={cl.label}>{label}</span>
            </div>
            
            <div className={cl.content}>
                {Array.isArray(data) 
                ? <div>
                    {data.map((info, i) => 
                        <Anchor 
                            key={i}
                            className='ms-3 mb-1' 
                            title={info}/>)}
                </div>
                : data}
            </div>
        </Row>
    );
}
 
export default InfoField;