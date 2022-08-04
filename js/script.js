window.addEventListener("DOMContentLoaded", () => {
    const tabs = require('./modules/tabs'),
        modal = require('./modules/modal'),
        timer = require('./modules/timer'),
        form = require('./modules/form'),
        slider = require('./modules/slider'),
        calc = require('./modules/calc'),
        cards = require('./modules/cards');

    tabs();
    modal();
    timer();
    form();
    slider();
    calc();
    cards();

}); //DOMContentLoaded