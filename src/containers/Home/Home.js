import React from 'react';
import Button from './../../components/Button/Button';
import styles from './Home.css';

const Home = ({ onLogout, onResetPassword }) => (
    <div className={styles.wrapper}>
        <h1 className={styles.welcomeText}>Welcome</h1>
        <div className={styles.buttonGroup}>
            <Button title="Reset Password" onClick={onResetPassword} className={styles.button}/>
            <Button title="Logout" onClick={onLogout} className={styles.button}/>

            {/*<button className={styles.button} onClick={() => {onResetPassword();}}>Reset Password</button>*/}
            {/*<button className={styles.button} onClick={() => {onLogout();}}>Logout</button>*/}
        </div>
    </div>);

export default Home;