const URL = require("../models/url.js");
const shortid = require("shortid");

async function handleGenerateNewUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "URL is required" });
    }
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectedURL: body.url,
        visitedHistory: [],
    });

    return res.json({ id: shortID })
}

async function handleRedirectUrl(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        },
    );
    res.redirect(entry.redirectedURL);
}

async function handleNumberOfClicksUrl(req, res) {
    const shortId = req.params.shortId;
    console.log(shortId);
    const result = await URL.findOne({ shortId });
    console.log(result);
    return res.json({ totalClicks: result.visitHistory.length })
}

module.exports = {
    handleGenerateNewUrl,
    handleNumberOfClicksUrl,
    handleRedirectUrl,
}