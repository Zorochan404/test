import mongoose from 'mongoose';


const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,

  },
  description: {
    type: String,
    required: [true, 'Description price is required'],
    trim: true,

  },
  image: {
    type: String,
    required: [true, 'Image is required'],
    trim: true,
  },
  
}, { timestamps: true });

const Card = mongoose.model('Card', cardSchema);


export default Card;