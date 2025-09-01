import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    userName: { type: String, required: true, trim: true, minlength: 2, maxlength: 30 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    isConfirmed: { type: Boolean, default: false },
    role: { type: String, enum: ['User', 'Admin', 'Employee'], default: 'User' },
    phone: String,
    address: String,
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;