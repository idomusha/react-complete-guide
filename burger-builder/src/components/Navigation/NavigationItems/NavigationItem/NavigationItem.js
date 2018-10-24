import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavigationItem.scss';

const navigationItem = (props) => (
    <li className={[styles.NavigationItem, styles[props.type]].join(' ')}>
        <NavLink
            to={props.link}
            exact
            activeClassName={styles.active}>
                {props.children}
        </NavLink>
    </li>
);

export default navigationItem;
