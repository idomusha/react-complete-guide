export const updateObject = (object, values) => {
    return {
        ...object,
        ...values,
    };
};