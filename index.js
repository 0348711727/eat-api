import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors";

import ordersRouter from "./routes/ordersRouter.js";
import authRouter from "./routes/authRouter.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))

app.get("/", (req, res) => {
    res.send("Hello")
})
const corsOptions = {
    origin: "*",
    methods: ['POST', 'PUT', 'GET', 'PATCH'],
    userCredential: true,
}
app.use(cors(corsOptions))

app.use("/api/orders", ordersRouter)
app.use("/api/user", authRouter);

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`CONNECT ON PORT ${PORT}`)))
    .catch((err) => console.log(err))



// app.listen(5000, () => console.log("listening on 5000"))