import React, { Component } from 'react';
import { connect } from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import * as actionTypes from '../store/actions';

class Persons extends Component {
    /* state = {
        persons: []
    } */

    /* personAddedHandler = () => {
        const newPerson = {
            id: new Date(), // not really unique but good enough here!
            name: 'Firstname',
            age: Math.floor( Math.random() * 40 )
        }
        this.setState( ( state ) => {
            return { persons: state.persons.concat(newPerson)}
        } );
    }

    personDeletedHandler = (personId) => {
        this.setState( ( state ) => {
            return { persons: state.persons.filter(person => person.id !== personId)}
        } );
    } */

    render () {
        return (
            <div>
                <AddPerson personAdded={this.props.onAddPerson} />
                {this.props.persons.map(person => (
                    <Person
                        key={person.id}
                        name={person.name}
                        age={person.age}
                        clicked={() => this.props.onRemovePerson(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        persons: state.persons,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddPerson: (name, age) => dispatch({type: actionTypes.ADD_PERSON, name: name, age: age}),
        onRemovePerson: (id) => dispatch({type: actionTypes.REMOVE_PERSON, id: id}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);