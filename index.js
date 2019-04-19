'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

//Port Numbers.
const local_port_number = '8080';
const heroku_port_number = process.env.PORT;

//For Local Database.
const LOCAL_HOST_NAME = "localhost";
const LOCAL_USER = "root"
const LOCAL_PASSWORD = "";
const LOCAL_DB_NAME = "memoryGame";

//For Heroku Database.
const DB_USER_NAME = "bffda148815d0d";
const DB_PASSWORD = "5ec6452c";
const DB_DB_NAME = "heroku_0fc69c30b0c19c6"
const DB_HOST_NAME = "us-cdbr-iron-east-03.cleardb.net";

//Allows accessing to the files inside "public" from browser.
app.use(express.static('public'));
app.use(bodyParser.json());

//Create local Database & Table.
function createDatabaseIfNotExist() {

  //Create a connection to create a database.
  let con = mysql.createConnection({
    host: LOCAL_HOST_NAME,
    user: LOCAL_USER, 
    password: LOCAL_PASSWORD
  });

  let sql = "CREATE DATABASE IF NOT EXISTS memoryGame;";
  con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("Database Created");
  });

  setTimeout(function(){
     //Create a connection to create a database.
    con = mysql.createConnection({
      host: LOCAL_HOST_NAME,
      user: LOCAL_USER, 
      password: LOCAL_PASSWORD,
      database: LOCAL_DB_NAME
    });

    //Connect to created database above.
    //Create a table inside of the db.
    con.connect(function(err) {
      let sql = "CREATE TABLE IF NOT EXISTS userTable" 
      + "(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY," /*ID (auto increment)*/
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

/*** Please comment out a below line When you create a local database ****/
createDatabaseIfNotExist();

//Create Connection pool.
/*const pool = mysql.createPool({
    host     : DB_HOST_NAME,
    user     : DB_USER_NAME,
    password : DB_PASSWORD,
    database : DB_DB_NAME,
    queueLimit : 0, // unlimited queueing
    connectionLimit : 10
});*/

//Create Connection pool.(For local)
const pool = mysql.createPool({
  host     : LOCAL_HOST_NAME,
  user     : LOCAL_USER,
  password : LOCAL_PASSWORD,
  database : LOCAL_DB_NAME,
  queueLimit : 0, // unlimited queueing
  connectionLimit : 10
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
app.listen(local_port_number, function () { 
  console.log('listening on port ' + local_port_number);
});
