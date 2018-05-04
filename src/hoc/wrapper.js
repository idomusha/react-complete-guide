import React, { Component } from 'react';

/* const wrapper = (WrappedComponent, className) => (props) => (
    <div className={className}>
        <WrappedComponent {...props}/>
    </div>
); */

const wrapper = (WrappedComponent, className) => class extends Component {
    render() {
        return (
            <div className={className}>
                <WrappedComponent {...this.props}/>
            </div>
        );
    }
}

export default wrapper;