const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Move = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        frontend : { type: String, required: true },
        backend : { type: String, required: true },
        batch : { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('Tasks', Move)