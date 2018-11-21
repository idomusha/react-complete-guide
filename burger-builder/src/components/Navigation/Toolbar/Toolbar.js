import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './Toolbar.scss';

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <Logo/>
        <NavigationItems
            type="Toolbar"
            logged={props.logged}/>
    </header>
);

export default toolbar;