import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from '../../redux/calcSlice';

import styles from './ThemeButton.module.scss';

const ThemeButton = () => {
    const darkTheme = useSelector((state) => state.calc.isDarkTheme);
    const dispatch = useDispatch();

    const changeThemeClick = (event) => {
        if (event.currentTarget.id === 'light') {
            dispatch(changeTheme(false));
        } else {
            dispatch(changeTheme(true));
        }
    };

    return (
        <div className={`${styles.wrapper} ${!darkTheme ? styles.lightTheme : ''}`}>
            <div
                className={`${styles.lightThemeBtn} ${!darkTheme ? styles.active : ''}`}
                onClick={changeThemeClick}
                id='light'
            >
                <svg
                    id='sun'
                    fill='#000000'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 50 50'
                    width='50px'
                    height='50px'
                >
                    <path
                        fill='none'
                        stroke='#000000'
                        strokeLinecap='round'
                        strokeMiterlimit='10'
                        strokeWidth='2'
                        d='M25 16c4.963 0 9 4.038 9 9 0 4.963-4.037 9-9 9-4.962 0-9-4.037-9-9C16 20.038 20.038 16 25 16M25 45L25 39M25 11L25 5M5 25L11 25M39 25L45 25M10.858 39.143L15.101 34.9M34.899 15.102L39.143 10.858M10.858 10.858L15.101 15.102M34.899 34.9L39.143 39.143'
                    />
                </svg>
            </div>
            <div className={`${styles.darkThemeBtn} ${darkTheme ? styles.active : ''}`} onClick={changeThemeClick}>
                <svg
                    id='moon'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 32 32'
                    fill='none'
                    stroke='#000'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                >
                    <path d='M14 2C 9 2 3 7 3 15 3 23 9 29 17 29 25 29 30 23 30 18 19 25 7 13 14 2Z' />
                </svg>
            </div>
        </div>
    );
};

export default ThemeButton;
