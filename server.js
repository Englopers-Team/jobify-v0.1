"use strict";
// Dependencies----------------------------------------------------------------------------------
const mainObj = {};

const express = require("express");
mainObj.superagent = require("superagent");
const methodOverride = require("method-override");
const pg = require("pg");
require("dotenv").config();
const cors = require('cors');

const PORT = process.env.PORT || 3000;
mainObj.client = new pg.Client(process.env.DATABASE_URL);
const app = express();
app.use(cors());

app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

module.exports = mainObj;

// Import----------------------------------------------------------------------------------------

const homePage = require("./functionality/homepage.js");
const auth = require("./functionality/auth.js");
const searches = require("./functionality/searches.js");
const aboutus = require("./functionality/aboutus.js");
const person = require("./functionality/person.js");
const company = require("./functionality/company.js");

// Routes----------------------------------------------------------------------------------------

// HomePage------------------------------------------------------------------
app.get("/", homePage.homePage); // render("index_gust.ejs") or ("index_person.ejs") or ("index_company.ejs")
// Auth----------------------------------------------------------------------
app.post("/login", auth.login); // redirect("/")
app.get("/signup", auth.signupPage); // render("pages/signup")

app.post("/signup/person", auth.personSignUp); // redirect("/")
app.post("/signup/company", auth.companySignUp); // redirect("/")

app.get("/logout", auth.logout); // redirect("/")
// Searches------------------------------------------------------------------
app.get("/search/job", searches.searchJob); // render("pages/searches/job-guest") or ("pages/searches/job-user")
app.post("/search/job/apply/:jobID", searches.applyJob); // redirect("/person/apps")

app.get("/search/company", searches.searchCompanyPage); // render("pages/searches/company")
app.get("/search/company/result", searches.searchCompany); // render("pages/searches/searchCompanyResult")

app.get("/search/person", searches.searchPersonPage); // render("pages/searches/person")
app.get("/search/person/search", searches.searchPerson); // render("pages/searches/personResults")
app.post("/search/person/offer", searches.personOffer); // redirect("/")

// Aboutus-------------------------------------------------------------------
app.get("/aboutus", aboutus.aboutus); // render("pages/aboutus")
// Person--------------------------------------------------------------------
app.get("/person/apps", person.personApps); // render("pages/person/apps")
app.delete("/person/apps/:appID", person.personDeleteApp); // redirect("/person/apps")

app.get("/person/offers", person.personOffers); // render("pages/person/offers")
app.put("/person/offers/:offerID", person.personUpdateOffer); // redirect("/person/offers")

app.get("/person/edit", person.personEdit); // render("pages/person/edit")
app.put("/person/edit/update", person.personUpdateEdit); // redirect("/")
// // Company-------------------------------------------------------------------
app.get("/company/jobs", company.companyJobs); // render("pages/company/myJobs")
app.delete("/company/jobs/delete/:jobID", company.companyDeleteJob); // redirect("/company/jobs")
app.put("/company/jobs/update/:jobID", company.companyUpdateJob); // redirect("/company/jobs")

app.get("/company/jobs/submit", company.companySubmitJobPage); // render("pages/company/submitJob")
app.post("/company/jobs/submit/action", company.companySubmitJob); //redirect("/company/jobs")

app.get("/company/edit", company.companyEdit); // render("pages/company/edit")
app.put("/company/edit/update", company.companyUpdateEdit); //redirect("/")

app.put("/company/apps/answer/:appID", company.appAnswer); //redirect("/")

app.delete("/company/offer/delete/:offerID", company.personDeleteOffer); // redirect("/")

// Routes----------------------------------------------------------------------------------------

mainObj.JOB = function (data) {
  this.title = data.title;
  this.location = data.location;
  this.type = data.type;
  this.description = data.description;
  this.logo = data.company_logo;
  this.company_url = data.company_url;
};

mainObj.ip = (req) => {
  let ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null) || '127.0.0.1';
  // ip = ip.slice(7, ip.length);
  if(ip == ""){
    ip = "127.0.0.1"
  }
  let URL = `https://api.ip2country.info/ip?${ip}`;
  return mainObj.superagent.get(URL).then((data) => {
    if (data.body.countryName == "") {
      return "Jordan";
    } else return data.body.countryName;
  })
  .catch(()=>{
    console.log("error API || ip ")
  })
};

app.use("*", (req, res) => {
  let errorReason = "Error | Wrong page."
  console.log(errorReason);
  res.status(404).render("pages/error", { data: errorReason });
});

mainObj.client.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
});
