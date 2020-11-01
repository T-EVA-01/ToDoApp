import React from 'react';
import Form from '../Form/Form';

import './ModalWindow.css';

export default function ModalWindow(props) {

    return(
        <div className="container container_position">
            <div className="modal-window">
                <Form 
                    handleChange={(e) => props.handleInputChange('newItem', e.target.value)}
                    areaClass={props.areaClass}
                    text={props.text}
                    onClose={props.onClose}
                    textButton={props.textButton}
                    addItem={props.addItemToPage}   
                    />
            </div>
        </div>
    )
}
