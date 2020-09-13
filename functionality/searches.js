'use strict';

const obj = {};
const { client } = require('../server.js');
const mainObj = require('../server.js')

obj.searchJob = (req, res) => {
    const obj = require('./auth.js')
    let { title, location } = req.query
    let SQL2 = `SELECT * FROM jobs JOIN company ON jobs.company_id=company.id WHERE title=$1 AND location=$2;`
    let value2 = [title, location]
    mainObj.client.query(SQL2, value2)
        .then((resultDataBase) => {
            let URL = `https://jobs.github.com/positions.json?description=${title}&location=${location}&?markdown=true`
            mainObj.superagent.get(URL)
                .then((resultAPI) => {
                    let jobData = resultAPI.body.map(item => {
                        return new mainObj.JOB(item);
                    })
                    if (obj.sessionData == undefined) {
                        res.render("pages/searches/job-guest", { data1: resultDataBase.rows, data2: jobData })
                    } else {
                        let SQL = `SELECT * FROM auth WHERE session_id=$1;`
                        let Value = [obj.sessionData];
                        mainObj.client.query(SQL, Value)
                            .then((dataAuth) => {
                                let id = dataAuth.rows[0].id;
                                let SQL = `SELECT * FROM person WHERE auth_id=$1;`
                                let Value = [id];
                                mainObj.client.query(SQL, Value)
                                    .then((resultPerson) => {
                                        res.render("pages/searches/job-user", { data1: resultDataBase.rows, data2: jobData, data3: resultPerson.rows[0] })
                                    })
                            })
                    }
                })
        })
}

obj.applyJob = (req, res) => {
    let jobID = req.params.jobID
    let companyID = req.body.company_id
    let personID = req.body.personID
    let SQL = `INSERT INTO applications (person_id,job_id,company_id) VALUES ($1,$2,$3);`
    let value = [personID, jobID, companyID]
    mainObj.client.query(SQL, value)
        .then(() => {
            res.redirect("/person/apps")
        })
}

obj.searchCompanyPage = (req, res) => {
    const obj = require('./auth.js')
    if (obj.sessionData == undefined) {
        res.render("pages/searches/company-guest")
    } else {
        //
        let SQL = `SELECT * FROM auth WHERE session_id=$1;`
        let Value = [obj.sessionData];
        mainObj.client.query(SQL, Value)
            .then((dataAuth) => {
                let id = dataAuth.rows[0].id;
                let SQL = `SELECT * FROM person WHERE auth_id=$1;`
                let Value = [id];
                mainObj.client.query(SQL, Value)
                    .then((resultPerson) => {
                        res.render("pages/searches/company-user", { data: resultPerson.rows[0] })
                    })
            })
    }
}

obj.searchCompany = (req, res) => {
    const obj = require('./auth.js')
    let { company_name, country } = req.query
    let SQL = `SELECT * FROM company WHERE company_name=$1 AND country=$2;`
    let value = [company_name, country]
    mainObj.client.query(SQL, value)
        .then(result => {
            if (obj.sessionData == undefined) {
                res.render("pages/searches/searchCompanyResult-guest", { data: result.rows[0] })
            } else {
                let id = result.rows[0].id;
                let SQL = `SELECT * FROM person WHERE auth_id=$1;`
                let Value = [id];
                mainObj.client.query(SQL, Value)
                    .then(personData => {
                        res.render("pages/searches/searchCompanyResult-user", { data: result.rows[0], data2: personData.rows[0] })
                    })
            }
        })

}


obj.searchPersonPage = (req, res) => {

    const obj = require('./auth.js')

    let SQL = `SELECT * FROM auth WHERE session_id=$1;`
    let Value = [obj.sessionData];

    mainObj.client.query(SQL, Value)
        .then((data) => {
            let id = data.rows[0].id;
            let SQL = `SELECT * FROM company WHERE auth_id=$1;`
            let Value = [id];
            mainObj.client.query(SQL, Value)
                .then((resultCompany) => {
                    res.render("pages/searches/person", { data: resultCompany.rows[0] })
                })

        })
}

obj.searchPerson = (req, res) => {
    const obj = require('./auth.js')
    let SQL = `SELECT * FROM auth WHERE session_id=$1;`
    let Value = [obj.sessionData];

    mainObj.client.query(SQL, Value)
        .then((data) => {
            let id = data.rows[0].id;
            let SQL = `SELECT * FROM company WHERE auth_id=$1;`
            let Value = [id];
            mainObj.client.query(SQL, Value)
                .then((resultCompany) => {
                    let { job_title, country } = req.query;
                    let SQL = `SELECT * FROM person WHERE job_title=$1 AND country=$2;`
                    let values = [job_title, country];
                    mainObj.client.query(SQL, values)
                        .then((result) => {
                            res.render("pages/searches/personResults", { data: result.rows, data2: resultCompany.rows[0] })
                        })

                })

        })


}

obj.personOffer = (req, res) => {
    const obj = require('./auth.js')
    let { person_id, company_id, title, location, type, description } = req.body;
    // console.log(person_id, company_id);
    let SQL = `INSERT INTO job_offers (person_id,company_id,title,location,type,description) VALUES ($1,$2,$3,$4,$5,$6);`
    let values = [person_id, company_id, title, location, type, description];
    mainObj.client.query(SQL, values)
        .then(() => {
            res.redirect('/')
        })



}

module.exports = obj;