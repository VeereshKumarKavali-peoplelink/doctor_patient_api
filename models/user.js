const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["super admin", "admin"], default: "admin"}
}, { timestamps: true });


module.exports =
    mongoose.models[process.env.userTable] ||
    mongoose.model(process.env.userTable, userSchema);