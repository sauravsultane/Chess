# ♟️ Midnight Chess

A stunning, modern real-time chess application featuring a **"Midnight Glass"** aesthetic. Built with **Node.js**, **Socket.io**, and **Tailwind CSS**.

![Chess App Preview](https://i.imgur.com/placeholder-chess.png)
*(Run the app and take a screenshot to place here!)*

## ✨ Key Features

-   **Premium Visuals**:
    -   **Midnight Glass Theme**: A rich dark gradient background (`gray-900` to `black`) with glassmorphism containers.
    -   **Slate Board**: A modern Slate-300 / Slate-600 chessboard palette replacing traditional wood textures.
    -   **Vector Icons**: High-quality **Font Awesome 6** pieces (White & Matte Black) for sharp rendering at any size.
-   **Real-Time Multiplayer**:
    -   Instant connectivity via **Socket.io**.
    -   **Automatic Matchmaking**: The first two users match as White vs. Black.
    -   **Spectator Mode**: Additional users can watch the game live.
-   **Smooth Gameplay**:
    -   **Drag & Drop**: Intuitive controls with source square highlighting.
    -   **Auto-Flip**: The board automatically rotates for the Black player.
    -   **Move Validation**: Full compliance with chess rules (castling, en passant, etc.) via `chess.js`.

## 🛠️ Technology Stack

-   **Frontend**: EJS, Tailwind CSS, Font Awesome
-   **Backend**: Node.js, Express.js
-   **Real-Time**: Socket.io
-   **Game Logic**: Chess.js

## 🚀 Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/sauravsultane/Chess.git
    cd Chess
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Start the Server**
    ```bash
    node app.js
    ```

4.  **Play the Game**
    -   Open `http://localhost:3000` in your browser.
    -   Open a second tab to join as the opponent.

## 🎨 Customization

-   **Theme**: Modify `views/index.ejs` to change the Tailwind classes for the background or board colors.
-   **Pieces**: The piece icons are defined in `public/js/chessgame.js` using Font Awesome HTML strings.

## 📄 License

This project is open source and available under the [ISC License](LICENSE).