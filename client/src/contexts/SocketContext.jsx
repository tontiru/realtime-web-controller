import React, { createContext, useContext } from 'react';
import io from 'socket.io-client';

// Create a singleton socket instance
const port = import.meta.env.VITE_PORT || 3001;
const socket = io(`http://localhost:${port}`);
const SocketContext = createContext(socket);

// Custom hook to use the socket context
export const useSocket = () => {
  return useContext(SocketContext);
};

// Provider component to wrap the application
export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
