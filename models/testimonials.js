import mongoose from 'mongoose';

const TestimonialsSchema = new mongoose.Schema({
    name: {
    type: String,
    required: [true, 'name is required'],
    trim: true,
  },
  feedback: {
        type: String,
        required: [true, 'by is required'],
        trim: true,
    },
    imageUrl: {
        type: String,
        required: [true, 'by is required'],
        trim: true,
    },
  
}, { timestamps: true });

const Testimonials = mongoose.model('Testimonials', TestimonialsSchema);

export default Testimonials;