module.exports = (app) => {
    const db = require("./db.js");
    app.post("/registerUsername", db.registerUsername);
    app.post("/loginusername", db.loginusername);

}  