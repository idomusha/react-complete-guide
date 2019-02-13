import React, { Component } from "react";
import Transition from 'react-transition-group/Transition';

import "./App.css";
import Modal from "./components/Modal/Modal";
import List from "./components/List/List";

class App extends Component {
  state = {
    modalIsOpen: false,
    showBlock: false,
  };

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>

        <section style={{
              margin: "20px auto",
        }}>
          <button className="Button" onClick={() => this.setState(prevState => ({showBlock: !prevState.showBlock}))}>Toggle</button>
          <Transition
            in={this.state.showBlock}
            timeout={300}
            mountOnEnter
            unmountOnExit
            onEnter={() => console.log('onEnter')}
            onEntering={() => console.log('onEntering')}
            onEntered={() => console.log('onEntered')}
            onExit={() => console.log('onExit')}
            onExiting={() => console.log('onExiting')}
            onExited={() => console.log('onExited')}
          >
            {/* {state => <p>{state}</p>} */}
            {state => (
              <div style={{
                backgroundColor: "deeppink",
                width: 100,
                height: 100,
                margin: "20px auto",
                opacity: state === 'exiting' ? 0 : 1,
                transition: "opacity .3s ease",
              }}></div>
            )}
          </Transition>
        </section>

        <Modal key="modal" show={this.state.modalIsOpen} closed={this.closeModal}/>

        {/* {(this.state.modalIsOpen || this.state.modalIsOpening || this.state.modalIsClosing)
          ? [
            <Modal key="modal" show={this.state.modalIsOpen} closed={this.closeModal}/>,
            <Backdrop key="backdrop" show={this.state.modalIsOpen} closed={this.closeModal}/>
          ]
          : null
        } */}
        <button className="Button" onClick={this.openModal}>Open Modal</button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
