export default {

    onSetPassword(payload) {
        return { type: 'ON_SET_PASSWORD', payload };
    },

    onLogin(payload) {
        return { type: 'ON_LOGIN', payload };
    },

    onLogout() {
        return { type: 'ON_LOGOUT' };
    },

    onResetPassword() {
        return { type: 'ON_RESET_PASSWORD' };
    },

};