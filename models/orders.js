import mongoose from 'mongoose';

const OrdersSchema = mongoose.Schema({
    item: { type: Array, default: [] },
    restaurantName: String,
    totalMoney: String,
}, {
    timestamps: true
});

const OrdersCollection = mongoose.model('Orders', OrdersSchema);

export default OrdersCollection;