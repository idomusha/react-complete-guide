import React from 'react';

import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.scss';

const sideDrawer = (props) => {
    let classes = [styles.SideDrawer, styles.Close];

    if (props.open) {
        classes = [styles.SideDrawer, styles.Open];
    }

    return (
        <React.Fragment>
            <Backdrop
                show={props.open}
                clicked={props.closed}
            />
            <div className={classes.join(' ')}>
                <Logo/>
                <NavigationItems type="SideDrawer"/>
            </div>
        </React.Fragment>
    );
};

export default sideDrawer;
