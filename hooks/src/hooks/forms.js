import { useState } from 'react';

export const useFormInput = (params) => {
    const [value, setValue] = useState('');
    const [validity, setValidity] = useState(false);

    const handleInputChange = (event) => {
        setValue(event.target.value);
        if (event.target.value.trim() === '') setValidity(false);
        else setValidity(true);
    };

    return {
        value,
        validity,
        onChange: handleInputChange,
    };
};
