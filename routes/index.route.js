const express=require('express')
const routes=express.Router()
const book_route=require('./bookRoutes')
const user_route=require('./userRoutes')

routes.use('/api',book_route);
routes.use('/api',user_route);

module.exports=routes