import React from "react"   
import Button from  "../Button/Button";
import {TransitionGroup, CSSTransition, SwitchTransition} from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import "./List.css";

export default function List(props) {
    const dispatch = useDispatch();
    const selectItemList = state => state.itemList;
    const itemList = useSelector(selectItemList);
    const isDoneClass = {color: "rgba(0, 0, 0, 0.6)"}

    const handleCheckboxChange = (item) => {
        dispatch({type: 'item/itemToggled', payload: item.id})
    }

    const deleteItem = (item) => {
        dispatch({type: 'item/itemDeleted', payload: item.id})
    }
    
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
                                    doThis={() => deleteItem(item)}
                                    buttonClass={"task__remove-button"}
                                />
                                :
                                <React.Fragment>
                                    <Button
                                        id={item.id}
                                        tag="input"
                                        type="checkbox"
                                        inputClass="task__checkbox custom-checkbox"
                                        checked={item.completed === true ? "checked" : ""}
                                        change={() => handleCheckboxChange(item)} 
                                    />
                                    <label htmlFor={item.id}/>
                                </React.Fragment>  
                            }
                        </div>
                    </CSSTransition>
                </SwitchTransition>
                <p  style={item.completed === true ? isDoneClass : {}}
                    onClick={ props.isActive ? () => {props.openTheEditor(item)} : () => handleCheckboxChange(item)}
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