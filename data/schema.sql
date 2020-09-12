DROP TABLE IF EXISTS auth, person, company, applications, jobs, job_offers;

CREATE TABLE IF NOT EXISTS auth (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    account_type VARCHAR(255),
    season_id VARCHAR(255) UNIQUE
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
    status VARCHAR(255),
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
    status VARCHAR(255),
    person_id INT REFERENCES person (id),
    company_id INT REFERENCES company (id)
);
