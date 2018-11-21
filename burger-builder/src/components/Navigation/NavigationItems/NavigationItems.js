import React from 'react';

import styles from './NavigationItems.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <nav className={[styles.Navigation, styles[props.type]].join(' ')}>
        <ul className={styles.NavigationItems}>
            <NavigationItem type={props.type} link="/">Builder</NavigationItem>
            {props.logged
                ? <NavigationItem type={props.type} link="/orders">Orders</NavigationItem>
                : null
            }
            {!props.logged
                ? <NavigationItem type={props.type} link="/sign">Sign</NavigationItem>
                : <NavigationItem type={props.type} link="/logout">Logout</NavigationItem>
            }
        </ul>
    </nav>
);

export default navigationItems;
