// To run server, run "npx babel-node .\src\server.js" from backend directory
// import express, { response } from 'express';
// import { entries as entriesRaw, libraryItems as libraryItemsRaw} from './temp-data';
// const MYSQLBackend = require("./DatabaseFunctions");

// var mysql = require('mysql');
// var con = mysql.createConnection({
//     host: "localhost",
//     port: 8080,
//     user: "root",
//     password: "g0Valp0!",
//     database: "full_stack",
//   });


//   con.connect(function(err) {
//     if (err) throw err;
//     con.query("SELECT * FROM entries", function (err, result, fields) {
//       if (err) throw err;
//       return console.log(result);
//     });
//   });

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { response } = require("express");

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'g0Valp0!',
    database: "full_stack",
  });

  con.connect((err) => {
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });

  con.query('SELECT * FROM entries', (err,rows) => {
    if(err) throw err;
  
    console.log('Data received from Db:');
    console.log(rows);
  });
  
  
app.listen(8000, () => {
    console.log("Server is listening on port 8000")
})
// let libraryItems = libraryItemsRaw;
// let entries = entriesRaw;

// const app = express();
// app.use(express.json());

app.get('/hello', (req, res) =>{
    res.send('Hello!');
});

app.get('/api/search', (req,res) =>{
    const sqlGet = "SELECT * FROM entries";
    con.query(sqlGet, [], (err, result) => {
        res.json(result );
    })
    
});

app.post('/api/createentry', (req,res)=> {
  const title = req.body.title;
  const Last = req.body.Last;
  const First = req.body.First;
  const Middle = req.body.Middle;
  const year = req.body.year;
  const publisher = req.body.publisher;
  const format = req.body.format;
  const summary = req.body.summary;
  const sqlInsert = "INSERT INTO 'entries' (title, Last, First, Middle, year, publisher, format, summary) VALUES ?, ?, ?, ?, ?, ?, ?, ?)";
    con.query(sqlInsert, [title, Last, First, Middle, year, publisher, format, summary], (err, result) => {
        res.send(result );
    })
});

app.get('/api/search/:entryId',(req,res)=>{
    // const entryId = req.params.entryId;
    const entryId = req.params.entryId;
    con.query("SELECT * FROM entries WHERE id = ?", entryId, (err, result) => {
        res.json(res);
    })

});

// function populateLibraryIds(ids){
//     return ids.map(id => entries.find(entry => entry.id === id));
// } 

// // Show User Library, populated from the id of items in library
// app.get('/api/users/:userId/library',(req,res)=>{
//     const populatedLibrary = populateLibraryIds(libraryItems)
//     res.json(populatedLibrary);
// });

// app.get('/api/search/:entryId',(req,res)=>{
//     const entryId = req.params.entryId;
//     const entry = entries.find(entry => entry.id === entryId);
//     res.json(entry);
// });

// // Add Items to User Library
// app.post('/api/users/:userId/library', (req,res) =>{
//     const entryId = req.body.id;
//     libraryItems.push(entryId);
//     const populatedLibrary = populateLibraryIds(libraryItems)
//     res.json(populatedLibrary);

// })

// app.delete('/api/users/:userId/library/:entryId', (req, res) => {
//     const entryId = req.params.entryId;
//     libraryItems = libraryItems.filter(id => id !== entryId);
//     const populatedLibrary = populateLibraryIds(libraryItems)
//     res.json(populatedLibrary);
// })

// async function runMySQL(){
//     const MYSQLBackend = new MYSQLBackend();
//     return MYSQLBackend.max();
// }

