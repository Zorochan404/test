import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
    {
        // Basic User Information
        
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        applicationId: { type: String, unique: true },

        // Admission Form Reference
        admissionFormId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admission'
        },

        // Payment Information Reference
        paymentInformation: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PaymentInformation'
        }],

        // Session Management
        sessionToken: { type: String },
        sessionExpiresAt: { type: Date },

        // Account Status
        isActive: { type: Boolean, default: true },
        isVerified: { type: Boolean, default: false },
        verificationToken: { type: String },
        verificationExpiresAt: { type: Date },

        // Timestamps
        lastLoginAt: { type: Date },
        passwordChangedAt: { type: Date }
    },
    { timestamps: true }
);

// Pre-save middleware to hash password and generate applicationId
UserSchema.pre('save', async function (next) {
    // Generate applicationId if not exists
    if (!this.applicationId) {
        const year = new Date().getFullYear();
        const count = await mongoose.model('User').countDocuments();
        this.applicationId = `APP${year}${String(count + 1).padStart(3, '0')}`;
    }

    // Hash password if modified
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.passwordChangedAt = new Date();
    }

    next();
});

// Instance method to compare password
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to generate session token
UserSchema.methods.generateSessionToken = function () {
    const token = `session_${Date.now()}_${this._id}`;
    this.sessionToken = token;
    this.sessionExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    this.lastLoginAt = new Date();
    return token;
};

// Instance method to validate session token
UserSchema.methods.isSessionValid = function () {
    return this.sessionToken && this.sessionExpiresAt && this.sessionExpiresAt > new Date();
};

// Static method to find user by session token
UserSchema.statics.findBySessionToken = function (token) {
    return this.findOne({
        sessionToken: token,
        sessionExpiresAt: { $gt: new Date() }
    });
};

const User = mongoose.model("User", UserSchema);
export default User; 