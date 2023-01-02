import ThemeButton from '../ThemeButton';
import { useSelector } from 'react-redux';

import styles from './ShowResult.module.scss';

const ShowResult = () => {
    const darkTheme = useSelector((state) => state.calc.isDarkTheme);
    const preResult = useSelector((state) => state.calc.preResult);
    const result = useSelector((state) => state.calc.result);

    const preResultAdd = preResult.join('');

    return (
        <div className={`${styles.wrapper} ${!darkTheme ? styles.lightTheme : ''}`}>
            <ThemeButton />
            <div className={styles.flexContainer}>
                <span className={styles.result}>{!result ? 0 : result}</span>
                <span className={styles.calculating}>{!preResult.length ? 0 : preResultAdd} =</span>
            </div>
        </div>
    );
};

export default ShowResult;
