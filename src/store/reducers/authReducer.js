const initialState = {
    account: {
        token: null,
        username: null,
        email: null,
        imageUrl: null,
        coverUrl: null,
        roles: null,
    },
    isAuthenicated: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                account: {
                    token: action.payload.account.token,
                    username: action.payload.account.username,
                    email: action.payload.account.email,
                    imageUrl: action.payload.account.imageUrl,
                    coverUrl: action.payload.account.coverUrl,
                    roles: action.payload.account.roles,
                    ...action.payload.account,
                },
                isAuthenicated: action.payload.isAuthenicated,
            };
        case 'LOGOUT':
            return { ...state, account: null, isAuthenicated: false };
        default:
            return state;
    }
};

export { authReducer, initialState };
