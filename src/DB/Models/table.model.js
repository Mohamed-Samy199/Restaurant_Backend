import mongoose, { Schema, Types } from "mongoose";

const tableSchema = new Schema({
    tableNumber: { type: Number, required: true, unique: true },
    active: { type: String, enum: ["available", "reserved", "occupied"], default: "available" },
    qrcode: String,
    createdBy: { type: Types.ObjectId, ref: "User", required: true }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const tableModel = mongoose.models.Table || mongoose.model("Table", tableSchema);
export default tableModel;