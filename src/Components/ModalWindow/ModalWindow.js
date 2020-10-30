import React, {Component} from 'react';
import Form from '../Form/Form';

import './ModalWindow.css';

export default class ModalWindow extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.handleInputChange('newItem', e.target.value);
    }

    render() {
        return(

            <div className="container container_position">
                <div className="modal-window">
                    <Form 
                        handleChange={this.handleChange}
                        areaClass={this.props.areaClass} 
                        text={this.props.text}
                        onClose={this.props.onClose}
                        textButton={this.props.textButton}
                        addItem={this.props.addItemToPage}
                    />
                </div>
            </div>

        )
    }
} 
