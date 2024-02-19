// To run server, run "npx babel-node .\src\server.js" from backend directory
import express, { response } from 'express';

const app = express();

app.get('/hello', (req, res) =>{
    res.send('Hello!');
})

app.listen(8000, () => {
    console.log("Server is listening on port 8000")
})