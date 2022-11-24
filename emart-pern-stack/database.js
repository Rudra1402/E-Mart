require('dotenv').config()

// ----- 1 -----
// const { Pool } = require('pg');

// const c = new Pool({
//     host: "localhost",
//     user: "postgres",
//     port: 5432,
//     password: "admin123",
//     database: "pern"
// })

// ----- 2 -----
const { Client } = require('pg')

const uri = process.env.DATABASE_URL;

var client = new Client({
    connectionString: uri,
    ssl: { rejectUnauthorized: false }
})

// ----- 3 -----
// const { Pool } = require('pg');

// const c = new Pool({
//     host: "ec2-54-228-32-29.eu-west-1.compute.amazonaws.com",
//     user: "puarmxbjzagnxg",
//     port: 5432,
//     password: "b32d208ef6cdc51c961ff5fe978a9387f84915ea5521867a3d3bd6ab254e8fa0",
//     database: "d1tarqo15v0v8f"
// })

// module.exports = c;

module.exports = client;

// module.exports = c;