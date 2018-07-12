const fetch = require('node-fetch');
const db = require('../db/index.js');

const userController = {
   authenticateUser:  (req, res) => {
       //sdb.connect();
       fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.headers['x-auth-token']}`)
       .then(response => response.json())
       .then(data => { 
           const query = `INSERT INTO users (google_id, google_name, picture, board_ids_array, email) (${data.sub}, ${data.name}, ${data.picture}, ${[]}, ${data.email}) WHERE NOT EXISTS ( SELECT * FROM users WHERE google_id = ${data.sub})`; 
           const query2 = `SELECT * FROM users WHERE google_id =${data.sub}`;
           const query3 = `SELECT EXISTS(SELECT 1 FROM users WHERE google_id ='${data.sub}') AS "exists"`;
           const query4 = `INSERT INTO users ()`;
           //console.log(data);
            db.query(query3,  '', (err, results) => {
                //if (err) return (err)
                // console.log('this is results running',results);
                if (!results.rows[0].exists){
                    const text = `INSERT INTO users (google_id, google_name, picture, email) VALUES ($1, $2, $3, $4) RETURNING *`;
                    const values = [`${data.sub}`,`${data.name}`, `${data.picture}`, `${data.email}`];
                    db.query(text, values, (err,results) => {
                        if (err) console.log('THIS IS ERROR ',err);
                        else {
                            res.send(results.rows[0]);
                        }
                    })
                }
                else {
                    const findUser = `SELECT * FROM users WHERE google_id = '${data.sub}'`;
                    db.query(findUser, '', (err, results) =>{
                        console.log('this is results ',results.rows);
                        //res.send(results.rows[0]);
                    });
                    //res.send(results.rows[0]);
                }
                //res.send(results.rows[0]);
            })
        }
        
    );
    //   const response = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.headers['x-auth-token']}`);
    //   const data = await response.json();
    //   return res.json(data);
   }
}


module.exports = userController;