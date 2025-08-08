# AI-Based Shopping Assistant

A full-stack e-commerce demo that combines a React + Tailwind CSS frontend with a Node.js / Express / MongoDB backend and an OpenAI-powered shopping assistant.

## Features

• Product browsing & search
• Shopping cart and simulated checkout
• Conversational AI assistant that recommends products
• Responsive, animated UI (Tailwind CSS + Framer Motion)

## Tech Stack

Frontend: React 18, Vite, Tailwind CSS, Framer Motion, Axios, React Router
Backend: Node.js, Express, MongoDB, Mongoose, OpenAI SDK

## Prerequisites

1. **Node.js** ≥ 18
2. **MongoDB** running locally or in the cloud
3. **OpenAI API Key** (or replace with another provider)

## Getting Started

### 1. Clone & install

```bash
# clone
git clone <repo-url>
cd ai-shopping-assistant

# install backend deps
cd server
npm install

# install frontend deps
cd ../client
npm install
```

### 2. Environment variables

Create a `.env` file in the `server` directory based on `.env.example`:

```bash
cp ../.env.example server/.env
# then edit the values
```

### 3. Seed the database

```bash
cd server
npm run seed
```

### 4. Run the development servers

Open two terminals and run:

```bash
# Terminal 1 – backend
cd server
npm run dev

# Terminal 2 – frontend
cd client
npm run dev
```

Navigate to `http://localhost:3000` in your browser.

## Production Build

1. Build the React app:
   ```bash
   cd client
   npm run build
   ```
2. Serve the backend (e.g., on Render, Heroku, or your own server) and configure it to also serve the static files from `client/dist`.

## Project Structure

```
.
├── client/        # React frontend (Vite)
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
├── server/        # Express backend
│   ├── models/
│   ├── routes/
│   └── seed/
├── .env.example
└── README.md
```

## Demo User Handling

For demo purposes, the frontend generates a random `userId` and stores it in `localStorage`. The backend accepts this string ID and creates a user record on-the-fly when items are added to the cart.

## License

MIT