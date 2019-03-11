import React from 'react';

import styles from './NavigationItems.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <nav className={[styles.Navigation, styles[props.type]].join(' ')}>
        <ul className={styles.NavigationItems}>
            <NavigationItem type={props.type} link="/" clicked={props.clicked}>Builder</NavigationItem>
            {props.logged
                ? <NavigationItem type={props.type} link="/orders" clicked={props.clicked}>Orders</NavigationItem>
                : null
            }
            {!props.logged
                ? <NavigationItem type={props.type} link="/sign" clicked={props.clicked}>Sign</NavigationItem>
                : <NavigationItem type={props.type} link="/logout" clicked={props.clicked}>Logout</NavigationItem>
            }
        </ul>
    </nav>
);

export default navigationItems;
