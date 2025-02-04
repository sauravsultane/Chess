const socket = io();
const chess = new Chess(); // Ensure Chess is imported correctly
const boardElement = document.querySelector(".chessboard");

let playerRole = null; // 'w' for white, 'b' for black, null for spectator
let sourceSquare = null; // Source square for drag-and-drop
let draggedPiece = null; // Dragged piece element

// Render the chessboard
const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = ""; // Clear the board

    board.forEach((row, rowIndex) => {
        row.forEach((square, colIndex) => {
            const squareElement = document.createElement("div");
            squareElement.classList.add(
                "square",
                (rowIndex + colIndex) % 2 === 0 ? "light" : "dark"
            );

            squareElement.dataset.row = rowIndex;
            squareElement.dataset.col = colIndex;

            if (square) {
                const pieceElement = document.createElement("div");
                pieceElement.classList.add(
                    "piece",
                    square.color === "w" ? "white" : "black"
                );
                pieceElement.innerText = getPieceUnicode(square.type, square.color);
                pieceElement.draggable = playerRole === square.color; // Only draggable if it's the player's piece

                pieceElement.addEventListener("dragstart", (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowIndex, col: colIndex };
                        e.dataTransfer.setData("text/plain", ""); // Required for drag-and-drop
                    }
                });

                pieceElement.addEventListener("dragend", () => {
                    draggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener("dragover", (e) => e.preventDefault()); // Allow drop

            squareElement.addEventListener("drop", (e) => {
                e.preventDefault();
                if (draggedPiece) {
                    const targetSquare = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col),
                    };
                    handleMove(sourceSquare, targetSquare);
                }
            });

            boardElement.appendChild(squareElement);
        });
    });

    // Flip the board if the player is black
    if (playerRole === "b") {
        boardElement.classList.add("flipped");
    } else {
        boardElement.classList.remove("flipped");
    }
};

// Handle a move from the player
const handleMove = (from, to) => {
    const move = {
        from: `${String.fromCharCode(97 + from.col)}${8 - from.row}`,
        to: `${String.fromCharCode(97 + to.col)}${8 - to.row}`,
    };

    try {
        const validMove = chess.move(move);
        if (validMove) {
            renderBoard();
            socket.emit("move", move); // Send the move to the server
        } else {
            console.error("Invalid move:", move);
        }
    } catch (error) {
        console.error("Error making move:", error);
    }
};

// Get the Unicode character for a chess piece
const getPieceUnicode = (type, color) => {
    const pieces = {
        p: { w: "♙", b: "♟" },
        r: { w: "♖", b: "♜" },
        n: { w: "♘", b: "♞" },
        b: { w: "♗", b: "♝" },
        q: { w: "♕", b: "♛" },
        k: { w: "♔", b: "♚" },
    };
    return pieces[type][color] || "";
};

// Set player role (white/black)
socket.on("playerRole", (role) => {
    playerRole = role;
    renderBoard();
});

// Set spectator mode
socket.on("spectatorRole", () => {
    playerRole = null;
    renderBoard();
});

// Update board state from the server
socket.on("boardState", (fen) => {
    try {
        chess.load(fen);
        renderBoard();
    } catch (error) {
        console.error("Invalid FEN received:", fen);
    }
});

// Handle move from the server
socket.on("move", (move) => {
    chess.move(move);
    renderBoard();
});

// Initial board render
renderBoard();