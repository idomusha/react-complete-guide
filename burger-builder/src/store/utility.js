export const updateObject = (object, properties) => {
    return {
        ...object,
        ...properties,
    };
};