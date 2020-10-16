import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
    return ReactDOM.createPortal(
        <div className="ui dimmer active" onClick={props.onDismiss}>
            <div className="ui modal active" onClick={e => e.stopPropagation()}>
                <div className="header">{props.title}</div>
                <div className="content">
                    {props.content}
                </div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    )
}


export default Modal;