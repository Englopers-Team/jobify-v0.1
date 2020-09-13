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

}


obj.personDeleteOffer = (req, res) => {

}

module.exports = obj;