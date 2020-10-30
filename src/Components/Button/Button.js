import React from 'react';
import './Button.css';

export default function Button(props) {
    const tag = props.tag; 

    switch(tag) {
        case 'button':
            return(
                <button 
                    onClick={props.doThis} 
                    className={props.buttonClass + ' button'}>
                        {props.children}
                </button>
            );
        case 'input': 
                return(
                    <input 
                        id={props.id}
                        type={props.type}
                        checked={props.checked}
                        value={props.textButton}
                        className={props.inputClass + ' button'}
                        onChange={props.change}
                        onClick={props.click}
                    />
                );
        default:
            console.log("Передайте в компонент Button проп tag со значениями button или input");
            break
    }
}
