import UserCollection from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    try {
        const userFind = await UserCollection.findOne({ email });
        if (!userFind) {
            return res.status(404).json({ success: false, message: "Email or password is incorrect" })
        }
        const passwordHash = userFind.password;
        bcrypt.compare(password, passwordHash, (err, resCompare) => {

            if (!resCompare) return res.status(409).json({ success: false, message: "Password invalid" });
            const token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '7d' })
            // console.log(token)
            console.log(userFind, 'userFind')
            return res.json({ success: true, message: 'Login success', token, user: userFind })
        })
    } catch (error) {
        console.log(error);
    }
}

export const signUp = async (req, res, next) => {
    const { email, password, fulName, phone, address, } = req.body;
    try {
        const emailInDB = await UserCollection.findOne({ email });
        if (emailInDB) {
            res.status(409).json("Email already exist")
        }
        else if (email && password) {
            //hash password 
            bcrypt.hash(password, 12, async (err, passwordHash) => {
                if (err) {
                    res.status(409).json({ message: "Couldn't hash password" })
                }
                const newUser = new UserCollection({ email, password: passwordHash, fulName, address, phone });
                await newUser.save();
                res.status(200).json(newUser, "User added");
            })
        }
    } catch (error) {
        console.log(error)
    }

}
export const getCurrentUser = async (req, res) => {

    // const authHeader = req.get("Authorization");
    // if (!authHeader) return res.status(409).json("Not Authorize");
    // const token = authHeader.split(" ")[1];

    // const token = req.headers.authorization.split(" ")[1];
    const { userToken } = req.body;
    console.log({ userToken });

    let decodedToken;
    try {
        decodedToken = jwt.verify(userToken, process.env.SECRET_KEY);
        console.log(decodedToken);
        // query database l???y user
        // const currentUser = await UserCollection.findOne({ email });
        // console.log(currentUser)
        // dungf email ????? find d?????i mmongo, xong sau ???? res.json th???ng current user ????? fe l???y, sau ???? fe t???o 1 dispatch ????? ?????y v?? redux, ????? l???y th???ng ???? setuser l???i th??nh current user sau khi refresh l???i trang v???n c??n user ????? hi???n th???

        return res.status(200).json({ userToken, success: true });
    }
    catch (err) {
        return res.status(404).json({ message: "Can't Authorize", success: false })
    }
    // if (!decodedToken) {
    //     res.status(403).json({ message: "Can't authorize" })
    // }r
    // res.status(200).json("Authorize success")

}