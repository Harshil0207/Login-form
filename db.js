const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const salt = 10;


var conn = mysql.createConnection({
  host: "b3uypy0phvu1006brinp-mysql.services.clever-cloud.com",
  user: "unury0mqm562z94d",
  password: "unury0mqm562z94d",
  database: "b3uypy0phvu1006brinp",
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