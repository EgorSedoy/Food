require('es6-promise').polyfill(); // promise for IE
import 'nodelist-foreach-polyfill';// imported from node_modules

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import form from './modules/form';
import slider from './modules/slider';
import calc from './modules/calc';
import cards from './modules/cards';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', function () {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 10000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2022-11-01');
    cards();
    calc();
    form('form', modalTimerId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});
