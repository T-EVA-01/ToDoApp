import React from 'react';
import ReactDom from "react-dom";


export default function Portal(props) {

    const root = document.getElementById(props.id);
    return(
        ReactDom.createPortal(
            <React.Fragment>
                {props.children}
            </React.Fragment>
            ,
            root
        )
    );
}