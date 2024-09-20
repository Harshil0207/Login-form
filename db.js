const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const salt = 10;


var conn = mysql.createConnection({
  host: "bmlohmbqiy92d7093h62-mysql.services.clever-cloud.com",
  user: "u632zmuplolzvbiz",
  port : 3306,
  password: "cbYafQ5CIEe1LiO6XrPz",
  database: "bmlohmbqiy92d7093h62",
});

conn.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database");
  }
});

exports.registerUsername =async  (req, res) => {
  console.log("User Register API call.");

  const pass = await  bcrypt.hash(req.body.password,salt);
  console.log(pass)
 var sql = "INSERT INTO login(username,password) VALUES (?,?)";
 

  con.query(sql, [req.body.username,pass],(err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error while register user");
    } else {
      res.send("User register successfully.");
    }
  });
};

exports.loginusername =async  (req, res) => {
  console.log("User Login API call.");
  const pass =await  bcrypt.hash(req.body.password,salt);
 console.log(pass)
 var sql = "select * from login where username = ?";
  con.query(sql, [req.body.username], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error while register user");
    } else {
      console.log("API password : " + req.body.password)
      // console.log("Database password : " + result[0].password)
      if(result.length > 0){
        bcrypt.compare(req.body.password,result[0].password).then((ispass)=>{
          if(ispass){
            res.send("User login successfully.");
          }else{
            res.send("Password is invalid.");
          }
        })
      }else{
        res.send("User not exist");
      }
    }
  });
};