// To run server, run "npx babel-node .\src\server.js" from backend directory
import express, { response } from 'express';
import { entries as entriesRaw, libraryItems as libraryItemsRaw} from './temp-data';

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");


app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
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
let libraryItems = libraryItemsRaw;
// let entries = entriesRaw;

// const app = express();
// app.use(express.json());

app.get('/hello', (req, res) =>{
    res.send('Hello!');
});

app.get('/api/search', (req,res) =>{
    res.json(entries);
});

function populateLibraryIds(ids){
    return ids.map(id => entries.find(entry => entry.id === id));
}

// Show User Library, populated from the id of items in library
app.get('/api/users/:userId/library',(req,res)=>{
    const populatedLibrary = populateLibraryIds(libraryItems)
    res.json(populatedLibrary);
});

app.get('/api/search/:entryId',(req,res)=>{
    const entryId = req.params.entryId;
    con.query("SELECT * FROM entries WHERE id = ?", entryId, (err, result) => {
        res.json(result);
    })
}); 

app.delete('/api/search/:entryId',(req,res)=>{
  const entryId = req.params.entryId;
  const sqlGet = "SELECT * FROM entries";
    
  con.query("DELETE  FROM entries WHERE id = ?", entryId, (err, result) => {
    con.query(sqlGet, [], (err, result) => {
      res.json(result );
  })
  })
}); 

// Show User Library, populated from the id of items in library
app.get('/api/users/:userId/library',async (req,res)=>{
  let new_array = [];
  for (let x = 0; x < libraryItems.length; x++){
    con.query("SELECT * FROM entries WHERE id = ?", libraryItems[x],(err, result) => {
      new_array.push(result);
      if (x === libraryItems.length - 1){
        res.json(new_array);
      }
    })
  }
  });

// app.get('/api/search/:entryId',(req,res)=>{
//     const entryId = req.params.entryId;
//     const entry = entries.find(entry => entry.id === entryId);
//     res.json(entry);
// });

// Add Items to User Library
app.post('/api/users/:userId/library', (req,res) =>{
    const entryId = req.body.id;
    libraryItems.push(entryId);
    
})

app.delete('/api/users/:userId/library/:entryId', (req, res) => {
    const entryId = req.params.entryId;
    libraryItems = libraryItems.filter(id => id !== entryId);
    const populatedLibrary = populateLibraryIds(libraryItems)
    res.json(populatedLibrary);
})

app.listen(8000, () => {
    console.log("Server is listening on port 8000")
})