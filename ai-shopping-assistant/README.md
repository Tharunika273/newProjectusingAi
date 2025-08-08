# AI-Based Shopping Assistant

A full-stack web application that allows users to search for products, receive AI-generated recommendations, add items to a shopping cart, and checkout. The AI assistant helps users find products and answers queries in a chat-like interface.

## Features
- Product search and listing
- AI-powered product recommendations (OpenAI API)
- Shopping cart and checkout
- Chat interface with AI assistant
- Responsive, modern UI (React, Tailwind CSS, Framer Motion)
- MongoDB for data storage

## Tech Stack
- **Frontend:** React, Tailwind CSS, Framer Motion, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **AI:** OpenAI API

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB (local or Atlas)
- OpenAI API key

### 1. Clone the Repository
```bash
git clone <repo-url>
cd ai-shopping-assistant
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env to set your MongoDB URI and OpenAI API key
npm install
# Seed the database with sample products
node seed/seedProducts.js
# Start the backend server
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
cp .env.example .env
# Edit .env if needed (set backend API URL)
npm install
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000) and the backend on [http://localhost:5000](http://localhost:5000).

---

## Folder Structure

```
ai-shopping-assistant/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   ├── seed/
│   ├── index.js
│   ├── .env.example
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   ├── .env.example
│   └── ...
└── README.md
```

---

## Deployment
- Set environment variables in production for both frontend and backend.
- Use services like Heroku, Vercel, or Netlify for deployment.
- For MongoDB, use MongoDB Atlas or another managed service.

---

## License
MIT