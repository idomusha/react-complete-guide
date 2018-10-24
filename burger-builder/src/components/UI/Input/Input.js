import React from 'react';

import styles from './Input.scss';

const input = (props) => {
    let formElement = null;
    const inputClasses = [styles.Input];

    if (props.invalid && props.validation && props.filled) {
        inputClasses.push(styles.Invalid);
    }

    switch (props.elementType) {
        case ('text'):
        case ('email'):
        case ('password'):
            formElement = (
                <div className={inputClasses.join(' ')} data-type={props.elementType}>
                    <label className={styles.Label}>{props.label}</label>
                    <input
                        className={styles.Field}
                        type={props.elementType}
                        {...props.elementConfig}
                        value={props.elementValue}
                        onChange={props.changed}/>
                </div>
            );
            break;
        case ('checkbox'):
        case ('radio'):
            formElement = (
                <div className={inputClasses.join(' ')} data-type={props.elementType}>
                    {props.elementConfig.options.map(option => (
                        <div key={props.elementName + '-' + option.value}>
                            <input
                                className={styles.Field}
                                name={props.elementName}
                                type={props.elementType}
                                id={props.elementName + '-' + option.value}
                                value={option.value}
                                onChange={props.changed}/>
                            <label
                                className={styles.Label}
                                htmlFor={props.elementName + '-' + option.value}>
                                {option.display}
                            </label>
                        </div>
                    ))}
                </div>
            );
            break;
        case ('select'):
            formElement = (
                <div className={inputClasses.join(' ')}>
                    <select
                        className={styles.Field}
                        value={props.elementValue}
                        onChange={props.changed}>
                        <option value=""></option>
                        {props.elementConfig.options.map(option => (
                            <option value={option.value}>{option.display}</option>
                        ))}
                    </select>
                </div>
            );
            break;
        case ('textarea'):
            formElement = (
                <div className={inputClasses.join(' ')}>
                    <textarea
                        className={styles.Field}
                        {...props.elementConfig}
                        value={props.elementValue}
                        onChange={props.changed}/>
                </div>
            );
            break;
        default:
            formElement = (
                <div className={inputClasses.join(' ')}>
                    <input
                        className={styles.Field}
                        {...props.elementConfig}
                        value={props.elementValue}
                        onChange={props.changed}/>
                </div>
            );
    }

    return formElement;
}

export default input;
