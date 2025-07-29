import mongoose from 'mongoose';

const programsSchema = new mongoose.Schema({
    title: {
    type: String,
    required: [true, 'title is required'],
    trim: true,
  },
    by: {
        type: String,
        required: [true, 'by is required'],
        trim: true,
    },
  
}, { timestamps: true });

const Programs = mongoose.model('Programs', programsSchema);

export default Programs;