import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isDarkTheme: true,
    preResult: [],
    result: 0,
};

export const calcSlice = createSlice({
    name: 'calc',
    initialState,
    reducers: {
        changeTheme: (state, action) => {
            state.isDarkTheme = action.payload;
        },

        preResultAdd: (state, action) => {
            if (state.preResult.length === 0 && isNaN(Number(action.payload))) {
                state.preResult = [];
            } else {
                state.preResult.push(action.payload);

                const reduceArr = state.preResult.reduce((acc, cur) => acc + cur);

                let expression = reduceArr;
                let copy = expression;

                expression = expression.replace(/[0-9 ,]+/g, '#');
                let numbers = copy.split(/[^0-9 ,]+/);
                let operators = expression.split('#').filter(function (n) {
                    return n;
                });
                state.preResult = [];

                for (let i = 0; i < numbers.length; i++) {
                    state.preResult.push(numbers[i]);
                    if (i < operators.length) state.preResult.push(operators[i]);
                }
            }
        },

        preResultReset: (state) => {
            state.preResult = [];
            state.result = 0;
        },

        preResultMinusAdd: (state) => {
            if (state.preResult.length === 0) {
                state.preResult = ['0', ','];
            } else if (state.preResult[0] === '0' && state.preResult[1] === ',') {
                state.preResult = [];
            } else if (!state.preResult[state.preResult.length - 1].includes('-')) {
                state.preResult.splice(
                    state.preResult.length - 1,
                    1,
                    `(-${state.preResult[state.preResult.length - 1]})`,
                );
            } else {
                const numWithMinus = state.preResult[state.preResult.length - 1].replace(
                    /[^\d]/g,
                    '',
                );
                state.preResult.splice(state.preResult.length - 1, 1, numWithMinus);
            }
        },

        getResult: (state, action) => {
            if (state.preResult.length === 0 && action.payload === '=') {
                state.preResult = [];
            } else {
                const concatPreResult = state.preResult
                    .reduce((acc, cur) => acc + cur)
                    .replace(/,/g, '.')
                    .replace(/\u00d7/g, '*')
                    .replace(/\u00f7/g, '/');

                function calcRes(fn) {
                    // eslint-disable-next-line no-new-func
                    return new Function('return ' + fn)();
                }

                state.result = calcRes(concatPreResult);
                state.preResult = [`${state.result}`];
            }
        },
    },
});

export const { changeTheme, preResultAdd, preResultReset, preResultMinusAdd, getResult } =
    calcSlice.actions;

export default calcSlice.reducer;
