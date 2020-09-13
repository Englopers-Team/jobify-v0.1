'use strict';

const obj = {};
const mainObj = require('../server.js')

obj.personApps = (req, res) => {
    const obj = require('./auth.js')

    let SQL = `SELECT * FROM auth WHERE session_id=$1;`
    let Value = [obj.sessionData];

    mainObj.client.query(SQL, Value).then((data) => {
        let id = data.rows[0].id;
        let SQL = `SELECT * FROM person WHERE auth_id=${id};`
        mainObj.client.query(SQL).then(data1 => {
            let SQL1 = `SELECT applications.id,status,title,location,type,company_name,logo FROM applications JOIN jobs ON applications.job_id=jobs.id JOIN company ON applications.company_id=company.id WHERE person_id= ${data1.rows[0].id};`
            mainObj.client.query(SQL1).then(data2 => {
                res.render("pages/person/apps", { data: data1.rows[0], data2: data2.rows });
            })
        })

    })

}

obj.personDeleteApp = (req, res) => {
    let SQL = `DELETE FROM applications WHERE id=$1;`
    let values = [req.params.appID]
    mainObj.client.query(SQL, values).then(() => {
        res.redirect("/person/apps");
    })

}


obj.personOffers = (req, res) => {
    const obj = require('./auth.js')

    let SQL = `SELECT * FROM auth WHERE session_id=$1;`
    let Value = [obj.sessionData];

    mainObj.client.query(SQL, Value).then((data) => {
        let id = data.rows[0].id;
        let SQL = `SELECT * FROM person WHERE auth_id=${id};`
        mainObj.client.query(SQL).then((data1) => {
            let SQL2 = `SELECT job_offers.id,status,title,type,location,description,company_name,logo,company_url FROM job_offers JOIN company ON job_offers.company_id=company.id WHERE person_id=${data.rows[0].id};`
            mainObj.client.query(SQL2).then(data2 => {
                res.render("pages/person/offers", { data: data1.rows[0], data2: data2.rows })
            })
        })


    })
}

obj.personUpdateOffer = (req, res) => {
    let offerID = req.params.offerID;
    let SQL = `UPDATE job_offers SET status=$1 WHERE id=$2;`
    let Values = [req.body.status, offerID];
    mainObj.client.query(SQL, Values).then(() => {
        res.redirect('/person/offers')
    })

}


obj.personEdit = (req, res) => {
    const obj = require('./auth.js')

    let SQL = `SELECT * FROM auth WHERE session_id=$1;`
    let Value = [obj.sessionData];

    mainObj.client.query(SQL, Value).then((data) => {
        let id = data.rows[0].id;

    })
}

obj.personUpdateEdit = (req, res) => {

}

module.exports = obj;