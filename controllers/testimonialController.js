import Testimonials from "../models/testimonials.js";

export const createTestimonials = async (req, res, next) => {
    try {
        const newTestimonials = await Testimonials.create({ ...req.body });

        res.status(201).json({ success: true, data: newTestimonials });
    } catch (e) {
        next(e);
    }
};

export const getTestimonials = async (req, res, next) => {
    try {
        const Testimonialss = await Testimonials.find();
        res.status(200).json({ success: true, data: Testimonialss });
    } catch (e) {
        next(e);
   }
};


export const getTestimonialById = async (req, res, next) => {
    try {
        const testimonal = await Testimonials.findById(req.params.id);

        if (!testimonal) {
            return res.status(404).json({ success: false, message: "Testimonial not found" });
        }

        res.status(200).json({ success: true, data: testimonal });
    } catch (e) {
        next(e);
    }
};

export const updateTestimonialsById = async (req, res, next) => {
    try {
        const updatedTestimonials = await Testimonials.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        ); 

        if (!updatedTestimonials) {
            return res.status(404).json({ success: false, message: "Testimonials not found" });
        }

        res.status(200).json({ success: true, data: updatedTestimonials });
    } catch (e) {
        next(e);
    }
};

export const deleteTestimonialsById = async (req, res, next) => {
    try {
        const deletedTestimonials = await Testimonials.findByIdAndDelete(req.params.id);

        if (!deletedTestimonials) {
            return res.status(404).json({ success: false, message: "Testimonials not found" });
        }

        res.status(200).json({ success: true, message: "Testimonials deleted successfully" });
    } catch (e) {
        next(e);
    }
};