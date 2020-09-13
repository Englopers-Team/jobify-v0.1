'use strict';

const obj = {};
const mainObj = require('../server.js')

obj.personApps = (req, res) => {
    const obj = require('./auth.js')

    let SQL = `SELECT * FROM auth WHERE session_id=$1;`
    let Value = [obj.sessionData];

    mainObj.client.query(SQL, Value).then((data) => {
        let id = data.rows[0].id;

    })

}

obj.personDeleteApp = (req, res) => {

}


obj.personOffers = (req, res) => {
    const obj = require('./auth.js')

    let SQL = `SELECT * FROM auth WHERE session_id=$1;`
    let Value = [obj.sessionData];

    mainObj.client.query(SQL, Value).then((data) => {
        let id = data.rows[0].id;

    })
}

obj.personUpdateOffer = (req, res) => {

}


obj.personEdit = (req, res) => {
    const obj = require('./auth.js')

    let SQL = `SELECT * FROM auth WHERE session_id=$1;`
    let Value = [obj.sessionData];

    mainObj.client.query(SQL, Value).then((data) => {
        let id = data.rows[0].id;
        let SQL = `SELECT * FROM person WHERE auth_id=${id};`
        mainObj.client.query(SQL).then((data) =>{
            res.render('pages/person/edit', {data:data.rows[0]});
        })
    })
}

obj.personUpdateEdit = (req, res) => {
    let {first_name,last_name,phone,job_title,country,age,avatar,experince,cv,id}=req.body;
    let SQL = `UPDATE person SET first_name=$1,last_name=$2,phone=$3,job_title=$4,country=$5,age=$6,avatar=$7,experince=$8,cv=$9 WHERE id=$10;`
    let Values = [first_name,last_name,phone,job_title,country,age,avatar,experince,cv,id]
    mainObj.client.query(SQL,Values).then(() =>{
        res.redirect('/')
    })
}

module.exports = obj;