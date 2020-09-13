'use strict';

const obj = {};
const mainObj = require('../server.js')

obj.homePage = (req, res) => {
    const obj = require('./auth.js')

    if (obj.sessionData == undefined) {
        res.render('homepages/index_guest')
    } else {
        let SQL = `SELECT * FROM auth WHERE session_id=$1;`
        let Value = [obj.sessionData];
        mainObj.client.query(SQL, Value).then((data) => {
            let account_type = data.rows[0].account_type;
            let id = data.rows[0].id;
        
            if (account_type == 'p') {
                let SQL = `SELECT * FROM person WHERE auth_id=$1;`
                let Value = [id];
                mainObj.client.query(SQL, Value).then((data2) => {
                    let { country, job_title } = data2.rows[0];

                    let URL = `https://jobs.github.com/positions.json?description=${job_title}&location=${country}&?markdown=true`
                    let jobData;
                    mainObj.superagent.get(URL).then((data3) => {
                        jobData = data3.body.map(item =>{
                            return new mainObj.JOB(item);
                        })
                        let SQL = `SELECT * FROM jobs WHERE title=$1 AND location=$2;`
                        let Values = [job_title,country];
                        mainObj.client.query(SQL,Values).then((data4) =>{
                            res.render('homepages/index_person', { data: data2.rows[0], data2: jobData, data3:data4.rows })
                        })
                    })
                    // let SQL = `SELECT * FROM jobs WHERE title=$1 AND location=$2;`
                    
                })
            } else if (account_type == 'c') {
                res.render('homepages/index_company')
            }
        })
    }


}

module.exports = obj;