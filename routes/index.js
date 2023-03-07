import express from 'express';
import book_route from './bookRoutes.js';
import user_route from './userRoutes.js';
const routes=express.Router()

routes.use('/api',book_route);
routes.use('/api',user_route);

export default routes