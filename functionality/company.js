'use strict';

const obj = {};
const mainObj = require('../server.js')

obj.companyJobs = (req, res) => {
    const obj = require('./auth.js')

    let SQL = `SELECT * FROM auth WHERE session_id=$1;`
    let Value = [obj.sessionData];

    mainObj.client.query(SQL, Value).then((data) => {
        let id = data.rows[0].id;

    })
}

obj.companyDeleteJob = (req, res) => {

}

obj.companyUpdateJob = (req, res) => {

}


obj.companySubmitJobPage = (req, res) => {
    const obj = require('./auth.js')

    let SQL = `SELECT * FROM auth WHERE session_id=$1;`
    let Value = [obj.sessionData];

    mainObj.client.query(SQL, Value).then((data) => {
        let id = data.rows[0].id;

    })
}

obj.companySubmitJob = (req, res) => {

}


obj.companyEdit = (req, res) => {
    const obj = require('./auth.js')

    let SQL = `SELECT * FROM auth WHERE session_id=$1;`
    let Value = [obj.sessionData];

    mainObj.client.query(SQL, Value).then((data) => {
        let id = data.rows[0].id;

    })
}

obj.companyUpdateEdit = (req, res) => {

}


obj.appAnswer = (req, res) => {

}


obj.personDeleteOffer = (req, res) => {

}

module.exports = obj;