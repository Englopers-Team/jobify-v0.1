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
            .catch(error => {
                let errorReason = "Error | Can't select data from applications and jobs and company from database."
                console.log(errorReason);
                res.status(500).render("pages/error", { data: errorReason });
            })
        })
        .catch(error => {
            let errorReason = "Error | Can't select person details from database."
            console.log(errorReason);
            res.status(500).render("pages/error", { data: errorReason });
        })
    })
    .catch(error => {
        let errorReason = "Error | Can't find person details in database."
        console.log(errorReason);
        res.status(500).render("pages/error", { data: errorReason });
    })

}

obj.personDeleteApp = (req, res) => {
    let SQL = `DELETE FROM applications WHERE id=$1;`
    let values = [req.params.appID]
    mainObj.client.query(SQL, values).then(() => {
        res.redirect("/person/apps");
    })
    .catch(error => {
        let errorReason = "Error | Can't delete application from database."
        console.log(errorReason);
        res.status(500).render("pages/error", { data: errorReason });
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
            .catch(error => {
                let errorReason = "Error | Can't find job offers and company details in database."
                console.log(errorReason);
                res.status(500).render("pages/error", { data: errorReason });
            })
        })
        .catch(error => {
            let errorReason = "Error | Can't select person details in database."
            console.log(errorReason);
            res.status(500).render("pages/error", { data: errorReason });
        })


    })
    .catch(error => {
        let errorReason = "Error | Can't find person details in database."
        console.log(errorReason);
        res.status(500).render("pages/error", { data: errorReason });
    })
}

obj.personUpdateOffer = (req, res) => {
    let offerID = req.params.offerID;
    let SQL = `UPDATE job_offers SET status=$1 WHERE id=$2;`
    let Values = [req.body.status, offerID];
    mainObj.client.query(SQL, Values).then(() => {
        res.redirect('/person/offers')
    })
    .catch(error => {
        let errorReason = "Error | Can't update offer status in database."
        console.log(errorReason);
        res.status(500).render("pages/error", { data: errorReason });
    })

}


obj.personEdit = (req, res) => {
    const obj = require('./auth.js')

    let SQL = `SELECT * FROM auth WHERE session_id=$1;`
    let Value = [obj.sessionData];

    mainObj.client.query(SQL, Value).then((data) => {
        let id = data.rows[0].id;
        let SQL = `SELECT * FROM person WHERE auth_id=${id};`
        mainObj.client.query(SQL).then((data) => {
            res.render('pages/person/edit', { data: data.rows[0] });
        })
        .catch(error => {
            let errorReason = "Error | Can't select person details in database."
            console.log(errorReason);
            res.status(500).render("pages/error", { data: errorReason });
        })
    })
    .catch(error => {
        let errorReason = "Error | Can't find person details in database."
        console.log(errorReason);
        res.status(500).render("pages/error", { data: errorReason });
    })
}

obj.personUpdateEdit = (req, res) => {

    let { first_name, last_name, phone, job_title, country, age, avatar, experince, cv, id } = req.body;
    let SQL = `UPDATE person SET first_name=$1,last_name=$2,phone=$3,job_title=$4,country=$5,age=$6,avatar=$7,experince=$8,cv=$9 WHERE id=$10;`
    let Values = [first_name, last_name, phone, job_title, country, age, avatar, experince, cv, id]
    mainObj.client.query(SQL, Values).then(() => {
        res.redirect('/')
    })
    .catch(error => {
        let errorReason = "Error | Can't update person details in database."
        console.log(errorReason);
        res.status(500).render("pages/error", { data: errorReason });
    })

}

module.exports = obj;