// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var dataFile = require("./data.js");

//express app 
var app = express();
var PORT = process.env.PORT || 3000; 

//data parsing 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//routes
app.get("/api/tables", function(req, res) {
    return res.json(dataFile.tables);
});

app.get("/api/waitlist", function(req, res) {
    return res.json(dataFile.waitlist);
});


app.post("/api/tables", function(req, res) {
    if(dataFile.tables.length < 5 ){
        dataFile.tables.push(req.body);
        res.json(true);
    }

    // Or false if they don't have a table
    else{
        dataFile.waitlist.push(req.body);
        res.json(false); // KEY LINE
    }
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });