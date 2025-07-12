import mongoose from "mongoose";


const userSessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'RoleUser', required: true },
    sessionToken: { type: String, required: true },
    permissions: [{ type: String }],
    lastActivity: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
  });


  const UserSession = mongoose.model('UserSession', userSessionSchema);

  export default UserSession;   