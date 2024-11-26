





import { v2 as cloudinary } from "cloudinary";


const cloudinaryConfig = () => {
 

    
cloudinary.config({
    cloud_name: "dla4m3uru",
    api_key: "941564821489864",
    api_secret: "Sn2rWJwCwSZAQErsETtPpqTS8yc"



  });

}

console.log("Cloudinary Config: ", cloudinary.config());



export default cloudinaryConfig;


