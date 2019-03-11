import React/* , { useState, useEffect } */ from 'react';
import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        /* const [error, setError] = useState(null);

        // componentWillMount() {
        const requestInterceptor = axios.interceptors.request.use((request) => {
            setError(null);
            return request;
        });
        const responseInterceptor = axios.interceptors.response.use(response => response, (responseError) => {
            setError(responseError);
        });
        // }

        // componentWillUnmount() {
        useEffect(() => () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        }, [requestInterceptor, responseInterceptor]);
        // }

        const handleConfirmError = () => {
            setError(null);
        } */
        const [error, handleConfirmError] = useHttpErrorHandler(axios);

        return (
            <React.Fragment>
                <Modal show={error} modalClosed={handleConfirmError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </React.Fragment>
        );

    }
};

export default withErrorHandler;
