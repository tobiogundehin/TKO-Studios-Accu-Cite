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

app.get('/api/users/:email', (req, res) => {
  const email = req.params.email;

  const sqlGetUserByEmail = "SELECT * FROM Users WHERE email = ?";
  con.query(sqlGetUserByEmail, [email], (err, result) => {
    if (err) {
      console.error("Error fetching user by email:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const user = result[0];
    res.json(user);
  });
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

// Show User Library, populated from the libraryItems field of the user
app.get('/api/users/:userEmail/library', async (req, res) => {
  const userEmail = req.params.userEmail;

  const sqlGetUserId = "SELECT user_id FROM Users WHERE email = ?";
  con.query(sqlGetUserId, [userEmail], (err, rows) => {
    if (err) {
      console.error("Error fetching user's ID:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (rows.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const userId = rows[0].user_id;

    // Query the database to fetch the user's library items based on the userId
    const sqlGetUserLibraryItems = "SELECT libraryItems FROM Users WHERE user_id = ?";
    con.query(sqlGetUserLibraryItems, [userId], (err, rows) => {
      if (err) {
        console.error("Error fetching user's library items:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      if (rows.length === 0) {
        res.json([]); // Return an empty array if the user has no library items
        return;
      }

      const userLibraryItems = rows[0].libraryItems;
      const cleanLibraryItems = userLibraryItems.replace(/[\[\]']+/g, '').trim();

      // If user has no library items, return an empty array
      if (!userLibraryItems || userLibraryItems.length === 0) {
        res.json([]);
        return;
      }

      // Query the entries table to fetch the details of library items
      const sqlGetLibraryItems = "SELECT * FROM entries WHERE id IN (?)";
      const libraryItemIds = cleanLibraryItems.split(',').map(id => parseInt(id.trim(), 10));

      con.query(sqlGetLibraryItems, [libraryItemIds], (err, results) => {
        if (err) {
          console.error("Error fetching library items:", err);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
        res.json(results);
      });
    });
  });
});

// app.get('/api/search/:entryId',(req,res)=>{
//     const entryId = req.params.entryId;
//     const entry = entries.find(entry => entry.id === entryId);
//     res.json(entry);
// });

// Add Items to User Library
app.post('/api/users/:userEmail/library', (req, res) => {
  const userEmail = req.params.userEmail;
  const entryId = parseInt(req.body.id); // Parse entry ID as a number

  if (isNaN(entryId)) {
    res.status(400).json({ error: "Invalid entry ID" });
    return;
  }

  // Update the user's libraryItems field in the database with the new entry ID
  const sql = `
    UPDATE users
    SET libraryItems = JSON_ARRAY_APPEND(
      IFNULL(libraryItems, JSON_ARRAY()),
      '$',
      ?
    )
    WHERE email = ?
  `;

  con.query(sql, [entryId, userEmail], (err, result) => {
    if (err) {
      console.error("Error adding entry to library:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    // Send a success response
    res.json({ message: "Entry added to library successfully" });
  });
});


app.delete('/api/users/:userEmail/library/:entryId', (req, res) => {
  const userEmail = req.params.userEmail;
  const entryIdToRemove = req.params.entryId;

  // Construct the SQL query to remove the entryId from the libraryItems array
  const sql = `
    UPDATE users
    SET libraryItems = JSON_REMOVE(
      IF(
        JSON_CONTAINS(libraryItems, ?),
        libraryItems,
        '[]'
      ),
      JSON_UNQUOTE(JSON_SEARCH(libraryItems, 'one', ?))
    )
    WHERE email = ?
  `;

  // Execute the SQL query
  con.query(sql, [entryIdToRemove.toString(), entryIdToRemove.toString(), userEmail], (err, result) => {
    if (err) {
      console.error('Error removing entry from library:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('Entry removed from library successfully');
    res.sendStatus(204); // Send success status
  });
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

