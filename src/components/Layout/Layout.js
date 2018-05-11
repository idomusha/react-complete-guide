import React from 'react';

import styles from './Layout.scss';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
    <React.Fragment>
        <Toolbar/>
        <main className={styles.Content}>
            {props.children}
        </main>
    </React.Fragment>
);

export default layout;