const express = require('express');
const { handleGenerateNewUrl, handleRedirectUrl, handleNumberOfClicksUrl } = require("../controllers/url.js");

const router = express.Router();

router.post("/", handleGenerateNewUrl);
router.get("/:shortId", handleRedirectUrl);
router.get("/analytics/:shortId", handleNumberOfClicksUrl);

module.exports = router;