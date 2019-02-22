import React, { useContext } from 'react';
import AuthContext from '../auth-context';

const auth = (props) => {

    const auth = useContext(AuthContext);

    return <button onClick={auth.login}>Loggin</button>;
};

export default auth;