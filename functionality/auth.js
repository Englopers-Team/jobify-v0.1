'use strict';

const obj = {};

obj.login = (req, res) => {

}

obj.signupPage = (req, res) => {
    console.log(req.body)
    res.render("pages/signup");

}


obj.personSignUp = (req, res) => {
    console.log(req.body);
}

obj.companySignUp = (req, res) => {
    console.log(req.body)
}


obj.logout = (req, res) => {

}

module.exports = obj;