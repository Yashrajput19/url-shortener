import dotenv from "dotenv";
import express from "express";
import { urlrouter } from "./routes/url.route.js";
import { connectToMongoDB } from "./db/connect.db.js";
import { DB_NAME } from "./constants.js";
import URL from "./models/url.model.js";

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

app.use(express.json())
app.use('/url',urlrouter);

app.get('/:shortId' , async (req,res) => {
   
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