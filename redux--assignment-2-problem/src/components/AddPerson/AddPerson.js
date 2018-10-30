import React, { Component } from 'react';

import './AddPerson.css';

class AddPerson extends Component {
    state ={
        name: null,
        age: null,
    }

    handleChangeName = (event) => {
        this.setState({
            name: event.target.value,
        })
    }
    handleChangeAge = (event) => {
        this.setState({
            age: event.target.value,
        })
    }

    render() {
        return (
            <div className="AddPerson">
                <input onChange={this.handleChangeName} value={this.state.name} type="text" placeholder="Name"/>
                <input onChange={this.handleChangeAge} value={this.state.age} type="number" placeholder="Age"/>
                <button onClick={() => this.props.personAdded(this.state.name, this.state.age)}>Add Person</button>
            </div>
        );
    }
}

export default AddPerson;