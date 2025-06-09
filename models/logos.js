import mongoose from 'mongoose';


const logoSchema = new mongoose.Schema({
    src: {
    type: String,
    required: [true, 'image src is required'],
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'name is required'],
    trim: true,
    minLength: 2, 
    maxLength: 100,
  },
  
}, { timestamps: true });

const Logo = mongoose.model('Logo', logoSchema);


export default Logo;