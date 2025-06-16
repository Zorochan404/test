import Course from "../models/course.js";

// Main Course CRUD Operations
export const createCourse = async (req, res, next) => {
    try {
        const newCourse = await Course.create({ ...req.body });

        res.status(201).json({ success: true, data: newCourse });
    } catch (e) {
        next(e);
    }
};

export const getCourses = async (req, res, next) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: courses });
    } catch (e) {
        next(e);
    }
};

export const getActiveCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({ isActive: true }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: courses });
    } catch (e) {
        next(e);
    }
};

export const getCourseById = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        res.status(200).json({ success: true, data: course });
    } catch (e) {
        next(e);
    }
};

export const getCourseBySlug = async (req, res, next) => {
    try {
        const course = await Course.findOne({ slug: req.params.slug });

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        res.status(200).json({ success: true, data: course });
    } catch (e) {
        next(e);
    }
};

export const updateCourseById = async (req, res, next) => {
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        res.status(200).json({ success: true, data: course });
    } catch (e) {
        next(e);
    }
};

export const deleteCourseById = async (req, res, next) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        res.status(200).json({ success: true, message: "Course deleted successfully" });
    } catch (e) {
        next(e);
    }
};

export const toggleCourseStatus = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        course.isActive = !course.isActive;
        await course.save();

        res.status(200).json({ 
            success: true, 
            data: course,
            message: `Course ${course.isActive ? 'activated' : 'deactivated'} successfully`
        });
    } catch (e) {
        next(e);
    }
};

// Course Program Operations
export const addCourseProgram = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        course.programs.push(req.body);
        await course.save();

        const addedProgram = course.programs[course.programs.length - 1];
        res.status(201).json({ success: true, data: addedProgram });
    } catch (e) {
        next(e);
    }
};

export const updateCourseProgram = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        const program = course.programs.id(req.params.programId);
        if (!program) {
            return res.status(404).json({ success: false, message: "Program not found" });
        }

        Object.assign(program, req.body);
        await course.save();

        res.status(200).json({ success: true, data: program });
    } catch (e) {
        next(e);
    }
};

export const deleteCourseProgram = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        const program = course.programs.id(req.params.programId);
        if (!program) {
            return res.status(404).json({ success: false, message: "Program not found" });
        }

        course.programs.pull(req.params.programId);
        await course.save();

        res.status(200).json({ success: true, message: "Program deleted successfully" });
    } catch (e) {
        next(e);
    }
};

// Course Feature Operations
export const addCourseFeature = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        course.features.push(req.body);
        await course.save();

        const addedFeature = course.features[course.features.length - 1];
        res.status(201).json({ success: true, data: addedFeature });
    } catch (e) {
        next(e);
    }
};

export const updateCourseFeature = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        const feature = course.features.id(req.params.featureId);
        if (!feature) {
            return res.status(404).json({ success: false, message: "Feature not found" });
        }

        Object.assign(feature, req.body);
        await course.save();

        res.status(200).json({ success: true, data: feature });
    } catch (e) {
        next(e);
    }
};

export const deleteCourseFeature = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        const feature = course.features.id(req.params.featureId);
        if (!feature) {
            return res.status(404).json({ success: false, message: "Feature not found" });
        }

        course.features.pull(req.params.featureId);
        await course.save();

        res.status(200).json({ success: true, message: "Feature deleted successfully" });
    } catch (e) {
        next(e);
    }
};

// Course Testimonial Operations
export const addCourseTestimonial = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        course.testimonials.push(req.body);
        await course.save();

        const addedTestimonial = course.testimonials[course.testimonials.length - 1];
        res.status(201).json({ success: true, data: addedTestimonial });
    } catch (e) {
        next(e);
    }
};

export const updateCourseTestimonial = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        const testimonial = course.testimonials.id(req.params.testimonialId);
        if (!testimonial) {
            return res.status(404).json({ success: false, message: "Testimonial not found" });
        }

        Object.assign(testimonial, req.body);
        await course.save();

        res.status(200).json({ success: true, data: testimonial });
    } catch (e) {
        next(e);
    }
};

export const deleteCourseTestimonial = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        const testimonial = course.testimonials.id(req.params.testimonialId);
        if (!testimonial) {
            return res.status(404).json({ success: false, message: "Testimonial not found" });
        }

        course.testimonials.pull(req.params.testimonialId);
        await course.save();

        res.status(200).json({ success: true, message: "Testimonial deleted successfully" });
    } catch (e) {
        next(e);
    }
};

// Course FAQ Operations
export const addCourseFAQ = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        course.faqs.push(req.body);
        await course.save();

        const addedFAQ = course.faqs[course.faqs.length - 1];
        res.status(201).json({ success: true, data: addedFAQ });
    } catch (e) {
        next(e);
    }
};

export const updateCourseFAQ = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        const faq = course.faqs.id(req.params.faqId);
        if (!faq) {
            return res.status(404).json({ success: false, message: "FAQ not found" });
        }

        Object.assign(faq, req.body);
        await course.save();

        res.status(200).json({ success: true, data: faq });
    } catch (e) {
        next(e);
    }
};

export const deleteCourseFAQ = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        const faq = course.faqs.id(req.params.faqId);
        if (!faq) {
            return res.status(404).json({ success: false, message: "FAQ not found" });
        }

        course.faqs.pull(req.params.faqId);
        await course.save();

        res.status(200).json({ success: true, message: "FAQ deleted successfully" });
    } catch (e) {
        next(e);
    }
};

// Course Curriculum Operations
export const addCourseCurriculum = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        course.curriculum.push(req.body);
        await course.save();

        const addedCurriculum = course.curriculum[course.curriculum.length - 1];
        res.status(201).json({ success: true, data: addedCurriculum });
    } catch (e) {
        next(e);
    }
};

export const updateCourseCurriculum = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        const curriculum = course.curriculum.id(req.params.curriculumId);
        if (!curriculum) {
            return res.status(404).json({ success: false, message: "Curriculum not found" });
        }

        Object.assign(curriculum, req.body);
        await course.save();

        res.status(200).json({ success: true, data: curriculum });
    } catch (e) {
        next(e);
    }
};

export const deleteCourseCurriculum = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        const curriculum = course.curriculum.id(req.params.curriculumId);
        if (!curriculum) {
            return res.status(404).json({ success: false, message: "Curriculum not found" });
        }

        course.curriculum.pull(req.params.curriculumId);
        await course.save();

        res.status(200).json({ success: true, message: "Curriculum deleted successfully" });
    } catch (e) {
        next(e);
    }
};

// Course Software Operations
export const addCourseSoftware = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        course.software.push(req.body);
        await course.save();

        const addedSoftware = course.software[course.software.length - 1];
        res.status(201).json({ success: true, data: addedSoftware });
    } catch (e) {
        next(e);
    }
};

export const updateCourseSoftware = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        const software = course.software.id(req.params.softwareId);
        if (!software) {
            return res.status(404).json({ success: false, message: "Software not found" });
        }

        Object.assign(software, req.body);
        await course.save();

        res.status(200).json({ success: true, data: software });
    } catch (e) {
        next(e);
    }
};

export const deleteCourseSoftware = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        const software = course.software.id(req.params.softwareId);
        if (!software) {
            return res.status(404).json({ success: false, message: "Software not found" });
        }

        course.software.pull(req.params.softwareId);
        await course.save();

        res.status(200).json({ success: true, message: "Software deleted successfully" });
    } catch (e) {
        next(e);
    }
};

// Course Career Prospect Operations
export const addCourseCareerProspect = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        course.careerProspects.push(req.body);
        await course.save();

        const addedCareerProspect = course.careerProspects[course.careerProspects.length - 1];
        res.status(201).json({ success: true, data: addedCareerProspect });
    } catch (e) {
        next(e);
    }
};

export const updateCourseCareerProspect = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        const careerProspect = course.careerProspects.id(req.params.careerProspectId);
        if (!careerProspect) {
            return res.status(404).json({ success: false, message: "Career prospect not found" });
        }

        Object.assign(careerProspect, req.body);
        await course.save();

        res.status(200).json({ success: true, data: careerProspect });
    } catch (e) {
        next(e);
    }
};

export const deleteCourseCareerProspect = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        const careerProspect = course.careerProspects.id(req.params.careerProspectId);
        if (!careerProspect) {
            return res.status(404).json({ success: false, message: "Career prospect not found" });
        }

        course.careerProspects.pull(req.params.careerProspectId);
        await course.save();

        res.status(200).json({ success: true, message: "Career prospect deleted successfully" });
    } catch (e) {
        next(e);
    }
};
