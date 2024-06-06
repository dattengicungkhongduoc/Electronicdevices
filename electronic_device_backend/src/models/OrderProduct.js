const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderItems: [
        {
            name: { type: String, required: true},
            amount: { type: Number, required: true},
            image: { type: String, required: true},
            price: { type: Number, required: true},
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
        },
    ],
    shippingAddress: {
        fullName: { type: String, required: true},
        address: { type: String, required: true},
        city: { type: String, required: true},
        phone: { type: Number, required: true},
    },
    maymentMethod: { type: String, required: true},
    itemsPrice: { type: Number, required: true},
    shippingPrice: {type: Number, require: true},
    taxPrice: {type: Number, require: true},
    toltalPrice: {type: Number, require: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true},
    isPaid: {type: Date},
    isDelivered: { type: Boolean, default: false},
    deliveredAt: {type: Date},
},
{
    timestamps: true,
}
);
const Order = mongoose.model('Order', orderSchema);
module.exports = Order