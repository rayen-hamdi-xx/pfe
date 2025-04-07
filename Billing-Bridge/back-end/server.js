import express from 'express'; // Import express framework
import morgan from 'morgan'; // Import morgan for logging requests
import cookieParser from 'cookie-parser'; // Import cookie-parser for parsing cookies
import authRouter from './routes/auth.route.js'; // Import authentication routes   
import dotenv from 'dotenv';// Import the dotenv package
import { Passport } from 'passport';

// Load environment variables from the .env file
dotenv.config();

// Initialize the app
const app = express();

// Use morgan for logging HTTP requests
app.use(morgan('dev'));
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

// Define a basic route
app.use('/auth', authRouter );
// protected routes
//app.use( ["/payment" , "/invoice" , "/notifications"] );
// Start the server
const PORT = process.env.BACK_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});