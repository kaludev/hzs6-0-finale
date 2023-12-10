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
        type: Schema.Types.ObjectId
    }
})

const User = models.User || model("User",userSchema)

export default User;