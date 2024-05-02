import axios from 'axios';
import Cookies from 'js-cookie'
import router from '@/router/index';

axios.interceptors.request.use(
    config => {
        const token = Cookies.get('authToken')
        if (token) {
            config.headers.Authorization = 'Bearer ' + token
        }
        return config;
    },
    error => {
            // Handle request error
        return Promise.reject(error);
    }
);

// Set up response interceptor
axios.interceptors.response.use(
    response => {
        // Handle response data
        return response;
    },
    error => {
        if (error.response) {
            if (error.response.status === 401) {
                if (router.path !== '/login') {
                    router.push('/login')
                } else {
                    return Promise.reject(error.response);
                }
            } else if (error.response.status === 403 && error.response.data.error == 'Token expired' ) {
                Cookies.remove('authToken')
                Cookies.remove('refreshToken')
                Cookies.remove('authUser')
                router.push('/login')
            } else {
                return Promise.reject(error.response);
            }
        }
        // Handle response error
        return Promise.reject(error);
    }
);

