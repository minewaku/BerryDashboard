import axios from 'axios';
import { store } from '~/store/redux/store';
import { toast } from 'react-toastify';

const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

httpRequest.interceptors.request.use(
    (request) => {
        if (store.getState().auth.isAuthenicated) {
            const token = store.getState().auth.account.token;
            if (token) {
                request.headers.Authorization = `Bearer ${token}`;
            }
            request.headers['Content-Type'] = 'application/json';
        }

        return request;
    },

    (error) => {
        console.log('Error in Request: ', error);
        return Promise.reject(error);
    }
);

httpRequest.interceptors.response.use(
    (response) => {
        console.log('Response: ', response);
        return response;
    },

    (error) => {
        if (error.code === 'ERR_NETWORK') {
            toast.error('Network error');
        }
        if (error.code === 'ECONNABORTED') {
            toast.error('Request timeout');
        }
        if (error.response && error.response.status === 401) {
            store.dispatch({
                type: 'LOGOUT',
                payload: { account: null, isAuthenicated: false },
            });
        }
        console.log('Error in Response: ', error);
        return Promise.reject(error.response);
    }
);

const joinParams = (arr) => {
    return arr.join(',');
};

const get = async (path, data = {}, params = {}, ...config) => {
    const response = await httpRequest.get(path, data, { ...config, params });
    return response;
};

const post = async (path, data = {}, params = {}, ...config) => {
    const response = await httpRequest.post(path, data, { ...config, params });
    return response;
};

const put = async (path, data = {}, params = {}, ...config) => {
    const response = await httpRequest.put(path, data, { ...config, params });
    return response;
};

const del = async (path, ids = []) => {
    const response = await httpRequest.delete(`${path}/${joinParams(ids)}`);
    return response;
};

export { get, post, put, del };
export default httpRequest;
