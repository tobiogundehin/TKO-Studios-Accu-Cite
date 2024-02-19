// To run server, run "npx babel-node .\src\server.js" from backend directory
import express, { response } from 'express';
import 

const app = express();

app.get('/hello', (req, res) =>{
    res.send('Hello!');
});

app.get('/search', (req,res) =>{

});

app.get('/library',(req,res)=>{

});

app.get('/search/:articleId',(req,res)=>{

});

app.listen(8000, () => {
    console.log("Server is listening on port 8000")
})