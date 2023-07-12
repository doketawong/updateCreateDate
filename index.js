const axios = require('axios'); 

const url = 'https://graph.facebook.com/v17.0/';
const access_token_field = '?access_token=';
const access_token = 'EAADg4X8ZAH5QBABykMbvR8ICylZAOZBaxfgFiDJIG7SDEEneKBAo8vwBS2EmIX2sexBKFmVEwcZAEcSxntgUoYJddjv6mYbzaq8s1Yi7MjCu4bLSRigPWMdpg0Y2HRBiXG4XYTGa7T1nkwjPgE20w2AkJZAkYUJWP8VZAt4mTNc4ihVJglATDpjHyb9n5y2PRniahzw5ZCkaZAcFUWE1GIIX';
var dataArr = [];


const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'some2some',
  password: 'postgres',
  port: 5432,
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const query = 'SELECT * FROM product_list';

client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    for (let row of res.rows) {
        axios.get(url + row.id+ access_token_field+ access_token)
        .then(function(content){
            row.createdate = content.data.created_time;
            console.log(row.createdate);
            const query1 = `UPDATE "product_list" 
            SET "createdate" = $1
            WHERE "id" = $2`;
            client.query(query1, [content.data.created_time, row.id])
        });
    }
});

