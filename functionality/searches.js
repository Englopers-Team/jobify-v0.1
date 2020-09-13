'use strict';

const obj = {};
const mainObj = require('../server.js')

obj.searchJob = (req, res) => {
    const obj = require('./auth.js')

    let SQL = `SELECT * FROM auth WHERE session_id=$1;`
    let Value = [obj.sessionData];

    mainObj.client.query(SQL, Value).then((data) => {
        let id = data.rows[0].id;

    })
}

obj.applyJob = (req, res) => {

}


obj.searchCompany = (req, res) => {
    const obj = require('./auth.js')

    let SQL = `SELECT * FROM auth WHERE session_id=$1;`
    let Value = [obj.sessionData];

    mainObj.client.query(SQL, Value).then((data) => {
        let id = data.rows[0].id;

    })
}


obj.searchPerson = (req, res) => {
    const obj = require('./auth.js')

    let SQL = `SELECT * FROM auth WHERE session_id=$1;`
    let Value = [obj.sessionData];

    mainObj.client.query(SQL, Value).then((data) => {
        let id = data.rows[0].id;

    })
}

obj.personOffer = (req, res) => {

}

module.exports = obj;