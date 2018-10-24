import React from 'react';

import styles from './NavigationItems.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <nav className={[styles.Navigation, styles[props.type]].join(' ')}>
        <ul className={styles.NavigationItems}>
            <NavigationItem type={props.type} link="/">Builder</NavigationItem>
            <NavigationItem type={props.type} link="/orders">Orders</NavigationItem>
        </ul>
    </nav>
);

export default navigationItems;
