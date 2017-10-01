import React from 'react';
import ClassNames from 'classnames';
import styles from './Button.css';

const Button = ({onClick, title, className}) => (
    <button className={ClassNames(styles.button, className)} onClick={() => {onClick();}}>{title}</button>
);

export default Button;