var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var jwt = require("jsonwebtoken");
var dotenv = require("dotenv");
var verifyToken = require("./middleware/checkAuth");
var imageFunc = require("./middleware/imageDownload");
var jsonpatch = require("json-patch");
const mongoose = require("mongoose");
var app = express();
dotenv.config();

mongoose.connect(process.env.DB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
let Address = require("./models/Address");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api", (req, res) => {
	res.json({
		message: "Welcome to the API",
	});
});

app.post("/api/jsonpatch", verifyToken, (req, res) => {
	jsonpatch.apply(req.body.jsonObject, req.body.jsonPatch);
	res.json({
		Patched: req.body.jsonObject,
	});
});

app.post("/api/address", verifyToken, async (req, res) => {
	let addressObj = {
		houseName: req.body.houseName,
		locality: req.body.locality,
		city: req.body.city,
		state: req.body.state,
		country: req.body.country,
	};

	try {
		await Address.create(addressObj);
		res.send("Success");
	} catch (error) {
		res.send("Failed to create address ", error);
	}
});

app.post("/api/image", verifyToken, imageFunc, (req, res) => {});

app.post("/api/login", (req, res) => {
	const user = {
		username: req.body.username,
		password: req.body.password,
	};
	jwt.sign({ user }, process.env.JWT_KEY, (err, token) => {
		res.json({
			token,
		});
	});
});

app.listen(5000, () => console.log("Server running on port 5000"));

module.exports = app;
