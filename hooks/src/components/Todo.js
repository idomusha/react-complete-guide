import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react';
import axios from 'axios';

import List from './List/List';
import { useFormInput } from '../hooks/forms';

import './Todo.scss';

const todo = (props) => {
    // const [todoLabel, setTodoLabel] = useState(''); // '' is the default value of `todoLabel`
    // const [submittedTodo, setSubmittedTodo] = useState(null);
    // const [todoList, setTodoList] = useState([]);
    /* const [todoState, setTodoState] = useState({
        userInput: '',
        todoList: [],
    }); */
    const [inputIsValid, setInputIsValid] = useState(false);
    // const todoInputReference = useRef();
    const todoInput = useFormInput;

    const todoListReducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                return state.concat(action.payload);
            case 'REMOVE':
                return state.filter((todo) => todo.id !== action.payload);
            case 'SET':
                return action.payload;
            default:
                return state;
        }
    }

    const [todoList, dispatch] = useReducer(todoListReducer, []);

    useEffect(
        () => {
            axios
            .get(
                'https://hooks-78df9.firebaseio.com/todos.json',
            )
            .then(result => {
                console.log(result);

                const todoData = result.data;
                const todos = [];

                for (const key in todoData) {
                    todos.push({
                        id: key,
                        label: todoData[key].label,
                    })
                }

                // setTodoList(todos);
                dispatch({type: 'SET', payload: todos});
            })
            .catch(error => {
                console.log(error);
            });
            return () => {
                console.log('cleanup')
            };
        },
        [],
    );

    /* const handleMouseMove = (event) => {
        console.log(event);
    }; */

    // return allows to clean events or variables
    /* useEffect(
        () => {
            document.addEventListener('mousemove', handleMouseMove);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
            };
        },
        [],
    ); */

    /* useEffect(
        () => {
            if (submittedTodo) {
                // setTodoList(todoList.concat(submittedTodo));
                dispatch({type: 'ADD', payload: submittedTodo});
            }
        },
        [submittedTodo],
    ) */

    /* const handleInputChange = (event) => {
        setTodoLabel(event.target.value);
        // setTodoState({
        //     userInput: event.target.value,
        //     todoList: todoState.todoList,                               // set previous state value because no automatic merging
        // });
    } */

    const handleAdd = () => {


        /* setTodoState({
            userInput: todoState.userInput,                             // set previous state value because no automatic merging
            todoList: todoState.todoList.concat(todoState.userInput),
        }); */

        // const todoLabel = todoInputReference.current.value;
        const todoLabel = todoInput.value;

        axios.post(
            'https://hooks-78df9.firebaseio.com/todos.json',
            {
                label: todoLabel,
            },
        )
        .then(response => {
            console.log(response);
            const todoItem = {id: response.data.name, label: todoLabel}
            // setSubmittedTodo(todoItem);
            dispatch({type: 'ADD', payload: todoItem});
            // todoInputReference.current.value = '';
            todoInput.value = '';
        })
        .catch(error => {
            console.log(error);
        });
    }

    const handleRemove = (todoId) => {
        axios.delete(
            `https://hooks-78df9.firebaseio.com/todos/${todoId}.json`,
        )
        .then(response => {
            console.log(response);
            dispatch({type: 'REMOVE', payload: todoId});
        })
        .catch(error => {
            console.log(error);
        });
    }

    const handleInputValidation = (event) => {
        if (event.target.value.trim() === '') setInputIsValid(false);
        else setInputIsValid(true);
    };

    return (
        <React.Fragment>
            <form>
                <input type="text" placeholder="Todo"

                // onChange={handleInputChange}
                // value={todoLabel}

                // ref={todoInputReference}
                // onChange={handleInputValidation}
                // className={inputIsValid ? '' : 'not-valid'}

                onChange={todoInput.onChange}
                className={todoInput.validity ? '' : 'not-valid'}
                />
                <button type="button" onClick={handleAdd}>Add</button>
            </form>
            {/* don't rerender the list on input change: render the component only if todoList is updated */}
            {useMemo(() => <List items={todoList} remove={handleRemove} />, [todoList])}
        </React.Fragment>
    );
};

export default todo;