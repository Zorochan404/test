import {Router} from 'express';
import { createTestimonials, deleteTestimonialsById, getTestimonialById, getTestimonials, updateTestimonialsById } from '../../controllers/webdata/testimonialController.js';

const TestimonialsRouter = Router();

TestimonialsRouter.post('/addtestimonials', createTestimonials)

TestimonialsRouter.get('/gettestimonials', getTestimonials)

TestimonialsRouter.get('/gettestimonialsbyid/:id', getTestimonialById)

TestimonialsRouter.put('/updatetestimonials/:id', updateTestimonialsById)

TestimonialsRouter.delete('/deletetestimonials/:id', deleteTestimonialsById)

export default TestimonialsRouter;