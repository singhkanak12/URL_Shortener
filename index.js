const express = require("express")
const urlRoute = require("./routes/url.js")
const { connectToMongoDB } = require("./connect.js")
const URL = require("./models/url.js")
const app = express();
const PORT = 8002;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
    .then(() => {
        console.log("MongoDB Connected")
    }).catch((err) => {
        console.log("Error:", err);
    })

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/test", (req, res) => {
    return res.end("<h1>Hey from server</h1");
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})

app.use("/url", urlRoute);

app.listen(PORT, () => {
    console.log(`Server started at port:${PORT}`);
});