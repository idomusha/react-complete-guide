import React, { Component } from "react";

/* const wrapper = (WrappedComponent, className) => (props) => (
    <div className={className}>
        <WrappedComponent {...props}/>
    </div>
); */

const wrapper = (WrappedComponent, className) => {
  const Wrapper = class extends Component {
    render() {
      return (
        <div className={className}>
          <WrappedComponent ref={this.props.forwardedRef} {...this.props} />
        </div>
      );
    }
  };

  return React.forwardRef((props, ref) => {
    return <Wrapper {...props} forwardedRef={ref} />;
  });
};

export default wrapper;
