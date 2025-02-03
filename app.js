const express = require("express");
const app = express();
const socket = require("socket.io");
const http = require("http");
const {Chess} = require("chess.js");
const path = require("path");

const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();

let player = {};
let currentplayer= "W";

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.render("index",{title:"chess game"});
})

io.on("connection",function(uniquesocket){
    console.log("connected");
})

server.listen(3000,()=>{
    console.log("sever is running on port 3000");
});