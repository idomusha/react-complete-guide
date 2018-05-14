import React, { Component } from 'react';

import styles from './Layout.scss';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: true
    }

    handleCloseSideDrawer = () => {
        this.setState({showSideDrawer: false});
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar/>
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