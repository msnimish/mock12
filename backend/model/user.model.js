import mongoose from "mongoose";

let UserSchema = mongoose.Schema({
    name: { type: "String", required: true },
    email: { type: "String", required: true, unique: true },
    password: { type: "String", required: true },
    installmentAmt: { type: "Number", default: 10000 },
    interestRate: { type: "Number", default: 7.1 },
    years: { type: "Number", default: 2 },
    investmentAmt: { type: "Number"},
    interestAmt: {  type: "Number"},
    maturityValue: { type: "Number"}
})

let User = mongoose.model("user", UserSchema);

export default User;