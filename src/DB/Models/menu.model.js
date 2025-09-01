import mongoose, { Schema, Types } from "mongoose";

const menuSchema = new Schema({
    name: { type: String, required: true, trim: true },
    descraption: { type: String, trim: true, minLength: 2 },
    price: { type: Number, required: true, default: 1 },

    stock: { type: Number, default: 1 },
    discount: { type: Number, default: 0 },
    finalPrice: { type: Number, default: 1 },
    isAvailable: { type: Boolean, default: true },

    image: Object,
    customId: String,

    categoryId: { type: Types.ObjectId, required: true, ref: "Category" },
    createdBy: { type: Types.ObjectId, requires: true, ref: "User" },
    updatedBy: { type: Types.ObjectId, ref: "User" },
    deletedBy: { type: Types.ObjectId, ref: "User" },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const menuModel = mongoose.models.Menu || mongoose.model("Menu" , menuSchema);
export default menuModel;