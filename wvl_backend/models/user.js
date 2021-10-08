const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    nickName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    type: { type: String, default: null },
    age: { type: Number, default: 0 },
    gender: { type: String, enum: ["남자", "여자"], default: "남자" },
    degree: { type: Number, default: 0 },
    inoDate: { type: Date, default: null },
    profileImage: { type: String, default: null },
    verified: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("user", userSchema);
