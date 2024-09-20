const express = require('express')
const bodyparser = require('body-parser')

const app= express();

app.use(bodyparser.urlencoded({extended : true}));

app.use(bodyparser.json());

app.get('/',(req,res)=>{
    res.json({"message":"Welcome to API"})
})

require('./route.js')(app);

app.listen(3002,()=>{
    console.log("Server is running on 3306")
})