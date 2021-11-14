/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import { anyPass, allPass, compose, prop, equals, filter, values, lt } from 'ramda';

const getLength = prop('length');

const getStar = prop('star');
const getSquare = prop('square');
const getTriangle = prop('triangle');
const getCircle = prop('circle');

const isWhite = equals('white');
const isOrange = equals('orange');
const isRed = equals('red');
const isGreen = equals('green');
const isBlue = equals('blue');

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = shapes =>
    allPass([
        compose(isRed, getStar),
        compose(isGreen, getSquare),
        compose(isWhite, getTriangle),
        compose(isWhite, getCircle),
    ])(shapes);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = shapes =>
    compose(getLength, filter(isGreen), values)(shapes) > 1;

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = shapes =>
    compose(getLength, filter(isRed), values)(shapes) === compose(getLength, filter(isBlue), values)(shapes);

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = shapes =>
    allPass([
        compose(isBlue, getCircle),
        compose(isRed, getStar),
        compose(isOrange, getSquare)
    ])(shapes);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = anyPass([
    compose(lt(2), getLength, filter(isRed), values),
    compose(lt(2), getLength, filter(isBlue), values),
    compose(lt(2), getLength, filter(isOrange), values),
    compose(lt(2), getLength, filter(isGreen), values)
]);

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = allPass([
    compose(equals(1), getLength, filter(isRed), values),
    compose(equals(2), getLength, filter(isGreen), values),
    compose(isGreen, getTriangle)
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(equals(4), getLength, filter(isOrange), values);

// 8. Не красная и не белая звезда.
export const validateFieldN8 = shapes =>
    !anyPass([
        compose(isWhite, getStar),
        compose(isRed, getStar)
    ])(shapes);

// 9. Все фигуры зеленые.
export const validateFieldN9 = shapes => compose(getLength, filter(isGreen), values)(shapes) === 4;

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = shapes => {
    const isNotWhite = shapes => !isWhite(shapes);
    const squareEquralsTriangle = shapes => equals(getTriangle(shapes), getSquare(shapes));

    return allPass([
        compose(isNotWhite, getSquare),
        squareEquralsTriangle
    ])(shapes)
};
