import mongoose from "mongoose";

const AdmissionSchema = new mongoose.Schema(
    {
        // User Reference
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status: {
            type: String,
            // enum: ['pending', 'enrolled', 'rejected'],
            default: 'pending'
        },
        // Personal Information
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String },
        phone: { type: String },
        dateOfBirth: { type: Date },
        gender: { type: String },
        religion: { type: String },
        aadharNumber: { type: String },
        permanentAddress: { type: String },
        temporaryAddress: { type: String },
        city: { type: String },
        state: { type: String },
        pincode: { type: String },

        // Guardian Details
        fathersName: { type: String },
        fathersPhone: { type: String },
        fathersOccupation: { type: String },
        fathersQualification: { type: String },
        mothersName: { type: String },
        mothersPhone: { type: String },
        mothersOccupation: { type: String },
        mothersQualification: { type: String },
        parentsAnnualIncome: { type: Number },
        parentsAddress: { type: String },

        // Local Guardian Details
        localGuardianName: { type: String },
        localGuardianPhone: { type: String },
        localGuardianOccupation: { type: String },
        localGuardianRelation: { type: String },
        localGuardianAddress: { type: String },

        // Academic Details
        tenthBoard: { type: String },
        tenthInstitution: { type: String },
        tenthStream: { type: String },
        tenthPercentage: { type: String },
        tenthYear: { type: String },
        twelfthBoard: { type: String },
        twelfthInstitution: { type: String },
        twelfthStream: { type: String },
        twelfthPercentage: { type: String },
        twelfthYear: { type: String },
        diplomaInstitution: { type: String },
        diplomaStream: { type: String },
        diplomaPercentage: { type: String },
        diplomaYear: { type: String },
        graduationUniversity: { type: String },
        graduationPercentage: { type: String },
        graduationYear: { type: String },

        // Program Selection
        programType: { type: String },
        programName: { type: String },
        programCategory: { type: String },
        specialization: { type: String },
        campus: { type: String },

        // Application Details
        applicationId: { type: String, unique: true },
        submittedAt: { type: Date, default: Date.now },
        paymentComplete: { type: Boolean, default: false },
        paymentDetails: { type: mongoose.Schema.Types.Mixed },

        // Documents (file names only)
        documents: {
            profilePhoto: { type: String },
            signature: { type: String },
            aadharCard: { type: String },
            tenthMarksheet: { type: String },
            twelfthMarksheet: { type: String },
            diplomaMarksheet: { type: String },
            graduationMarksheet: { type: String },
            randomDocuments: [{ type: String }]
        },

        // Legacy fields for backward compatibility
        studentName: { type: String }, // Will be computed from firstName + lastName
        fatherName: { type: String }, // Legacy field
        fatherPhone: { type: String }, // Legacy field
        fatherOccupation: { type: String }, // Legacy field
        fatherQualification: { type: String }, // Legacy field
        motherName: { type: String }, // Legacy field
        motherPhone: { type: String }, // Legacy field
        motherOccupation: { type: String }, // Legacy field
        motherQualification: { type: String }, // Legacy field
        profilePhoto: { type: String }, // Legacy field
        signature: { type: String }, // Legacy field
        aadharCard: { type: String }, // Legacy field
        tenthMarksheet: { type: String }, // Legacy field
        twelfthMarksheet: { type: String }, // Legacy field
        diplomaMarksheet: { type: String }, // Legacy field
        graduationMarksheet: { type: String }, // Legacy field
        paymentStatus: { type: String, enum: ['completed', 'pending'], default: 'pending' },
        applicationStatus: { type: String, enum: ['enrolled', 'pending', 'rejected'], default: 'pending' },
        amount: { type: Number },
        razorpayOrderId: { type: String },
        razorpayPaymentId: { type: String },
    },
    { timestamps: true }
);

// Pre-save middleware to generate applicationId and set legacy fields
AdmissionSchema.pre('save', async function (next) {
    if (this.isNew) {
        // Generate a unique application ID
        this.applicationId = `APP${Date.now()}`;
    }
    
    // Set legacy fields for backward compatibility
    if (this.firstName && this.lastName) {
        this.studentName = `${this.firstName} ${this.lastName}`;
    }
    
    // Map new field names to legacy field names
    if (this.fathersName) this.fatherName = this.fathersName;
    if (this.fathersPhone) this.fatherPhone = this.fathersPhone;
    if (this.fathersOccupation) this.fatherOccupation = this.fathersOccupation;
    if (this.fathersQualification) this.fatherQualification = this.fathersQualification;
    if (this.mothersName) this.motherName = this.mothersName;
    if (this.mothersPhone) this.motherPhone = this.mothersPhone;
    if (this.mothersOccupation) this.motherOccupation = this.mothersOccupation;
    if (this.mothersQualification) this.motherQualification = this.mothersQualification;
    
    // Map document fields
    if (this.documents) {
        if (this.documents.profilePhoto) this.profilePhoto = this.documents.profilePhoto;
        if (this.documents.signature) this.signature = this.documents.signature;
        if (this.documents.aadharCard) this.aadharCard = this.documents.aadharCard;
        if (this.documents.tenthMarksheet) this.tenthMarksheet = this.documents.tenthMarksheet;
        if (this.documents.twelfthMarksheet) this.twelfthMarksheet = this.documents.twelfthMarksheet;
        if (this.documents.diplomaMarksheet) this.diplomaMarksheet = this.documents.diplomaMarksheet;
        if (this.documents.graduationMarksheet) this.graduationMarksheet = this.documents.graduationMarksheet;
    }
    
    // Map payment status
    if (this.paymentComplete !== undefined) {
        this.paymentStatus = this.paymentComplete ? 'completed' : 'pending';
    }
    
    next();
});

// Indexes for better query performance
AdmissionSchema.index({ userId: 1 });
AdmissionSchema.index({ applicationId: 1 });
AdmissionSchema.index({ email: 1 });
AdmissionSchema.index({ phone: 1 });
AdmissionSchema.index({ submittedAt: -1 });

const Admission = mongoose.model("Admission", AdmissionSchema);
export default Admission; 