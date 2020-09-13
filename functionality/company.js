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
    let {id,status} = req.body;
    let SQL = `UPDATE applications SET status=$1 WHERE id=$2`
    let Values = [status,id];
    mainObj.client.query(SQL,Values).then(() =>{
        res.redirect('/');
    })
}


obj.personDeleteOffer = (req, res) => {
    let id = req.body.id;
    let SQL = `DELETE FROM job_offers WHERE id=$1`
    let Value = [id];
    mainObj.client.query(SQL,Value).then(() =>{
        res.redirect('/');
    })
}

module.exports = obj;