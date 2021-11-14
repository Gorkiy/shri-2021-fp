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

import { anyPass, allPass, compose, prop, equals, filter, values, lt, not } from 'ramda';

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

const isRedStar = compose(isRed, getStar);
const isGreenSquare = compose(isGreen, getSquare);
const isGreenTriange = compose(isGreen, getTriangle);
const isWhiteTriangle = compose(isWhite, getTriangle);
const isWhiteCircle = compose(isWhite, getCircle);
const isWhiteStar = compose(isWhite, getStar);
const isNotWhiteSquare = compose(not, isWhite, getSquare);
const isBlueCircle = compose(isBlue, getCircle);
const isOrangeSquare = compose(isOrange, getSquare);

const getAmountOfGreen = compose(getLength, filter(isGreen), values);
const getAmountOfBlue = compose(getLength, filter(isBlue), values);
const getAmountOfRed = compose(getLength, filter(isRed), values);
const getAmountOfOrange = compose(getLength, filter(isOrange), values);

const squareEquralsTriangle = shapes => equals(getTriangle(shapes), getSquare(shapes));

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = shapes =>
    allPass([
        isRedStar,
        isGreenSquare,
        isWhiteTriangle,
        isWhiteCircle,
    ])(shapes);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(lt(1), getAmountOfGreen);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = shapes => equals(getAmountOfBlue(shapes), getAmountOfRed(shapes));

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = shapes =>
    allPass([
        isBlueCircle,
        isOrangeSquare,
        isRedStar
    ])(shapes);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = anyPass([
    compose(lt(2), getAmountOfRed),
    compose(lt(2), getAmountOfBlue),
    compose(lt(2), getAmountOfOrange),
    compose(lt(2), getAmountOfGreen)
]);

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = allPass([
    compose(equals(1), getAmountOfRed),
    compose(equals(2), getAmountOfGreen),
    compose(isGreenTriange)
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(equals(4), getAmountOfOrange);

// 8. Не красная и не белая звезда.
export const validateFieldN8 = shapes =>
    !anyPass([
        compose(isWhiteStar),
        compose(isRedStar)
    ])(shapes);

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(equals(4), getAmountOfGreen);

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = shapes => {
    return allPass([
        compose(isNotWhiteSquare),
        squareEquralsTriangle
    ])(shapes)
};
