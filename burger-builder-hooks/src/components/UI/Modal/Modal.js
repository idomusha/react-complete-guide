import React, { useEffect} from 'react';

import styles from './Modal.scss';
import stylesBackdrop from '../Backdrop/Backdrop.scss';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {

    // replaced by React.memo
    /* shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    } */

    const handleCloseModal = (event) => {
        if (event.target.className !== stylesBackdrop.Backdrop) return;
        else props.modalClosed();
    };


    return (
        <Backdrop
                show={props.show}
                clicked={handleCloseModal}
        >
            <div
                className={styles.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0',
                }}
            >
                {props.children}
            </div>
        </Backdrop>
    );

}

export default React.memo(modal, (previousProps, nextProps) =>
    nextProps.show === previousProps.show &&
    nextProps.children === previousProps.children
);
