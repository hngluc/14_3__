let mongoose = require('mongoose')
let itemCartSchema = mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'product',
        required: true,
    },
    quantity: {
        type: Number,
        min: 1,
        default: 1
    }
}, { _id: false })

let cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true
    },
    items: [itemCartSchema]
})
module.exports = mongoose.model('cart', cartSchema)