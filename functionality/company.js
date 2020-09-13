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
        let SQL = `SELECT * FROM company WHERE auth_id=${id};`;
        mainObj.client.query(SQL).then((data2) => {
            res.render("pages/company/submitJob", { data: data2.rows[0] })
        })

    })
}

obj.companySubmitJob = (req, res) => {
    console.log(req.body);
    let { id, title, location, type, description } = req.body;
    console.log(id);
    let SQL = `INSERT INTO jobs (company_id,title,location,type,description) VALUES ($1,$2,$3,$4,$5);`;
    let VALUES = [id, title, location, type, description];
    mainObj.client.query(SQL, VALUES).then(() => {
        res.redirect('/company/jobs');
    })

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