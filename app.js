const express = require("express");
const app = express();
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");
const path = require("path");

const server = http.createServer(app);
const io = socket(server);

const chess = new Chess(); // Initialize chess game

let players = {}; // Store player socket IDs
let currentPlayer = "w"; // Track whose turn it is

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: "Chess Game" });
});

io.on("connection", function (socket) {
  console.log("A user connected:", socket.id);

  // Assign roles to players
  if (!players.white) {
    players.white = socket.id;
    socket.emit("playerRole", "w"); // Assign white role
    console.log("Assigned white to:", socket.id);
  } else if (!players.black) {
    players.black = socket.id;
    socket.emit("playerRole", "b"); // Assign black role
    console.log("Assigned black to:", socket.id);
  } else {
    socket.emit("spectatorRole"); // Assign spectator role
    console.log("Assigned spectator role to:", socket.id);
  }

  // Send the current board state to the newly connected client
  socket.emit("chessState", chess.fen());

  // Handle player disconnect
  socket.on("disconnect", function () {
    console.log("A user disconnected:", socket.id);
    if (socket.id === players.white) {
      delete players.white; // Free up the white role
      console.log("White player disconnected");
    } else if (socket.id === players.black) {
      delete players.black; // Free up the black role
      console.log("Black player disconnected");
    }
  });

  // Handle move from client
  socket.on("move", (move) => {
    try {
      // Validate move based on player role
      if (chess.turn() === "w" && socket.id !== players.white) return;
      if (chess.turn() === "b" && socket.id !== players.black) return;

      // Attempt to make the move
      const result = chess.move(move);
      if (result) {
        currentPlayer = chess.turn(); // Update turn
        io.emit("move", move); // Broadcast the move to all clients
        io.emit("chessState", chess.fen()); // Broadcast the updated board state
      } else {
        console.log("Invalid move:", move);
        socket.emit("invalidMove", move); // Notify the client of an invalid move
      }
    } catch (err) {
      console.log("Error making move:", err);
      socket.emit("invalidMove", move); // Notify the client of an invalid move
    }
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});