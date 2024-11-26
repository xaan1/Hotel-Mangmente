
import express from 'express';
import userRouter from './router/userRouter.js';
import mongoose from 'mongoose';

import cors  from 'cors';
import HotelRouter from './router/HotelRoute.js';

const app = express();




app.get('/', (req, res) => {
    res.send('hotel  managmente system!');
})




app.use(cors())



// middleware

app.use(express.json())





// database connection


mongoose.connect('mongodb+srv://aasiyomaxmedapdi:RxiBOpzZ8w9S9xE9@cluster0.go6gg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log(err);
})


// routers

app.use('/api/users',    userRouter)

app.use('/api/hotels',    HotelRouter)




app.listen(3000, () => {
    console.log('Server is running on port 3000');
})