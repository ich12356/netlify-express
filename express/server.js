"use strict";
const express = require("express");
const axios = require("axios");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const router = express.Router();

app.use(express.static(path.join(__dirname, "public")));
// app.use(
// 	"/js",
// 	express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js"))
// ); // redirect bootstrap JS
// app.use(
// 	"/js",
// 	express.static(path.join(__dirname, "/node_modules/jquery/dist"))
// ); // redirect JS jQuery

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
					"api-key":
						"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",
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
