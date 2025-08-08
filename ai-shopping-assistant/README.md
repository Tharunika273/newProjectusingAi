# AI-Based Shopping Assistant

A complete full-stack e-commerce application powered by AI that provides intelligent product recommendations, smart search capabilities, and conversational shopping assistance.

## 🚀 Features

### Frontend (React)
- **Beautiful & Responsive UI** built with Tailwind CSS
- **Smooth Animations** using Framer Motion
- **Modern React Architecture** with hooks and functional components
- **Intelligent Product Search** with filters and pagination
- **Interactive Shopping Cart** with quantity management
- **AI Chat Interface** for conversational product recommendations
- **Mobile-First Design** that works on all devices

### Backend (Node.js + Express)
- **RESTful API** with Express.js
- **MongoDB Integration** with Mongoose ODM
- **AI-Powered Recommendations** using OpenAI API
- **Smart Product Search** with text indexing
- **Session-Based Cart Management**
- **Order Processing & Checkout**
- **Comprehensive Error Handling**

### AI Assistant Features
- **Natural Language Processing** for product queries
- **Contextual Product Recommendations** based on user needs
- **Conversational Interface** that feels natural and helpful
- **Smart Search Integration** with the product database
- **Fallback Handling** when AI services are unavailable

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Heroicons** - Beautiful SVG icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **OpenAI API** - AI/ML capabilities
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
ai-shopping-assistant/
├── backend/                 # Node.js/Express backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── scripts/           # Database seeding
│   ├── .env.example       # Environment variables template
│   ├── package.json       # Backend dependencies
│   └── server.js          # Express server
├── frontend/               # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React context for state management
│   │   ├── pages/         # Main application pages
│   │   ├── services/      # API service functions
│   │   ├── utils/         # Helper functions
│   │   ├── App.js         # Main App component
│   │   └── index.css      # Global styles
│   ├── .env.example       # Environment variables template
│   ├── package.json       # Frontend dependencies
│   └── tailwind.config.js # Tailwind configuration
└── README.md              # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or cloud instance)
- **OpenAI API Key** (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-shopping-assistant
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   
   # Copy environment template and configure
   cp .env.example .env
   # Edit .env file with your configuration
   ```

3. **Set up the Frontend**
   ```bash
   cd ../frontend
   npm install
   
   # Copy environment template
   cp .env.example .env
   # Edit .env file if needed
   ```

### Environment Configuration

#### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/ai-shopping-assistant

# Frontend Configuration
FRONTEND_URL=http://localhost:3000

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
```

#### Frontend (.env)
```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api
```

### Database Setup

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Seed the Database** with sample products
   ```bash
   cd backend
   npm run seed
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The API will be available at `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   The app will be available at `http://localhost:3000`

## 📱 Usage

### Home Page
- Browse featured products
- Navigate by category
- Access the AI assistant
- View promotional content

### Product Search
- Search products by name, description, or tags
- Filter by category and price range
- Paginated results with smooth loading
- Add products directly to cart

### Shopping Cart
- View cart items with images and details
- Update quantities or remove items
- See real-time price calculations
- Complete checkout with shipping information

### AI Assistant
- Ask natural language questions about products
- Get personalized recommendations
- View suggested products inline
- Add recommended items to cart instantly

## 🔧 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/search?q=query` - Search products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/categories` - Get all categories
- `GET /api/products/:id` - Get product by ID

### Cart
- `GET /api/cart?sessionId=id` - Get cart contents
- `POST /api/cart` - Add item to cart
- `PUT /api/cart` - Update cart item
- `DELETE /api/cart` - Remove cart item
- `POST /api/cart/checkout` - Process checkout

### AI Assistant
- `POST /api/ai-assistant` - Chat with AI assistant

## 🎨 Key Components

### Frontend Components
- **Header** - Navigation with cart icon and search
- **Footer** - Site links and information
- **ProductCard** - Reusable product display component
- **Toast** - Notification system
- **ErrorBoundary** - Error handling component

### Backend Models
- **Product** - Product information and inventory
- **User** - User profiles and cart data
- **Order** - Order history and details

## 🔒 Security Features
- **Input validation** and sanitization
- **Error boundary** components for graceful error handling
- **CORS configuration** for secure cross-origin requests
- **Environment variable** protection for sensitive data

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB in production
2. Configure environment variables
3. Deploy to your preferred platform (Heroku, AWS, etc.)

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy to static hosting (Netlify, Vercel, etc.)
3. Update API URL in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔮 Future Enhancements

- **User Authentication** - Login/register functionality
- **Wishlist Feature** - Save products for later
- **Order History** - Track past purchases
- **Product Reviews** - User-generated content
- **Advanced AI Features** - Visual search, price prediction
- **Multi-language Support** - Internationalization
- **Payment Integration** - Real payment processing
- **Admin Dashboard** - Product and order management

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in .env file

2. **OpenAI API Errors**
   - Verify API key is correct
   - Check API quota and billing
   - Fallback responses are shown when AI is unavailable

3. **Port Conflicts**
   - Backend default: 5000
   - Frontend default: 3000
   - Change ports in configuration if needed

4. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility

## 📞 Support

For questions or support, please create an issue in the repository or contact the development team.

---

**Built with ❤️ using modern web technologies**