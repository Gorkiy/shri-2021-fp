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
import Api from '../tools/api';

import { anyPass, allPass, compose, prop, equals, filter, values, lt, gt, not } from 'ramda';

const api = new Api();

// Values
const getWriteLog = prop('writeLog');
const getValue = prop('value');
const getResult = prop('result');
const getHandleSuccess = prop('handleSuccess');
const getHandleError = prop('handleError');

const processSequence = input => {
    //    {value, writeLog, handleSuccess, handleError}

    const log = getWriteLog(input);
    const logInput = compose(log, getValue);
}

export default processSequence;
