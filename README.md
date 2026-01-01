# ♚ Real-Time Multiplayer Chess

A stunning, modern real-time chess application built with **Node.js**, **Socket.io**, and **Chess.js**. Featuring a premium "Midnight Glass" aesthetic, drag-and-drop gameplay, and instant multiplayer connectivity.

![Chess App Preview](https://i.imgur.com/placeholder-chess.png)
*(Replace with actual screenshot)*

## ✨ Features

-   **Real-Time Multiplayer**: Play against friends instantly across different browsers or devices via Socket.io.
-   **Role Management**:
    -   First player to connect plays **White**.
    -   Second player plays **Black**.
    -   Subsequent connections become **Spectators**.
-   **Modern "Midnight" UI**:
    -   Sleek Dark/Slate color palette.
    -   Glassmorphism effects (blur, transparency).
    -   Vector-based **Font Awesome 6** pieces.
    -   Responsive chessboard.
-   **Smart Board Flipping**: The board automatically rotates 180° for the Black player, ensuring a proper perspective.
-   **Drag & Drop**: Smooth, intuitive move mechanics with valid move validation.
-   **Move Validation**: Powered by `chess.js` to ensure all moves follow standard chess rules (en passant, castling, promotion support included in logic).

## 🛠️ Tech Stack

-   **Backend**: Node.js, Express.js
-   **Real-Time Engine**: Socket.io
-   **Game Logic**: Chess.js (Server & Client side validation)
-   **Frontend**: EJS (Templating), Tailwind CSS (Styling), Font Awesome (Icons)

## 🚀 Getting Started

### Prerequisites

-   Node.js (v14+ recommended)
-   npm

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/sauravsultane/chess-app.git
    cd chess-app
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Start the Server**:
    ```bash
    node app.js
    ```

4.  **Play**:
    -   Open your browser and navigate to `http://localhost:3000`.
    -   Open a second tab/window to `http://localhost:3000` to join as the second player.

## 📂 Project Structure

```
├── public/
│   ├── js/
│   │   └── chessgame.js    # Client-side game logic & socket events
│   ├── css/                # Styles (if separate from Tailwind)
│   └── images/
├── views/
│   └── index.ejs           # Main game interface (HTML/EJS)
├── app.js                  # Express server & Socket.io backend logic
├── package.json            # Dependencies & scripts
└── README.md               # Project documentation
```

## 🎮 How to Play

1.  **Waiting for Opponent**: The game starts once two players are connected.
2.  **Making a Move**: Drag a piece of your color to a valid square.
    -   **White**: Moves first.
    -   **Black**: Moves second.
3.  **Spectating**: If you join after two players, you will see the game in real-time but cannot interact with the pieces.

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request.

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

Distributed under the ISC License. See `package.json` for more information.