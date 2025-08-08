# AI-Based Shopping Assistant

A full-stack e-commerce web app with an AI-powered shopping assistant.

## Features
- Product search and recommendations
- AI chat assistant (OpenAI-powered)
- Shopping cart and checkout
- Responsive, modern UI (React, Tailwind CSS, Framer Motion)

## Tech Stack
- **Frontend:** React, Tailwind CSS, Framer Motion, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose, OpenAI API

## Setup Instructions

### 1. Clone the repository
```
git clone <repo-url>
cd ai-shopping-assistant
```

### 2. Backend Setup
```
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and OpenAI API key
npm install
npm run seed # (optional) to seed products
npm run dev
```

### 3. Frontend Setup
```
cd ../frontend
npm install
npm start
```

### 4. Access the App
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Deployment
- Configure environment variables in production
- Use `npm run build` in frontend for static build
- Use process manager (e.g., PM2) for backend

## Folder Structure
```
ai-shopping-assistant/
  backend/
    models/
    routes/
    controllers/
    config/
    seed/
    server.js
    .env.example
  frontend/
    src/
      pages/
      components/
    tailwind.config.js
    package.json
```

## License
MIT