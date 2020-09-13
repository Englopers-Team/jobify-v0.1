'use strict';

const obj = {};
const mainObj = require('../server.js')

obj.companyJobs = (req, res) => {
    const obj = require('./auth.js')

    let SQL = `SELECT * FROM auth WHERE session_id=$1;`
    let Value = [obj.sessionData];

    mainObj.client.query(SQL, Value).then((data) => {
        let id = data.rows[0].id;
        let SQL1 = `SELECT * FROM company WHERE auth_id=${id};`
        mainObj.client.query(SQL1).then((data1) => {
            let SQL2 = `SELECT * FROM jobs WHERE company_id=${data1.rows[0].id};`
            mainObj.client.query(SQL2).then((data2) => {
                res.render('pages/company/myJobs', { data: data1.rows[0], data2: data2.rows })
            })

        })


    })
}

obj.companyDeleteJob = (req, res) => {
    let jobID = req.params.jobID
    let SQL = `DELETE FROM applications WHERE job_id=$1;`;
    let Value = [jobID];
    mainObj.client.query(SQL, Value).then(() => {
        let SQL1 = `DELETE FROM jobs WHERE id=$1;`;
        let Value2 = [jobID];
        mainObj.client.query(SQL1, Value2).then(() => {
            res.redirect('/company/jobs')

        })

    })

}

obj.companyUpdateJob = (req, res) => {
    let jobID = req.params.jobID
    let { title, location, type, description } = req.body;
    let SQL = `UPDATE jobs SET title=$1,location=$2,type=$3,description=$4 WHERE id=$5;`;
    let Value = [title, location, type, description, jobID];
    mainObj.client.query(SQL, Value).then(() => {
        res.redirect('/company/jobs')
    })

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