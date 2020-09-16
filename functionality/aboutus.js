'use strict';

const obj = {};
const mainObj = require('../server.js')

obj.aboutus = (req, res) => {
    const obj = require('./auth.js')
    let SQL = `SELECT * FROM auth WHERE session_id=$1;`
    let Value = [obj.sessionData];
    let accType;
    let id;

    mainObj.client.query(SQL, Value).then((item) => {
        if (obj.sessionData == undefined) {
            accType = 'guest';
            res.render('pages/aboutus', { data3: accType })
        } else if (item.rows[0].account_type == 'c') {
            id = item.rows[0].id;
            let SQL1 = `SELECT * FROM company WHERE auth_id=${id};`
            mainObj.client.query(SQL1).then((data) =>{
                accType = 'company';
                res.render('pages/aboutus', {data:data.rows[0], data3: accType })
            })
        } else if (item.rows[0].account_type == 'p') {
            id = item.rows[0].id;
            let SQL1 = `SELECT * FROM person WHERE auth_id=${id};`
            mainObj.client.query(SQL1).then((data)=>{
                accType = 'employer';
                res.render('pages/aboutus', {data:data.rows[0], data3: accType })
            })
        }
    })


}

module.exports = obj;