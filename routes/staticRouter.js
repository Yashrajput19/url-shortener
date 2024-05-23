import express from "express";
import URL from "../models/url.model.js";
const staticRouter = express.Router();


staticRouter.get('/', async (req,res) => {
    const allUrls = await URL.find({})
    return res.render('home' , {urls: allUrls});
})

export default staticRouter;