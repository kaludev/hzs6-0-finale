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
        /*
            [
                {
                    description:
                    cost:
                },
                ...
            ] 
        */
        type: [Object] 
    }
})