// To run server, run "npx babel-node .\src\server.js" from backend directory
import express, { response } from 'express';
import { entries as entriesRaw, libraryItems as libraryItemsRaw} from './temp-data';

let libraryItems = libraryItemsRaw;
let entries = entriesRaw;

const app = express();
app.use(express.json());

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
app.get('/api/library',(req,res)=>{
    const populatedLibrary = populateLibraryIds(libraryItems)
    res.json(populatedLibrary);
});

app.get('/api/search/:entryId',(req,res)=>{
    const entryId = req.params.entryId;
    const entry = entries.find(entry => entry.id === entryId);
    res.json(entry);
});

// Add Items to User Library
app.post('/api/library', (req,res) =>{
    const entryId = req.body.id;
    libraryItems.push(entryId);
    const populatedLibrary = populateLibraryIds(libraryItems)
    res.json(populatedLibrary);

})

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebaseApp);

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((err) => {
    console.log(err.code);
    console.log(err.message);
  });

app.delete('/api/library/:entryId', (req, res) => {
    const entryId = req.params.entryId;
    libraryItems = libraryItems.filter(id => id !== entryId);
    const populatedLibrary = populateLibraryIds(libraryItems)
    res.json(populatedLibrary);
})

app.listen(8000, () => {
    console.log("Server is listening on port 8000")
})