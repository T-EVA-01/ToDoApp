import React from 'react';
import Button from '../Button/Button';

import './Form.css'

export default function Form(props) {

    return(
        <form className="add-form">
            <textarea 
                onChange={props.handleChange} 
                className={'add-form__textarea ' + props.areaClass} 
                placeholder="Введите текст задачи"
                defaultValue={props.text}
            />
            <div className="add-form__wrapper">
                <Button
                    tag="button" 
                    doThis={props.onClose} 
                    buttonClass={"add-form__button add-form__button_close"}>
                    Закрыть
                </Button>
                <Button
                    tag="input"
                    type="button"
                    inputClass="add-form__button add-form__button_add"
                    textButton={props.textButton}
                    click={props.addItem}
                />
            </div>
        </form>
    )
}