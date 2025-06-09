import mongoose from 'mongoose';


const membershipSchema = new mongoose.Schema({
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

const Membership = mongoose.model('Membership', membershipSchema);


export default Membership;