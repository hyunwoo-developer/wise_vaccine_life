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

const bcrypt = require("bcrypt");
const saltRounds = 10;

// 비밀번호를 데이터베이스에 암호화하여 저장
userSchema.pre("save", function (next) {
    var user = this;
    if (user.isModified("password")) {
        //비밀번호를 암호화
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

module.exports = mongoose.model("user", userSchema);
