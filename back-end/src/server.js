// To run server, run "npx babel-node .\src\server.js" from backend directory
import express, { response } from 'express';
import { entries, libraryItems } from './temp-data';

const app = express();

app.get('/hello', (req, res) =>{
    res.send('Hello!');
});

app.get('/search', (req,res) =>{
    res.json(entries);
});

app.get('/library',(req,res)=>{
    res.json(libraryItems);
});

app.get('/search/:entryId',(req,res)=>{
    const entryId = req.params.entryId;
    const entry = entries.find(entry => entry.id === entryId);
    res.json(entry);
});

app.listen(8000, () => {
    console.log("Server is listening on port 8000")
})