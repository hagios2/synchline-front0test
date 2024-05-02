import axios from 'axios';
import Cookies from 'js-cookie'
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
                this.$router.push('/login')
            } else if (error.response.status === 422) {
                // eslint-disable-next-line no-console
                console.log('logging ', error.response)
            } else {
                // eslint-disable-next-line no-console
                console.log('An error occurred. Please try again later.', error.response)
            }
        }
        // Handle response error
        return Promise.reject(error);
    }
);

