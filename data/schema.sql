DROP TABLE IF EXISTS auth, person, company, applications, jobs, job_offers;

CREATE TABLE IF NOT EXISTS auth (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    account_type VARCHAR(255),
    session_id VARCHAR(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS person (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone VARCHAR(255),
    job_title VARCHAR(255),
    country VARCHAR(255),
    age INT,
    avatar VARCHAR(255),
    experince INT,
    cv VARCHAR(255),
    auth_id INT REFERENCES auth (id)
);

CREATE TABLE IF NOT EXISTS company (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255),
    phone VARCHAR(255),
    company_url VARCHAR(255),
    logo VARCHAR(255),
    country VARCHAR(255),
    auth_id INT REFERENCES auth (id)
);

CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    location VARCHAR(255),
    type VARCHAR(255),
    description TEXT,
    company_id INT REFERENCES company (id)
);

CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    status VARCHAR(255) DEFAULT 'Pending',
    person_id INT REFERENCES person (id),
    job_id INT REFERENCES jobs (id),
    company_id INT REFERENCES company (id)
);

CREATE TABLE IF NOT EXISTS job_offers (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    location VARCHAR(255),
    type VARCHAR(255),
    description TEXT,
    status VARCHAR(255) DEFAULT 'Pending',
    person_id INT REFERENCES person (id),
    company_id INT REFERENCES company (id)
);

INSERT INTO auth (email,password,account_type,session_id) VALUES('abd@gmail.com','123456','p','xxx3215315gew');
INSERT INTO auth (email,password,account_type,session_id) VALUES('zak@gmail.com','123456','c','xxx3215rgagagrga');

INSERT INTO person (first_name, last_name, phone, job_title, country, age, avatar, experince, cv, auth_id) VALUES ('Abd','Zat','0790278534','Developer','Jordan',24,'https://library.kissclipart.com/20180929/ooq/kissclipart-avatar-person-clipart-avatar-computer-icons-person-87355c56a1748473.jpg', 5,'cv link', 1);
INSERT INTO company (company_name,phone,company_url,logo,country,auth_id) VALUES ('Zakaria Company', '079028555', 'www.zak.com', 'https://library.kissclipart.com/20180929/ooq/kissclipart-avatar-person-clipart-avatar-computer-icons-person-87355c56a1748473.jpg', 'Jordan', 2);

INSERT INTO jobs (title,location,type,description,company_id) VALUES ('Developer','Jordan','Full Time','A full time job with 900jd salary.',1);
INSERT INTO jobs (title,location,type,description,company_id) VALUES ('Developer','usa','Full Time (iam from database)','A full time job with 900jd salary.',1);

INSERT INTO applications (status,person_id,job_id,company_id) VALUES ('waiting', 1,1,1);
INSERT INTO job_offers (title,location,type,description,status,person_id,company_id) VALUES ('Web Dev','Jordan','Full Time','500 salary','Waiting',1,1);
