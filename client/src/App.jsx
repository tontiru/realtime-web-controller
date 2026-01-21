import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SocketProvider } from './contexts/SocketContext.jsx';
import Home from './components/Home.jsx';
import HostView from './components/HostView.jsx';
import ControllerView from './components/ControllerView.jsx';
import NotFound from './components/NotFound.jsx';
import './App.css';

function App() {
  return (
    <SocketProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/host" element={<HostView />} />
            <Route path="/controller" element={<ControllerView />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </SocketProvider>
  );
}

export default App;
