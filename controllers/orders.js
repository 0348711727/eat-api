import OrdersCollection from "../models/orders.js";

export const addOrder = async (req, res) => {
    const orders_detail = req.body;
    // const newOrder = new OrdersCollection(orders_detail);
    // console.log("orders_detail: ", orders_detail);
    const newOrder = new OrdersCollection(orders_detail);
    try {
        // JSON.parse(orders_detail);
        await newOrder.save();
        // res.json(newOrder);
    } catch (error) {
        console.log('error');
    }
}
export const getOrder = async (req, res) => {
    try {
        const Order = await OrdersCollection.find();
        res.status(200).json(Order);
    } catch (error) {
        console.log(error);
    }
}