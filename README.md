# Real-time Web Controller

A browser-based real-time controller system where phones can connect to a website and act as controllers for a Unity game or any web-based application.

## Features

- **Browser-based**: Both controller (phone) and receiver (website) run in the browser
- **Real-time communication**: Uses WebSockets/Socket.IO for low-latency messaging
- **Lobby system**: Host creates a lobby, players join via QR code or short room code
- **Multiple lobbies**: Support for multiple simultaneous game instances
- **Player tracking**: Track players by name with individual scores
- **Responsive UI**: Works on desktop and mobile devices
- **Animations**: Smooth animations using Framer Motion
- **Modern UI**: Built with React, Tailwind CSS, and shadcn components

## Quick Start

### Using Docker (Recommended)

1. **Build and run with Docker Compose**:
   ```bash
   docker-compose up --build
   ```

2. **Access the application**:
   - Host view: http://localhost:3001
   - Controller view: http://localhost:3001/controller?lobbyId=XXXXXX

### Using Node.js directly

1. **Install dependencies**:
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

2. **Build the frontend**:
   ```bash
   cd client && npm run build && cd ..
   ```

3. **Start the server**:
   ```bash
   node server.js
   ```

4. **Access the application**:
   - Host view: http://localhost:3001
   - Controller view: http://localhost:3001/controller?lobbyId=XXXXXX

## Project Structure

```
realtime-web-controller/
├── server.js              # Node.js server with Socket.IO
├── public/                # Static files (built frontend)
├── client/                # React frontend (Vite)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # Socket context
│   │   ├── lib/           # Utilities
│   │   └── App.jsx        # Main app component
│   └── package.json
├── Dockerfile             # Production Dockerfile
├── Dockerfile.dev         # Development Dockerfile
├── docker-compose.yml     # Docker Compose configuration
└── package.json
```

## How It Works

1. **Host creates a lobby**:
   - Opens http://localhost:3001
   - Clicks "Create Lobby"
   - Gets a 6-character lobby code (e.g., "50062G")
   - QR code is generated for easy sharing

2. **Players join**:
   - Scan QR code or enter lobby code
   - Enter their name
   - Click "Join"

3. **Gameplay**:
   - Host sees all players with their names and scores
   - Each player's phone shows a button
   - Pressing the button increments their individual score
   - Scores update in real-time on the host screen

4. **Multiple lobbies**:
   - Each lobby is independent
   - Multiple hosts can create separate lobbies simultaneously

## Environment Variables

- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)

## Docker Commands

### Build and run production
```bash
docker-compose up --build
```

### Run in background
```bash
docker-compose up -d
```

### View logs
```bash
docker-compose logs -f
```

### Stop containers
```bash
docker-compose down
```

### Development with hot reload
```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

### Pull and run from Docker Hub
```bash
docker pull kevykibbz/realtime-web-controller:latest
docker run -p 3001:3001 kevykibbz/realtime-web-controller:latest
```

## API Events

### Server Events
- `create-lobby`: Creates a new lobby
- `join-lobby`: Player joins a lobby
- `controller-input`: Player sends button press/release

### Client Events
- `lobby-created`: Lobby ID sent to host
- `join-lobby-success`: Player joined successfully
- `join-lobby-error`: Join failed
- `player-joined`: New player joined
- `player-updated`: Player score updated

## Technologies Used

- **Backend**: Node.js, Express, Socket.IO
- **Frontend**: React 18, Vite, Framer Motion
- **Styling**: Tailwind CSS, shadcn/ui
- **QR Code**: qrcode.react
- **Containerization**: Docker, Docker Compose

## Deployment

### Vercel (Frontend only)
```bash
cd client
npm install -g vercel
vercel
```

### Docker (Full stack)
```bash
docker build -t realtime-controller .
docker run -p 3001:3001 realtime-controller
```

### Railway/Heroku
```bash
# Add Procfile
web: node server.js
```

## Browser Compatibility

- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Mobile browsers: ✅

## License

MIT
