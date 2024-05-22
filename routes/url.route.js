import express from "express";
import { handleGenerateNewShortURL, handleGetAnalytics } from "../controllers/url.controller.js";

const urlrouter = express.Router();

urlrouter.post('/',handleGenerateNewShortURL);

urlrouter.get('/analytics/:shortId' , handleGetAnalytics);

export {urlrouter};