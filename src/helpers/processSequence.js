/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */

import { __, allPass, andThen, ifElse, compose, gt, length, lt, test, modulo, prop, tap, concat, otherwise } from 'ramda';
import Api from '../tools/api';

const api = new Api();

// Input
const getValue = prop('value');
const getWriteLog = prop('writeLog');
const getHandleSuccess = prop('handleSuccess');
const getHandleError = prop('handleError');
const getResult = prop('result');
// Validate number
const isPositive = lt(0);
const isValidLength = compose(allPass([gt(10), lt(2)]), length);
const isValidNumber = test(/^\d+(\.\d+)?$/);
const isValidInput = compose(allPass([isValidLength, isPositive, isValidNumber]), getValue);
// Math
const getRoundValue = compose(Math.round, parseFloat, getValue);
const getSquareValue = value => Math.pow(value, 2);
const getRemainder = value => modulo(value, 3);
// API
const getApiTech = api.get('https://api.tech/numbers/base');
const getBinary = input => getApiTech({ from: 10, to: 2, number: input });
const getAnimalURL = concat('https://animals.tech/');
const getApiAnimal = api.get(__, {});
const getAnimal = compose(getApiAnimal, getAnimalURL);
// Other
const handleValidationError = input => getHandleError(input)('ValidationError');

const processSequence = data => {
    const log = getWriteLog(data);
    const logInput = compose(log, getValue);
    const getSuccessData = getHandleSuccess(data);

    const result = compose(
        ifElse(
            isValidInput,
            compose(
                otherwise(getHandleError),
                andThen(getSuccessData),
                andThen(getResult),
                andThen(tap(log)),
                andThen(getAnimal),
                andThen(tap(log)),
                andThen(getRemainder),
                andThen(tap(log)),
                andThen(getSquareValue),
                andThen(tap(log)),
                andThen(length),
                andThen(tap(log)),
                andThen(getResult),
                getBinary,
                tap(log),
                getRoundValue,
            ),
            tap(handleValidationError)
        ),
        tap(logInput),
    )
    result(data);
}

export default processSequence;
