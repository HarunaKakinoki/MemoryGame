'use strict'
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const LOCAL_PORT = '8080';

//Database settings.
const DB_USER_NAME = process.env.DB_USER_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE_NAME = process.env.DB_DATABASE_NAME;
const DB_HOST_NAME = process.env.DB_HOST_NAME;

app.use(express.static('public'));
app.use(bodyParser.json());
app.set('port', process.env.PORT || LOCAL_PORT);

//Create local Database & Table.
/*function createDatabaseIfNotExist() {

  //Create a connection to create a database.
  let con = mysql.createConnection({
    host: DB_HOST_NAME,
    user: DB_USER_NAME, 
    password: DB_PASSWORD
  });

  let sql = "CREATE DATABASE IF NOT EXISTS memoryGame;";
  con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("Database Created");
  });

  setTimeout(function(){
     //Create a connection to create a database.
    con = mysql.createConnection({
      host: DB_HOST_NAME,
      user: DB_USER_NAME, 
      password: DB_PASSWORD,
      database: DB_DATABASE_NAME
    });

    //Connect to created database above.
    //Create a table inside of the db.
    con.connect(function(err) {
      let sql = "CREATE TABLE IF NOT EXISTS userTable" 
      + "(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,"
      + "username     VARCHAR(255),"  
      + "score        INT,"                   
      + "trial        INT,"
      + "tiles        INT)";

      con.query(sql, function(err, result) {
          if (err) throw err;
          console.log("Table Created");
      });
    });
  }, 1000);
}
//createDatabaseIfNotExist(); */

//Create Connection pool.
const pool = mysql.createPool({
    host     : DB_HOST_NAME,
    user     : DB_USER_NAME,
    password : DB_PASSWORD,
    database : DB_DATABASE_NAME,
    queueLimit : 0, // unlimited queueing
    connectionLimit : 10
});

//Create a connection to create a database.
const con = mysql.createConnection({
  host: DB_HOST_NAME,
  user: DB_USER_NAME, 
  password: DB_PASSWORD,
  database: DB_DATABASE_NAME
});

//Store user info to database.
app.post('/score/add', async function (req, res) {
  console.log('/score/add');
  console.log(req.body);
  const name = req.body.name;
  const score = req.body.score;
  const trial = req.body.trial;
  const tiles = req.body.tiles;
  
  pool.getConnection(function(err, con){
    con.query('INSERT INTO usertable set ?', {username: name, score: score, trial : trial, tiles: tiles}, function (error, results, fields) {
      if (error) throw error;
      res.send('ok');
      con.release();
    });
  });
});

//Fetch user data from database.
app.get('/score/', function (req, res) {
  console.log('/score/');
  pool.getConnection(function(err, con){
      con.query('SELECT * from usertable ORDER BY score DESC, id ASC;', function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.send(results);
      });
      con.release();
  });
});

//Listen server.
/*process.env.PORT is for deployment. Use local_port_number for local test*/
app.listen(app.get('port'), function () { 
  console.log('listening on port ' + app.get('port'));
});
