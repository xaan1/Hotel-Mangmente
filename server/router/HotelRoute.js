
import express from 'express';
import upload from '../helper/mutler.js';
import { AddHotelController, deleteHotelOneByid, getAllHotels, getDetailsHtel, updateHotel } from '../controllers/HotelController.js';


const HotelRouter = express.Router();



HotelRouter.post("/addHOtel",  upload.single('image'), AddHotelController)

HotelRouter.get("/allHotels",   getAllHotels)

HotelRouter.delete("/RemoveHotel/:id",   deleteHotelOneByid)


HotelRouter.get("/getOneHotel/:id",   getDetailsHtel)

HotelRouter.put("/updateHotel/:id",     upload.single('image') ,  updateHotel)






export default HotelRouter;