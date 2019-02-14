import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import './Backdrop.css';
import './Modal.css';

const animationTiming = {
    enter: 300,
    exit: 1000
}
const modal = (props) => {

    return (
        <React.Fragment>
            <CSSTransition
                in={props.show}
                timeout={animationTiming}
                mountOnEnter
                unmountOnExit
                classNames="backdrop-fade"
                // classNames={{
                //     enter: 'enter',
                //     enterActive: 'entering',
                //     enterDone: 'entered',
                //     exit: 'exit',
                //     exitActive: 'exiting',
                //     exitDone: 'exited',
                //     appear: 'appear',
                //     appearActive: 'appearing',
                // }}
            >
                <div className="Backdrop" onClick={props.closed}></div>
            </CSSTransition>
            <CSSTransition
            in={props.show}
            timeout={animationTiming}
            mountOnEnter
            unmountOnExit
            classNames="modal-slide"
            >
                <div className="Modal">
                    <h1>A Modal</h1>
                    <button className="Button" onClick={props.closed}>Dismiss</button>
                </div>
            </CSSTransition>
        </React.Fragment>
    );
}

export default modal;