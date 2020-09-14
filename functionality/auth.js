"use strict";

const obj = {};
const mainObj = require("../server.js");

obj.login = (req, res) => {
  let { email, password, session_id } = req.body;
  console.log(session_id);
  let SQL1 = `SELECT * FROM auth WHERE email=$1 AND password=$2;`;
  let Values1 = [email, password];
  mainObj.client
    .query(SQL1, Values1)
    .then((data) => {
      if (data.rows.length) {
        console.log(session_id);
        let SQL2 = `UPDATE auth SET session_id=$1 WHERE email=$2;`;
        let Values2 = [session_id, email];
        mainObj.client
          .query(SQL2, Values2)
          .then(() => {
            obj.sessionData = session_id;
            res.redirect("/");
            // console.log("User found")
          })
          .catch((error) => {
            let errorReason = "Error | Can't update session.";
            console.log(errorReason);
            res.status(500).render("pages/error", { data: errorReason });
          });
      } else {
        console.log("Can't find user in database");
      }
    })
    .catch((error) => {
      let errorReason = "Error | Can't find user in database.";
      console.log(errorReason);
      res.status(500).render("pages/error", { data: errorReason });
    });
};

obj.signupPage = async (req, res) => {
  res.render("pages/signup", { ip: await mainObj.ip(req) });
};

obj.personSignUp = (req, res) => {
  // console.log(client);

  let {
    first_name,
    last_name,
    email,
    phone,
    job_title,
    country,
    account_type,
    session_id,
    password,
  } = req.body;
  let SQL1 = `INSERT INTO auth (email,password,account_type,session_id) VALUES ($1,$2,$3,$4);`;
  let Values1 = [email, password, account_type, session_id];
  mainObj.client
    .query(SQL1, Values1)
    .then(() => {
      let SQL2 = `SELECT * FROM auth WHERE email=$1`;
      let Values2 = [email];
      mainObj.client
        .query(SQL2, Values2)
        .then((data) => {
          let SQL3 = `INSERT INTO person (first_name,last_name,phone,job_title,country,auth_id) VALUES ($1,$2,$3,$4,$5,$6);`;
          let Values3 = [
            first_name,
            last_name,
            phone,
            job_title,
            country,
            data.rows[0].id,
          ];
          mainObj.client
            .query(SQL3, Values3)
            .then(() => {
              obj.sessionData = session_id;
              res.redirect("/");
            })
            .catch((error) => {
              let errorReason =
                "Error | Can't insert user details in database.";
              console.log(errorReason);
              res.status(500).render("pages/error", { data: errorReason });
            });
        })
        .catch((error) => {
          let errorReason = "Error | Can't select user in database.";
          console.log(errorReason);
          res.status(500).render("pages/error", { data: errorReason });
        });
    })
    .catch((error) => {
      let errorReason = "Error | Can't insert user in database.";
      console.log(errorReason);
      res.status(500).render("pages/error", { data: errorReason });
    });
};

obj.companySignUp = (req, res) => {
  let {
    company_name,
    email,
    phone,
    logo,
    country,
    company_url,
    account_type,
    session_id,
    password,
  } = req.body;
  let SQL1 = `INSERT INTO auth (email,password,account_type,session_id) VALUES ($1,$2,$3,$4);`;
  let Values1 = [email, password, account_type, session_id];
  mainObj.client
    .query(SQL1, Values1)
    .then(() => {
      let SQL2 = `SELECT * FROM auth WHERE email=$1`;
      let Values2 = [email];
      mainObj.client
        .query(SQL2, Values2)
        .then((data) => {
          let SQL3 = `INSERT INTO company (company_name,phone,logo,country,company_url,auth_id) VALUES ($1,$2,$3,$4,$5,$6);`;
          let Values3 = [
            company_name,
            phone,
            logo,
            country,
            company_url,
            data.rows[0].id,
          ];
          mainObj.client
            .query(SQL3, Values3)
            .then(() => {
              obj.sessionData = session_id;
              res.redirect("/");
            })
            .catch((error) => {
              let errorReason =
                "Error | Can't insert user details in database.";
              console.log(errorReason);
              res.status(500).render("pages/error", { data: errorReason });
            });
        })
        .catch((error) => {
          let errorReason = "Error | Can't select company in database.";
          console.log(errorReason);
          res.status(500).render("pages/error", { data: errorReason });
        });
    })
    .catch((error) => {
      let errorReason = "Error | Can't insert company in database.";
      console.log(errorReason);
      res.status(500).render("pages/error", { data: errorReason });
    });
};

obj.logout = (req, res) => {
  console.log("logout");
  obj.sessionData = undefined;
  res.redirect("/");
};

module.exports = obj;
