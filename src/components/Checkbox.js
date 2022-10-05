import React, {useState} from "react";

const Checkbox = ({inputname, checked, ...props}) =>{
    const defaultChecked = checked ? checked : false;
    const [isChecked, setIsChecked] = useState(defaultChecked);
    return(
        <label>
            <input type="checkbox"
            onChange={() => setIsChecked((prev) => !prev)} 
            checked={isChecked}
            defaultChecked={defaultChecked}
            {...props}
            />
            <span className={isChecked? `active-genre-filter` : `inactive-genre-filter`}>{inputname}</span>
        </label>
    );
}
export default Checkbox;