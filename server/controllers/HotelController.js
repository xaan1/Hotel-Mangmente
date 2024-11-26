
import {v2 as cloudinary} from "cloudinary"
import Hotel from "../models/HotelMode.js";



cloudinary.config({
    cloud_name: "dla4m3uru",
    api_key: "941564821489864",
    api_secret: "Sn2rWJwCwSZAQErsETtPpqTS8yc"



  });
export const AddHotelController = async (req, res) => {

    console.log("Cloudinary Config: ", cloudinary.config());

    try {


        const { name, address, pricePerNight, image, amenities, rating, availability } = req.body;

        let ImgFile = req.file
        const imagUpload = await cloudinary.uploader.upload(ImgFile.path  ,{resource_type: "auto"});

        const imgUrl = imagUpload.secure_url;

        console.log(imgUrl);


        // if(!name || !address || !pricePerNight || !image  || !rating){
        //     return res.status(400).json({message: "All fields are required"});
        // }


        const newHotel = new Hotel({
            name,
            address,
            pricePerNight,
            image: imgUrl,
            amenities,
            rating,
            availability
        });


        await newHotel.save();





     

        res.status(201).json({ message: "Hotel added successfully"  , success : true ,newHotel });

    } catch (error) {
        console.log(error);
    }

}





export const getAllHotels = async (req, res) => {
    
        try {
            const hotels = await Hotel.find({});
    
            res.status(200).json({hotels});
    
        } catch (error) {
            console.log(error);
        }
}


// delete hotel


export const deleteHotelOneByid = async (req, res) => {

    console.log(req.params.id);
    try {

      
        const hotel = await Hotel.findByIdAndDelete(req.params.id);



        res.status(200).json({message: "Hotel deleted successfully" , success: true, hotel});

    } catch (error) {
        console.log(error);
    }
}
    



// get One hotel



export const getDetailsHtel =  async (req, res) => {

    try {

        const hotel = await Hotel.findById(req.params.id);


      console.log(hotel , "hotel");

        res.status(200).json({hotel , success: true ,massage : "hotel details"});

      



    }  catch(e){
        console.log(e , "error in dedtails ")
    }

}



// update hotel


export const updateHotel = async (req, res) => {
    try {
      const { name, address, pricePerNight, amenities, rating, availability } = req.body;

      console.log(req.body);
  
      let imgUrl = null;
      if (req.file) {
        const imagUpload = await cloudinary.uploader.upload(req.file.path, {
          resource_type: 'auto',
        });
        imgUrl = imagUpload.secure_url;
      }
  
      const updateData = {
        name,
        address,
        pricePerNight,
        amenities,
        rating,
        availability,
      };
  
      if (imgUrl) {
        updateData.image = imgUrl; // Update the image if a new one is uploaded
      }
  
      const hotel = await Hotel.findByIdAndUpdate(req.params.id, updateData, { new: true });
  
      if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found', success: false });
      }

      hotel.save();
  
      res.status(200).json({ message: 'Hotel updated successfully', success: true, hotel });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error', error });
    }
  };
  