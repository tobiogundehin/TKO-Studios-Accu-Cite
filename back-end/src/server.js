// To run server, run "npx babel-node .\src\server.js" from backend directory
// import express, { response } from 'express';
import { libraryItems as libraryItemsRaw} from './temp-data';

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
    password: 'Dollars66.',
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
  const abstract = req.body.abstract;
  const sqlInsert = "INSERT INTO entries (title, Last, First, Middle, year, publisher, format, summary) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const sqlGet = "SELECT * FROM entries"; 
  con.query(sqlInsert, [title, Last, First, Middle, year, publisher, format, abstract], (err, result) => {
    con.query(sqlGet, [], (err, result) => {
      res.json(result);
  })
    })
});

app.get('/api/search/:entryId',(req,res)=>{
    const entryId = req.params.entryId;
    con.query("SELECT * FROM entries WHERE id = ?", entryId, (err, result) => {
        res.json(result);
    })
}); 

app.get('/api/search/:entryId/editEntryPage',(req,res)=>{
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
  if (!libraryItems.includes(entryId)) {
      libraryItems.push(entryId);
  }
  res.end();
})

app.delete('/api/users/:userId/library/:entryId', (req, res) => {
  const entryId = req.params.entryId;
  const index = libraryItems.indexOf(entryId);
  if (index !== -1) {
      libraryItems.splice(index, 1);
      res.sendStatus(204);
  } else {
      res.status(404).json({ message: "Entry not found" });
  }
});

// ACCOUNT CREATION
app.post('/api/users', (req, res) => {
  const { first_name, last_name, email, libraryItems } = req.body.newUser;

  const sqlCheckEmail = "SELECT COUNT(*) AS count FROM Users WHERE email = ?";
  con.query(sqlCheckEmail, [email], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (result[0].count > 0) {
      res.status(409).json({ error: "Email already in use" });
      return;
    }

    const sqlInsertUser = "INSERT INTO Users (first_name, last_name, email, libraryItems) VALUES (?, ?, ?, ?)";
    con.query(sqlInsertUser, [first_name, last_name, email, JSON.stringify(libraryItems)], (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.status(201).json({ message: "User created successfully" });
    });
  });
});



// ADMIN ENDPOINTS
// Get request for admin
app.get('/api/users', (req, res) => {
  const sqlGetUsers = 'SELECT * FROM Users';

  con.query(sqlGetUsers, (err, result) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    res.json(result);
  });
});

// Delete Account
app.delete('/api/users/:userId', (req, res) => {
  const userId = req.params.userId;

  // Check if the user exists before attempting to delete
  const sqlCheckUser = "SELECT COUNT(*) AS count FROM Users WHERE user_id = ?";
  con.query(sqlCheckUser, [userId], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (result[0].count === 0) {
      // If the user does not exist, return a 404 (Not Found) status code
      res.status(404).json({ error: "User not found" });
      return;
    }

    // If the user exists, proceed to delete the user
    const sqlDeleteUser = "DELETE FROM Users WHERE user_id = ?";
    con.query(sqlDeleteUser, [userId], (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.status(204).json({ message: "User deleted successfully" });
    });
  });
});

