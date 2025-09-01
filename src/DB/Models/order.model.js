import mongoose, { Schema, Types } from "mongoose";


const orderSchema = new Schema({
    userId: { type: Types.ObjectId, ref: "User" },
    tableNumber: Number,
    menus: [{
        menu: { type: Types.ObjectId, ref: "Menu", required: true },
        quntity: { type: Number, required: true }
    }],
    source: { type: String, enum: ["table-in-restaurant", "delivary"], require: true },
    count: Number,
    reason: String,
    //if in restaurant , match: /^01[0-2,5]{1}[0-9]{8}$/ }
    tabelId: { type: Types.ObjectId, ref: "Table" },
    //if delivery 
    phoneCustom: String,
    address: String,
    details: String,
    note: String,
    supTotale: Number,
    finalPrice: Number,
    paymentType: { type: String, default: 'cash', enum: ['cash', 'card'] },
    status: { type: String, default: 'placed', enum: ['waitPayment', 'placed', 'canceled', 'rejected', 'onWay', 'delivered'] },
    updatedBy: { type: Types.ObjectId, ref: "User" },

    // status: {
    //     type: String,
    //     enum: ['pending', 'preparing', 'ready', 'completed', 'cancelled'],
    //     default: 'pending'
    // }
}, {
    timestamps: true
});

const orderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default orderModel;