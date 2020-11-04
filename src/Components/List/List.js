import React from "react"   
import Button from  "../Button/Button";
import {TransitionGroup, CSSTransition, SwitchTransition} from 'react-transition-group';

import "./List.css";

export default function List(props) {
    const itemList = props.itemList;
    const isDoneClass = {color: "rgba(0, 0, 0, 0.6)"}
    const list = itemList.map(item => 
        <CSSTransition
            key={item.id}
            timeout={700}
            classNames={"item"}    
        >
            <li key={item.id} className="task">

                <SwitchTransition
                    mode={"out-in"}
                >
                    <CSSTransition
                        key={props.isActive}
                        addEndListener={(node, done) => {
                            node.addEventListener("transitionend", done, false);
                        }}
                        classNames="fade"
                    >
                        <div className='anima-container'>
                            {   props.isActive 
                                ? 
                                <Button 
                                    tag="button"
                                    doThis={() => props.daleteItem(item.id)}
                                    buttonClass={"task__remove-button"}
                                />
                                :
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
                            }
                        </div>
                    </CSSTransition>
                </SwitchTransition>
                <p  style={item.complited === true ? isDoneClass : {}}
                    onClick={ props.isActive ? () => {props.changeItem(item)} : () => {props.handleCheckboxChange(item)}}
                    className={"task__text"}
                >
                    {item.value}
                </p>
            </li>
        </CSSTransition>
    )
    
    return(
        <TransitionGroup 
            component='ul' 
            className="tasks-list"
        >
                {list}
        </TransitionGroup>
    ) 
}