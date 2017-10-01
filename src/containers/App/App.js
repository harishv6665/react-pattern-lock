import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TodoActions from './../../actions';
import LockScreen from './../../components/LockScreen/LockScreen';
import Home from './../../containers/Home/Home';

class App extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { loginStore, actions } = this.props;
        console.log('data: ', loginStore);

        return !loginStore.loggedIn ?
            <LockScreen onLogin={actions.onLogin}
                        onSetPassword={actions.onSetPassword}
                        onResetPassword={actions.onResetPassword}
                        loginScreen={loginStore.loginScreen}
                        loginError={loginStore.loginError}/> :
            <Home onLogout={actions.onLogout}
                  onResetPassword={actions.onResetPassword}/>;
    }
}

function mapStateToProps(state) {
    return { loginStore: state };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(TodoActions, dispatch) };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);