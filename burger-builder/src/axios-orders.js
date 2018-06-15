import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-ff71e.firebaseio.com/'
});

export default instance;