import React from "react"   
import Condition from "../Сondition";
import Button from  "../Button/Button";

import "./List.css";

export default function List(props) {
    const itemList = props.itemList;
    const isDoneClass = {color: "rgba(0, 0, 0, 0.6)"}
    const list = itemList.map(item => 
        <li key={item.id} className="task">
            <Condition  
                isActive = {props.isActive}
                type = {2}
                defaultElement={
                    <React.Fragment>
                        <Button
                            id={item.id}
                            tag="input"
                            type="checkbox"
                            inputClass="task__checkbox custom-checkbox"
                            checked={item.complited === true ? "checked" : ""}
                            change={() => props.handleCheckboxChange(item)} 
                        />
                        <label htmlFor={item.id}/>
                    </React.Fragment>  
                }>
                    <Button 
                        tag="button"
                        doThis={() => props.daleteItem(item.id)}
                        buttonClass={"task__remove-button"}
                    />
            </Condition>
            <p  style={item.complited === true ? isDoneClass : {}}
                onClick={() => {props.changeItem(item)}}
                className={props.isActive === true ? "task__text task__text_pointer" : "task__text"}
            >
                {item.value}
            </p>
        </li>
    )
    
    return(
        <ul className="tasks-list">
            {list}
        </ul>
    ) 
}