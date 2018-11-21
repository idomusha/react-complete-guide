import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                <Toolbar
                    logged={this.props.isLogged}
                />
                <Button
                    type="toggle-sidedrawer"
                    clicked={this.handleToggleSideDrawer}
                    opened={this.state.showSideDrawer}
                />
                <SideDrawer
                    logged={this.props.isLogged}
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

const mapStateToProps = (state) => {
    return {
        isLogged: state.authReducer.token !== null
    };
};

export default connect(mapStateToProps)(Layout);