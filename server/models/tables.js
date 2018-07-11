const { Client } = require('pg')
const connectionString = 'postgres://twgngoxw:epsBQcFapMEG5B6MVfQSby9DcBa39wIQ@pellefant.db.elephantsql.com:5432/twgngoxw'
const client = new Client(connectionString: connectionString)

await client.connect()

let res = await client
.query('CREATE TABLE IF NOT EXISTS board(id serial primary key, task_id INTEGER REFERENCES task id)')
.query('CREATE TABLE IF NOT EXISTS task(id serial primary key, name TEXT, status BOOLEAN, board_id INTEGER REFERENCES board id, task TEXT, status)')
.query('CREATE TABLE IF NOT EXISTS story(id serial primary key, board_id INTEGER REFERENCES board id, name TEXT, done BOOLEAN')

await client.end()