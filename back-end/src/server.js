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

app.get('/search', (req,res) =>{
    res.json(entries);
});

function populateLibraryIds(ids){
    return ids.map(id => entries.find(entry => entry.id === id));
}

// Show User Library, populated from the id of items in library
app.get('/library',(req,res)=>{
    const populatedLibrary = populateLibraryIds(libraryItems)
    res.json(populatedLibrary);
});

app.get('/search/:entryId',(req,res)=>{
    const entryId = req.params.entryId;
    const entry = entries.find(entry => entry.id === entryId);
    res.json(entry);
});

// Add Items to User Library
app.post('/library', (req,res) =>{
    const entryId = req.body.id;
    libraryItems.push(entryId);
    const populatedLibrary = populateLibraryIds(libraryItems)
    res.json(populatedLibrary);

})

app.delete('/library/:entryId', (req, res) => {
    const entryId = req.params.entryId;
    libraryItems = libraryItems.filter(id => id !== entryId);
    const populatedLibrary = populateLibraryIds(libraryItems)
    res.json(populatedLibrary);
})

app.listen(8000, () => {
    console.log("Server is listening on port 8000")
})