import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    resource: { type: String, required: true }, // e.g., 'admissions', 'courses'
    action: { type: String, required: true }, // e.g., 'read', 'write', 'delete'
    section: { type: String, required: true }, // e.g., 'admissions-management'
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
  });


  const Permission = mongoose.model('Permission', permissionSchema);

  export default Permission;