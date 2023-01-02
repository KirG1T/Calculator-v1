import { useSelector, useDispatch } from 'react-redux';
import { preResultAdd, preResultReset, preResultMinusAdd, getResult } from '../../redux/calcSlice';

import styles from './ButtonsArea.module.scss';

const numbersAndStrings = [
    'C',
    '\u00b1',
    '\u0025',
    '\u00f7',
    7,
    8,
    9,
    '\u00d7',
    4,
    5,
    6,
    '-',
    1,
    2,
    3,
    '\u002b',
];

const otherButtonSymbols = [0, ',', '='];

const ButtonsArea = () => {
    const dispatch = useDispatch();
    const darkTheme = useSelector((state) => state.calc.isDarkTheme);
    const preResult = useSelector((state) => state.calc.preResult);

    //Add numbers and operators to preResult array
    const addNumToPreRes = (event) => {
        // if (event.currentTarget.textContent === 'C') {
        //     dispatch(preResultReset());
        // } else if (event.currentTarget.textContent !== '=') {
        //     dispatch(preResultAdd(event.currentTarget.textContent));
        // }

        switch (true) {
            case event.currentTarget.textContent === 'C':
                dispatch(preResultReset());
                break;
            case event.currentTarget.textContent === '\u00b1':
                dispatch(preResultMinusAdd('-'));
                break;
            case event.currentTarget.textContent !== '=' && event.currentTarget.textContent !== '%':
                dispatch(preResultAdd(event.currentTarget.textContent));
                break;
            case event.currentTarget.textContent === '=':
                dispatch(getResult(event.currentTarget.textContent));
                break;
            default:
                break;
        }
    };

    //Change preResult array to finalResult
    // const changePreResult = () => {
    //     const allSymbols = [...numbersAndStrings, ...otherButtonSymbols].filter(
    //         (item) => typeof item === 'string' && item !== 'C' && item !== '=',
    //     );
    //     const finalResult = [];

    //     if (!preResult.length) {
    //         return;
    //     } else {
    //         for (let i = 0; i < preResult.length; i++) {
    //             if (allSymbols.includes(preResult[0])) {
    //                 continue;
    //             } else {
    //                 finalResult.push(preResult[i]);
    //             }
    //         }
    //     }
    //     return finalResult;
    // };
    // console.log(changePreResult());

    return (
        <div className={`${styles.wrapper} ${!darkTheme ? styles.lightTheme : ''}`}>
            <div className={styles.gridContainer}>
                {numbersAndStrings.map((item, index) => (
                    <button
                        key={index}
                        className={`${
                            typeof item === 'string' ? styles.symbolButton : styles.numberButton
                        } ${
                            item === '\u00f7'
                                ? styles.divisionBtn
                                : item === '\u00d7'
                                ? styles.multBtn
                                : item === '\u002b'
                                ? styles.plusBtn
                                : item === '-'
                                ? styles.minusBtn
                                : ''
                        }`}
                        onClick={addNumToPreRes}
                    >
                        <span>{item}</span>
                    </button>
                ))}
            </div>
            <div className={styles.otherButtons}>
                {otherButtonSymbols.map((item, index) => (
                    <button
                        key={index}
                        className={
                            item === 0
                                ? styles.zeroButton
                                : item === ','
                                ? styles.commaButton
                                : item === '='
                                ? styles.equalButton
                                : ''
                        }
                        onClick={addNumToPreRes}
                    >
                        <span>{item}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ButtonsArea;
