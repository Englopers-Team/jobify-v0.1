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
                        jobData = data3.body.map(item => {
                            return new mainObj.JOB(item);
                        })
                        let SQL = `SELECT * FROM jobs WHERE title=$1 AND location=$2;`
                        let Values = [job_title, country];
                        mainObj.client.query(SQL, Values).then((data4) => {
                            res.render('homepages/index_person', { data: data2.rows[0], data2: jobData, data3: data4.rows })
                        })
                    })
                    // let SQL = `SELECT * FROM jobs WHERE title=$1 AND location=$2;`

                })
            } else if (account_type == 'c') {
                let SQL = `SELECT * FROM company WHERE auth_id=$1;`
                let Value = [id];
                mainObj.client.query(SQL, Value).then((data) => {
                    let SQL2 = `SELECT applications.id,status,title,first_name,last_name,job_title,avatar,age,experince,cv,country FROM applications JOIN jobs ON applications.job_id=jobs.id JOIN person ON applications.person_id=person.id WHERE applications.company_id=${data.rows[0].id};`
                    mainObj.client.query(SQL2).then((data2) => {
                        let SQL3 = `SELECT status,title,type,first_name,last_name,avatar,age,experince FROM job_offers JOIN person ON job_offers.person_id=person.id WHERE company_id=${data.rows[0].id};`
                        mainObj.client.query(SQL3).then((data3) => {
                            res.render('homepages/index_company', { data: data.rows[0], data2: data2.rows, data3: data3.rows })

                        })


                    })
                })

            }
        })
    }


}

module.exports = obj;