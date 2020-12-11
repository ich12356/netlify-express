"use strict";
const express = require("express");
const axios = require("axios");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();
const router = express.Router();

// router.get("/", (req, res) => {
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", express.static(__dirname + "/public"));
app.use(
	"/js",
	express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
); // redirect bootstrap JS
app.use(
	"/js",
	express.static(path.join(__dirname, "../node_modules/jquery/dist"))
); // redirect JS jQuery

app.post("/addEmail", async (req, res) => {
	try {
		const response = await axios.post(
			"https://api.sendinblue.com/v3/contacts",
			{
				email: req.body.email,
				listIds: [7],
			},
			{
				headers: {
					Accept: "*/*",
					"Content-Type": "application/json",
					"api-key": process.env.API_KEY,
				},
			}
		);

		res.send(response.data);
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
});

module.exports = app;
module.exports.handler = serverless(app);
