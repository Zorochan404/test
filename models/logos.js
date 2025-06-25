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

  },
  
}, { timestamps: true });

const Logo = mongoose.model('Logo', logoSchema);


export default Logo;