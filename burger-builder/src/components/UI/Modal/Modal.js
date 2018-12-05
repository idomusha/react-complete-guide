import React, { Component} from 'react';

import styles from './Modal.scss';
import stylesBackdrop from '../Backdrop/Backdrop.scss';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    handleCloseModal = (event) => {
        if (event.target.className !== stylesBackdrop.Backdrop) return;
        else this.props.modalClosed();
    };

    render() {
        return (
            <Backdrop
                    show={this.props.show}
                    clicked={this.handleCloseModal}
            >
                <div
                    className={styles.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0',
                    }}
                >
                    {this.props.children}
                </div>
            </Backdrop>
        );
    };
}

export default Modal;
