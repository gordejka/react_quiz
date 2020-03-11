import React from "react";
import classes from "./Select.module.css";

const Select = prpos => {
    const htmlFor = `${prpos.label}-${Math.random()}`;

    return (
        <div className={classes.Select}>
            <label htmlFor={htmlFor}></label>
            <select id={htmlFor} value={prpos.value} onChange={prpos.onChange}>
                {prpos.options.map((option, index) => {
                    return (
                        <option value={option.value} key={option.value + index}>
                            {option.text}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default Select;
