// const { Pool, Client } = require('pg')
// require('dotenv').config();
// const connectionString = process.env.DATABASE_URL;
// console.log(connectionString);
// const pool = new Pool({
//   user: 'test',
//   host: 'localhost',
//   database: 'test',
//   password: 'password',
//   port: 5432,
// });

// const client = new Client({
//   connectionString: connectionString,
// })


// client.connect();

// client.query('CREATE TABLE IF NOT EXISTS users ( id SERIAL NOT NULL, board_id INTEGER[], google_name TEXT, CONSTRAINT users_pk PRIMARY KEY ("id") )', (err,res) =>{
//     console.log(err,res);
//     client.end();
// });



// let res =  pool.query('CREATE TABLE IF NOT EXISTS board ( id SERIAL NOT NULL, name TEXT, CONSTRAINT board_pk PRIMARY KEY ("id") )', (err,res)=>{
//     console.log(err,res);
//     pool.end();
// });

// res = client.query('CREATE TABLE IF NOT EXISTS task(id SERIAL NOT NULL, name TEXT, status BOOLEAN, board_id INTEGER REFERENCES board (id), task TEXT, CONSTRAINT task_pk PRIMARY KEY ("id"))');
// res = client.query('CREATE TABLE IF NOT EXISTS story(id serial NOT NULL, board_id INTEGER REFERENCES board (id), name TEXT, done BOOLEAN', CONSTRAINT story_pk PRIMARY KEY ("id"));
// res = client.query('CREATE TABLE IF NOT EXISTS user(id serial NOT NULL, board_id INTEGER[], google_name TEXT', CONSTRAINT users_pk PRIMARY KEY ("id"));

// pool.end()