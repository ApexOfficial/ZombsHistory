const express = require("express");
const fs = require("fs");

const websitePort = 80;

const app = express();
app.use(express.json());
app.listen(websitePort, err => {
    if (err) throw new Error(err);

    console.log(`Express is listening on port ${websitePort}`)
});

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
})

app.get("/*", (req, res) => {
    const urlResponse = `${__dirname}/public/${req.url}`;

    fs.readFile(urlResponse, (err, data) => {
        if (data == undefined) res.sendStatus(404);
        else res.sendFile(urlResponse);
    })
})