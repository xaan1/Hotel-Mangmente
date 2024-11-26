
import express from 'express';
import { cancleUserBooking, getAppointUser, getProfile, HotelBooking, LoginUser, RegitarsUser, updateProfile } from '../controllers/userController.js';
import { isAuth } from '../middleweres/isAuth.js';



const userRouter = express.Router();





userRouter.post('/signup',   RegitarsUser)

userRouter.post('/LoginUser',   LoginUser)


userRouter.get('/',  isAuth ,  (req, res) => {
    res.send('user router');
})



userRouter.get('/profileUser',  isAuth ,  getProfile)

userRouter.put('/updateProfile',  isAuth ,  updateProfile)


userRouter.post('/hotelBooking',  isAuth ,  HotelBooking)

userRouter.get('/userbooking',  isAuth ,  getAppointUser)

userRouter.put('/canceluserbooking',  isAuth ,  cancleUserBooking)








export default userRouter;