"use strict";
const express = require("express");
const axios = require("axios");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();
const router = express.Router();

app.use(express.static(path.join(__dirname, "public")));
app.use(
	"/js",
	express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js"))
); // redirect bootstrap JS
app.use(
	"/js",
	express.static(path.join(__dirname, "/node_modules/jquery/dist"))
); // redirect JS jQuery

router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname + "/public/index.html"));
});

router.post("/addEmail", async (req, res) => {
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

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
