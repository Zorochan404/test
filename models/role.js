import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    level: { type: Number, required: true }, // 1: Super Admin, 2: Admin, 3: Moderator
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  const Role = mongoose.model('Role', roleSchema);

  export default Role;