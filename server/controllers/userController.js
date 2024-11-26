

import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

import jwt from 'jsonwebtoken'
import Hotel from "../models/HotelMode.js";
import appointmentModel from "../models/BookingModel.js";




export const RegitarsUser = async (req, res) => {
  

    try {

        const { name, email, password, isAdmin } = req.body;

        if(!name || !email || !password ) {
            return res.status(400).json({message: 'All fields are required'})
        }


        const existUser = await userModel.findOne({email})


        if(existUser) {
            return res.status(400).json({message: 'User already exist'})
        }


        const hashPassword = await bcrypt.hash(password, 10)


        const user = new userModel({
            name,
            email,
            password: hashPassword,
        })


        await user.save()


        res.status(201).json({message: 'User created successfully'  , success: true  ,user})


    }  catch(error) {
        console.log(error)
    }

 
    


}




export const LoginUser = async (req, res) => {


    try {

        const { email, password } = req.body;


        if(!email || !password) {
            return res.status(400).json({message: 'All fields are required'})
        }


        const existUser = await userModel.findOne({email})



        if(!existUser) {
            return res.status(400).json({message: 'User not found'})
        }


        const isPasswordCorrect = await bcrypt.compare(password, existUser.password)


        if(!isPasswordCorrect) {
            return res.status(400).json({message: 'Invalid credentials'})
        }


        const token = jwt.sign({ id: existUser._id}, 'userSecret', {expiresIn: '24h'})


        res.status(200).json({message: 'User logged in successfully', success: true, token})










    }  catch(error) {
        console.log(error)
    }
 
}



//  getProfile 



export const getProfile = async (req, res) => {

    try {

        const {userId} = req.body
        console.log(userId, "userid")

        const user = await userModel.findById(userId)


        if(!user){
            return res.status(400).json({message: "User does not exist"})
        }


        res.status(200).json({message: "User profile" , success : true , user})
            
        
    }  catch(error) {
        console.log(error)
    }
}




//  updateProfile


export const updateProfile = async (req, res) => {
    
        try {
    
            const {userId} = req.body

            console.log(userId, "userid")
    
            const user = await userModel.findById(userId)

            if(!user){
                return res.status(400).json({message: "User does not exist"})
            }



            const updatedUser = await userModel.findByIdAndUpdate(userId, req.body, {new: true})

            res.status(200).json({message: "User profile updated" , success : true , updatedUser})

            }catch(error) {
                console.log(error)
            }
}








// HotelBooking


export const HotelBooking = async (req, res) => {

    try {
            
          

            const { userId, hotelId, slotDate, slotTime } = req.body;

            const HotelData = await Hotel.findById(hotelId);

            if(!HotelData.availability) {
                return res.status(400).json({message: "Hotel does not exist"})
            }


            let slot_booked = HotelData. slot_booked;

            console.log(slot_booked, "slot_booked")

            console.log(slot_booked[slotDate], "slotDate")


            if (slot_booked[slotDate]) {
                if (slot_booked[slotDate].includes(slotTime)) {
                    return res.status(400).json({ message: "Slot already booked", success: false });
                } else {
                    slot_booked[slotDate].push(slotTime);
                }
            } else {
                slot_booked[slotDate] = [];
                slot_booked[slotDate].push(slotTime);
            }


            let userData = await userModel.findById(userId);

            delete HotelData.slot_booked;


            const [day, month, year] = slotDate.split('-');
            const formattedDate = new Date(`${year}-${month}-${day}`);


            const booking = {
                userId,
                hotelId,
                slotDate: formattedDate,
                slotTime,
                userData,
                hotelData: HotelData,
                amount: HotelData.pricePerNight,
                date: new Date(),
            };
    

            const bookingData = new appointmentModel(booking);


            await bookingData.save();

            await Hotel.findByIdAndUpdate(hotelId, {
                slot_booked,
            });


            res.status(200).json({ message: "Booking successful", success: true, bookingData });
    
           
    } catch (error) {
        console.log(error)
    }

}


// getAppointUser



export const getAppointUser = async (req, res) => {

    try {
            
            const {userId} = req.body
            console.log(userId, "userid appointmentModel")
    
            const bookingData = await appointmentModel.find({ userId });

        


            if(!bookingData){
                return res.status(400).json({message: "Booking does not exist"})
            }


            res.status(200).json({message: "Booking user" , success : true , bookingData})
    } catch(error) {
        console.log(error)
    }
}



// cancleUserBooking



export const cancleUserBooking = async (req, res) => {

    try {
            
        const { appointmentId, userId } = req.body;
  
        const appointment = await appointmentModel.findById(appointmentId);

        if (appointment.userId.toString() !== userId) {
            return res.status(400).json({ message: "You are not the owner of the appointment" });
          }


        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

         // Releasing doctor slot
      const { hotelId, slotDate, slotTime } = appointment;


      const doctorData = await Hotel.findById(hotelId);

      console.log(doctorData, "hotelId in cancel appointment");
  
      if (!doctorData) {
        return res.status(404).json({ message: "hotelId not found", success: false });
      }
  
      console.log(doctorData, "hotelId in cancel appointment");
  
      let slot_booked = doctorData.slot_booked;
  
      // Ensure slotDate exists in slot_booked and is an array
      if (slot_booked[slotDate] && Array.isArray(slot_booked[slotDate])) {
        slot_booked[slotDate] = slot_booked[slotDate].filter((slot) => slot !== slotTime);
      } else {
        console.warn(`Slot date ${slotDate} not found in doctor's schedule.`);
      }
  
      await Hotel.findByIdAndUpdate(hotelId, {
        slot_booked
      });
  
      res.status(200).json({ message: "Appointment cancelled successfully", success: true });



    } catch(error) {
        console.log(error)
    }
}