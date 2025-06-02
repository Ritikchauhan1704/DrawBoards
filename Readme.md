# DrawBoards

A real-time collaborative whiteboard application built with React, TypeScript, and Socket.IO. DrawBoards provides an intuitive drawing experience with powerful collaboration features, allowing users to create, draw, and collaborate seamlessly in real-time.

## ✨ Features

### Drawing Tools
- **Pencil** - Free-hand drawing and scribbling
- **Shapes** - Rectangle, Circle, Arrow, and Line tools
- **Text** - Add text annotations anywhere on the canvas
- **Cursor** - Select, move, and transform objects
- **Color Picker** - Customize colors for all drawing elements

### Collaboration
- **Real-time Sync** - See changes from other users instantly
- **Room System** - Create or join collaborative sessions
- **Multi-user Support** - Multiple users can work simultaneously
- **Persistent Canvas** - Canvas state is maintained across sessions

### Canvas Features
- **Drag & Drop** - Move objects around the canvas
- **Transform Controls** - Resize and rotate selected objects
- **Image Import** - Add images to your canvas
- **Infinite Canvas** - Full-screen drawing experience
- **Clear Canvas** - Reset the entire canvas when needed

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **TypeScript** - Type safety and better development experience
- **Konva.js & React-Konva** - 2D canvas library for high-performance graphics
- **Zustand** - State management
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js & Express** - Server framework
- **Socket.IO** - Real-time bidirectional communication
- **TypeScript** - Type safety on the backend
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
drawboards/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Canvas/     # Whiteboard components
│   │   │   ├── Panel/      # Tool panel components
│   │   │   └── Collaboration/ # Room management
│   │   ├── store/          # Zustand state management
│   │   ├── socket/         # Socket.IO client setup
│   │   └── types/          # TypeScript type definitions
│   └── package.json
└── server/                 # Backend Node.js application
    ├── src/
    │   ├── app.ts          # Express app configuration
    │   ├── server.ts       # Server entry point
    │   └── types.ts        # Shared type definitions
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/drawboards.git
   cd drawboards
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the server**
   ```bash
   cd server
   npm run dev
   ```
   The server will start on `http://localhost:3000`

2. **Start the client (in a new terminal)**
   ```bash
   cd client
   npm start
   ```
   The client will start on `http://localhost:3001`

3. **Open your browser**
   Navigate to `http://localhost:3001` to start using DrawBoards!

## 🎯 How to Use

### Single User Mode
1. Visit the application
2. Select your drawing tool from the panel
3. Start drawing on the canvas
4. Use the cursor tool to select and move objects

### Collaboration Mode
1. Click "Create Room" to host a session
2. Share the generated Room ID with collaborators
3. Others can join using "Join Room" with the Room ID
4. All changes sync in real-time across all connected users

### Available Tools
- **Cursor** - Select and move objects
- **Pencil** - Free-hand drawing
- **Rectangle** - Draw rectangles
- **Circle** - Draw circles
- **Arrow** - Draw directional arrows
- **Line** - Draw straight lines
- **Text** - Add text annotations
- **Color Picker** - Change drawing colors

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the server directory:
```env
PORT=3000
NODE_ENV=development
```

### Client Configuration
Update the socket connection URL in `client/src/socket/socket.ts` if deploying to production:
```typescript
const socket = io('your-production-server-url');
```

## 🏗️ Architecture

### Real-time Communication
- Uses Socket.IO for bidirectional communication
- Canvas state is synchronized across all connected clients
- Shape updates are broadcast to all users in the same room

### State Management
- Frontend uses Zustand for lightweight state management
- Canvas shapes are stored in a shared array
- Tool selection and UI state managed separately

### Canvas Rendering
- Konva.js provides high-performance 2D rendering
- Each shape type has its own React component
- Transformer tool for object manipulation
