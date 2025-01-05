import { toast } from 'react-toastify';
import { store } from '~/store/redux/store';
import * as httpRequest from '~/utils/httpRequest';

const login = async (data) => {
    try {
        const response = await httpRequest.post('api/v1/auth/authenicate', data, {});
        if (response.status === 200 || response.headers['authorization']) {
            if (!response.data.data.user.roles.includes('ADMIN')) {
                toast.warning('You are not authorized to access this page');
            } else {
                store.dispatch({
                    type: 'LOGIN',
                    payload: {
                        account: {
                            token: response.data.data.token,
                            username: response.data.data.user.name,
                            email: response.data.data.user.email,
                            imageUrl: response.data.data.user.imageUrl,
                            coverUrl: response.data.data.user.coverUrl,
                            role: response.data.data.user.roles,
                        },
                        isAuthenicated: true,
                    },
                });
                toast.success('Login successfully!');
            }

            return response;
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

const register = async (data) => {
    try {
        const response = await httpRequest.post('api/v1/auth/register', data, {});
        return response;
    } catch (error) {
        console.log(error);
    }
};

export { login };
