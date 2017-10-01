const initialState = {
    loggedIn: false,
    loginError: '',
    loginScreen: 'setPattern',
    password: '',
};

export function patternLockReducer(state = initialState, action) {
    switch (action.type) {

        case 'ON_SET_PASSWORD':
            return {
                ...state,
                password: action.payload,
                loginScreen: 'loginScreen'
            };

        case 'ON_LOGIN':
            if (action.payload.length > 0 && action.payload === state.password) {
                return {
                    ...state,
                    loginError: '',
                    loggedIn: true,
                };
            }

            return {
                ...state,
                loginError: 'Invalid password',
            };


        case 'ON_LOGOUT':
            return {
                ...state,
                loggedIn: false,
                loginScreen: 'loginScreen',
            };

        case 'ON_RESET_PASSWORD':
            return {
                ...initialState
            };

        default:
            return state;
    }
}