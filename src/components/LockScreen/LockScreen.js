import React from 'react';
import ClassNames from 'classnames';
import PatternLock from 'patternlock';
import styles from './LockScreen.css';

let lock;
export default class LockScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmationPattern: '',
            screen: this.props.loginScreen || 'setPattern',
            loginError: this.props.loginError || '',
            patternMsg: 'Draw an unlock pattern',
            patternError: false,
        };

        this.onSetPattern = this.onSetPattern.bind(this);
    }

    componentDidMount() {
        lock = new PatternLock('#patternHolder', {
            patternVisible: true,
            enableSetPattern: true,
            onDraw: (pattern) => {
                if (this.state.screen === 'setPattern') {
                    this.onSetPattern(pattern);
                } else {
                    this.props.onLogin(pattern);
                }
            },
        });
    }

    onSetPattern(pattern) {
        this.setState({ patternError: false });
        if (pattern.length < 4) {
            this.setState({ patternMsg: 'Connect atleast 4 dots. Try again.' });
            lock.reset();
        } else if (this.state.confirmationPattern === '') {
            this.setState({ patternMsg: 'Draw pattern again to confirm' });
            this.setState({ confirmationPattern: pattern });
            lock.reset();
        } else if (this.state.confirmationPattern > 0 && this.state.confirmationPattern === pattern) {
            this.setState({ patternMsg: 'Your new pattern is set. Use the same pattern to unlock' });
            lock.setPattern(pattern);
            this.props.onSetPassword(pattern);
            lock.reset();
        } else {
            this.setState({ patternMsg: 'Pattern not matching with previous pattern.' });
            lock.reset();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loginScreen !== this.props.loginScreen) {
            this.setState({ screen: nextProps.loginScreen });
        }

        if (nextProps.loginError !== this.props.loginError) {
            this.setState({ loginError: nextProps.loginError });
        }

        if (this.props.loginError.length || nextProps.loginError.length) {
            lock.error();
            this.setState({ patternError: true, patternMsg: 'Wrong pattern.' });
        }
    }

    render() {
        const { onResetPassword } = this.props;
        const { patternMsg, patternError } = this.state;
        return (
            <div className={styles.wrapper}>
                <div className={styles.coverBg}/>
                <div className={styles.loginBox}>
                    <span
                        className={ClassNames(styles.loginBox__patternMsg, { [styles.error]: patternError })}>{patternMsg}</span>
                    <div id="patternHolder" className={styles.loginBox__pattern}/>
                    <button className={styles.loginBox__button}
                            onClick={() => {
                                this.setState({ patternMsg: 'Draw an unlock pattern', confirmationPattern: '' });
                                onResetPassword();
                            }}>
                        Reset Password
                    </button>
                </div>
            </div>
        );
    }
}