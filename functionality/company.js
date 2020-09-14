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
    let jobID = req.params.jobID;
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
        let SQL = `SELECT * FROM company WHERE id=${id};`;
        mainObj.client.query(SQL).then((data) => {
            res.render("pages/company/edit", { data: data.rows[0] })
        })
    })
}
obj.companyUpdateEdit = (req, res) => {
    let { company_name, phone, logo, country, company_url, id } = req.body;
    let SQL = `UPDATE company SET company_name=$1,phone=$2,logo=$3,country=$4,company_url=$5 WHERE id=$6;`;
    let VALUES = [company_name, phone, logo, country, company_url, id];
    mainObj.client.query(SQL, VALUES).then(() => {
        res.redirect('/');
    })
}
obj.appAnswer = (req, res) => {
    let id = req.params.appID;
    let status = req.body.status;
    let SQL = `UPDATE applications SET status=$1 WHERE id=$2`
    let Values = [status, id];
    mainObj.client.query(SQL, Values).then(() => {
        res.redirect('/');
    })
}
obj.personDeleteOffer = (req, res) => {
    let id = req.params.offerID;
    let SQL = `DELETE FROM job_offers WHERE id=$1`
    let Value = [id];
    mainObj.client.query(SQL, Value).then(() => {
        res.redirect('/');
    })
}
module.exports = obj;