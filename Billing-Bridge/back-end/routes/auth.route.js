import express from 'express';
import {ObtainJwt} from '../controllers/auth.controller.js'; // Import the login controller


const authRouter = express.Router();

// callback route for testing
authRouter.get('/callback', ObtainJwt );



export default authRouter;