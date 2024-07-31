const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, saltRound);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare the password
userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

// Method to generate JWT
userSchema.methods.generateToken = function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "30d",
        });
    } catch (error) {
        console.log(error);
        throw new Error("Token generation failed");
    }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
