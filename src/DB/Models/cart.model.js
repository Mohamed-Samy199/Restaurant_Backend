import mongoose, { Schema, Types } from "mongoose";

const cartSchema = new Schema({
    userId: { type: Types.ObjectId, ref: "User" },
    tableNumber: { type: Number },
    menus: [{
        menuId: { type: Types.ObjectId, ref: "Menu", required: true },
        quntity: { type: Number, default: 1, require: true }
    }],
    totalOfCarItems: Number
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const cartModel = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
export default cartModel;