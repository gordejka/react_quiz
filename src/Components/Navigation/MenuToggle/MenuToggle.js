import React from "react";
import classes from "./MenuToggle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const MenuToggle = props => {
    const cls=[
        classes.MenuToggle,
    
    ]
    props.isOpen && cls.push(classes.open)

    return (
        <span onClick={props.onToggle} className={cls.join(' ')}>
            {props.isOpen ? (
                <FontAwesomeIcon icon={faTimes} />
            ) : (
                <FontAwesomeIcon icon={faBars} />
            )}
        </span>
    );
};

export default MenuToggle;
