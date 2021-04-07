const express = require('express');
const nunjucks = require("nunjucks");

const server = express();

server.set("view engine", "html");

nunjucks.configure("views", {
    express:server
});

server.get("/", function(req, res) {
    return res.send("Hi! How's going?");
});

server.listen(5000, function() {
    console.log("Server is running 🟢")
});