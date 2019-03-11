import React, { useState } from 'react';
import { connect } from 'react-redux';

import styles from './Layout.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Button from '../../components/UI/Button/Button';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const handleToggleSideDrawer = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    const handleCloseSideDrawer = () => {
        setShowSideDrawer(false);
    }

    return (
        <React.Fragment>
            <Toolbar
                logged={props.isLogged}
            />
            <Button
                type="toggle-sidedrawer"
                clicked={handleToggleSideDrawer}
                opened={showSideDrawer}
            />
            <SideDrawer
                logged={props.isLogged}
                open={showSideDrawer}
                closed={handleCloseSideDrawer}
            />
            <main className={styles.Content}>
                {props.children}
            </main>
        </React.Fragment>
    );

}

const mapStateToProps = (state) => {
    return {
        isLogged: state.authReducer.token !== null
    };
};

export default connect(mapStateToProps)(layout);