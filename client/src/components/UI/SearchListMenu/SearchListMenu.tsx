import React, { useState, forwardRef } from "react";
import Form from "react-bootstrap/Form";
import cl from './style.module.css'
import classNames from "classnames";


const SearchListMenu = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({children, className, style}, ref) => {
      const [value, setValue] = useState('');
  
      return (
            <div 
                ref={ref}
                style={style}
                className={classNames(className, cl.container)}>
                <Form.Control
                    autoFocus
                    className={cl.search}
                    placeholder="Search..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <ul className={cl.list}>
                    {React.Children.toArray(children).filter(
                        (child) => {
                            if (React.isValidElement(child))
                                return !value || child.props.children.toLowerCase().includes(value);
                            else 
                                return false;
                        }
                    )}
                </ul>
            </div>
      );
    },
  );

  export default SearchListMenu;