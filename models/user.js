import { Schema,model ,models } from "mongoose";

const userSchema = new Schema({
    email: {
        type : String,
        unique : [true, 'Email already in use'],
        required : [true, 'Email is required']
    },
    username: {
        type : String,
        required : [true, 'Username is required'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    isPersonalized: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required : [true, "name is required"]
    },
    image: {
        type: String
    },
    age: {
        type: String,
    },
    job: {
        type: String,
    },
    interests: {
        type: String,
    },
    points: {
        type: Number,
        default: 0
    },
    rank: {
        type: String,
        set: function(){
            if(this.points >= 200 && this.points < 500){
                return "Silver";
            }
            else if(this.points >= 500){
                return "Gold";
            }
            else
                return "Bronze";
        }
    },
    active_quiz: {
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
    }
})

const User = models.User || model("User",userSchema)

export default User;