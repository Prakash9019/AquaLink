const connectDB = require('./db');
const express = require('express');
var cors=require('cors');

//connectDB();
const app = express();
const PORT=5000;
connectDB();
// app.use(cors(
//     {
//         origin:["https://notes-application-front-htzqbfgbg.vercel.app"],
//         methods:["POST","GET"],
//         credentials:true
//     }
// ));
app.use(cors());
app.use(express.json());


app.use('/api/auth',require('./routers/auth.js'));
app.use('/api/notes',require('./routers/notes'));

app.get('/',(req,res)=>{
    res.json("hello");
})


app.listen(PORT, () => {
    console.log(`Todolist listening at http://localhost:${PORT}`);
})
