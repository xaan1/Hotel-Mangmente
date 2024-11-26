
import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false, // Haddii sawirka la dooranayo
    },
    amenities: {
      type: [String], // Liis waxyaabaha hotelku bixiyo
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5, // Qiimeynta ugu sareysa waa 5
    },
    availability: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

    date : {
      type: Date,
      default: Date.now

  },

  slot_booked : {
      type: Object,
      default: {}
  }
  },
  { timestamps: true } // Si loo daro createdAt iyo updatedAt otomaatig ah
);

const Hotel = mongoose.model("Hotel", HotelSchema);

export default Hotel;
