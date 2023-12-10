import mongoose, { Schema, model, models } from "mongoose";

const partnerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    type: {
        type: String, /* Hotel, restoran, drugo... */
        required: true
    },
    offers: {
        type: [Object] 
    },
    img: {
        type: String
    }
});

const Partner = models.Partner || model("Partner", partnerSchema);

export default Partner;