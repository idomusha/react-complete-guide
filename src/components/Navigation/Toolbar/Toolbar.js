import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Button from '../../UI/Button/Button';
import styles from './Toolbar.scss';

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <Button>Menu</Button>
        <Logo/>
        <nav>
            <NavigationItems type="Toolbar"/>
        </nav>
    </header>
);

export default toolbar;