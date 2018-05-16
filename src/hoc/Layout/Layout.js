import React, { Component } from 'react';

import styles from './Layout.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Button from '../../components/UI/Button/Button';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    handleToggleSideDrawer = () => {
        this.setState({showSideDrawer: !this.state.showSideDrawer});
    }

    handleCloseSideDrawer = () => {
        this.setState({showSideDrawer: false});
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar/>
                <Button
                    type="toggle-sidedrawer"
                    clicked={this.handleToggleSideDrawer}
                    opened={this.state.showSideDrawer}
                />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.handleCloseSideDrawer}
                />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}

export default Layout;