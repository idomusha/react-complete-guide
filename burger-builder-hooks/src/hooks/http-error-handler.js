import { useState, useEffect} from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

    // componentWillMount() {
    const requestInterceptor = httpClient.interceptors.request.use((request) => {
        setError(null);
        return request;
    });
    const responseInterceptor = httpClient.interceptors.response.use(response => response, (responseError) => {
        setError(responseError);
    });
    // }

    // componentWillUnmount() {
    useEffect(() => () => {
        httpClient.interceptors.request.eject(requestInterceptor);
        httpClient.interceptors.response.eject(responseInterceptor);
    }, [requestInterceptor, responseInterceptor]);
    // }

    const handleConfirmError = () => {
        setError(null);
    }

    return [error, handleConfirmError];

}