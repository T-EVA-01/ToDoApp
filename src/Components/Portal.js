import React from 'react';
import ReactDom from "react-dom";

export default class Portal extends React.Component {
    constructor(props) {
        super(props)

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    componentWillMount() {
        this.root = document.createElement('div');
        this.root.id = `${this.props.id}`;
        document.getElementById('root').appendChild(this.root);
    }

    componentWillUnmount() {
        document.getElementById('root').removeChild(this.root)
    }

    render() {
        return (ReactDom.createPortal(
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
            , 
            this.root) 
        )
    }
}

