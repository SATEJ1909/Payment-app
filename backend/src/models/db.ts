import mongoose from "mongoose";


const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true , trim : true , maxlength : 20 },
    password: { type: String, required: true  , trim : true},
    firstName: { type: String  ,required: true ,trim : true},
    lastName: { type: String , required: true ,trim : true},
});

const UserModel = mongoose.model("User", UserSchema);

export { UserModel };


const AccountSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    balance : { type: Number, required: true }
    
})

const AccountModel = mongoose.model("Accounts", AccountSchema);

export { AccountModel };