import React from 'react';

import styles from './NavigationItems.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={[styles.NavigationItems, styles[props.type]].join(' ')}>
       <NavigationItem type={props.type} link="/" active>Builder</NavigationItem>
       <NavigationItem type={props.type} link="/">Checkout</NavigationItem>
    </ul>
);

export default navigationItems;
