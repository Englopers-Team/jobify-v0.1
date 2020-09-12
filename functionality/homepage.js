'use strict';

const obj = {};

obj.homePage = (req, res) => {
    res.render('index');
}

module.exports = obj;