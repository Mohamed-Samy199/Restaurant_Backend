import mongoose, { Schema, Types } from "mongoose";

const categorySchema = new Schema({
    name : {type : String , required : true , trim : true},
    createdBy : { type : Types.ObjectId , required : true , ref : "User"},
    updatedBy : { type : Types.ObjectId , ref : "User"},

},{
    timestamps : true, 
    toJSON : {virtuals : true},
    toObject : {virtuals : true}
});

categorySchema.virtual("menu" , {
    localField : "_id",
    foreignField : "categoryId",
    ref : "Menu"
})

const categoryModel = mongoose.models.Category || mongoose.model("Category" , categorySchema);
export default categoryModel;