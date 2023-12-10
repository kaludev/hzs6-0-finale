import { Schema, model, models } from "mongoose";

const quizSchema = new Schema({
    place: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    task: {
        /*
            [
                {
                    question:
                    slika:
                    adresa: 
                },
                ...
            ]
        */
        type: [Object],
        required: true
    },
    starts_at: {
        type: Date,
        required: true
    },
    ends_at: {
        type: Date,
        required: true,
        validate:{
            validator: function (ends_at){
                return ends_at > this.starts_at;
            },
            message: "End date must be greater than start date!",
        }
    },
    reward_points: {
        type: Number,
        required: true
    },
    interests: {
        type: String
    }
})

const Quiz = models.Quiz || model("Quiz", quizSchema);

export default Quiz;