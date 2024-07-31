const { Schema, model, mongoose } = require("mongoose");

const serviceSchema = new Schema({
    service : {type : String, required: true},
    description: { type: String, required: true},
    price: { type: Number, required: true},
    provider: { type: String, required: true}
})

const service = new model("Service", serviceSchema);

module.exports = service;