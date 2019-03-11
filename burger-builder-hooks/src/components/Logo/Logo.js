import React from 'react';

import styles from './Logo.scss';
import logoImage from '../../assets/images/logo.svg';

const logo = () => (
    <div className={styles.Logo}>
        <img src={logoImage} alt="App title"/>
    </div>
);

export default logo;
