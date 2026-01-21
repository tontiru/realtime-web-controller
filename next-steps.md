# Next Steps

This document outlines the planned features and improvements for the Real-time Web Controller project.

## Core Functionality

-   [ ] **Lobby Creation:** Implement the logic on the server to create a unique lobby with a short code.
-   [ ] **Join Lobby:** Allow controllers to join a lobby using the short code.
-   [ ] **Real-time Communication:**
    -   [ ] Send button press/release events from the controller to the server.
    -   [ ] Broadcast events from the server to the host.
    -   [ ] Update the host view in real-time based on controller inputs.
-   [ ] **Player State Management:** Track players in a lobby and their scores/states.

## UI/UX Enhancements

-   [ ] **Styling:** Integrate Tailwind CSS and Shadcn/UI for a modern and clean user interface.
-   [ ] **QR Code:** Generate a QR code for the lobby to allow for quick joining.
-   [ ] **Game View:** Create a dedicated view for the game, displaying player scores.
-   [ ] **Controller Layouts:** Design different controller layouts that can be dynamically loaded.

## Advanced Features

-   [ ] **Unity Integration:** Establish a communication bridge between the React frontend and a Unity WebGL build.
-   [ ] **Multiple Lobbies:** Ensure the server can handle multiple lobbies concurrently.
-   [ ] **Reconnect Logic:** Implement logic to handle disconnections and reconnections of controllers.
