import dotenv from "dotenv";
import express from "express";
import { urlrouter } from "./routes/url.route.js";
import { connectToMongoDB } from "./db/connect.db.js";
import { DB_NAME } from "./constants.js";
import URL from "./models/url.model.js";
import path from 'path';
import staticRouter from "./routes/staticRouter.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import { restrictToLoggedinUserOnly ,checkAuth } from "./middleware/auth.middleware.js";

dotenv.config({
    path: './env'
})

const app = express();
const PORT = 8001;

connectToMongoDB(`${process.env.MONGODB_URL}/${DB_NAME}`)
.then(() => {
    console.log("Database Connected !!")
})
.catch((err) => {
    console.log(err);
});

app.set("view engine","ejs");
app.set("views",path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());

app.use('/url',restrictToLoggedinUserOnly, urlrouter);
app.use('/user',userRouter);
app.use('/', checkAuth ,staticRouter);

app.get('/url/:shortId' , async (req,res) => {
   
    const shortId = req.params.shortId;
    
    const entry = await URL.findOneAndUpdate({
        shortId
    } , { $push: {
        visitHistory: { timestamp : Date.now() },
    },

    },
    
    )

    res.redirect(entry.redirectURL);
})

app.listen(PORT , () => {
    console.log(`Server is running on PORT : ${PORT}`);
})