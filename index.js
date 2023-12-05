require('dotenv').config()
const express = require('express')
const cors = require("cors")
const { prisma } = require("./config/prisma")
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async(req, res) => {
    res.send("here is the response")
})

// Catalog_news routes

// get all Catalog_news 
app.get("/Catalog_newss", async(req, res) => {
    const Catalog_news = await prisma.catalog_news.findMany()
    res.status(200).send(Catalog_news);
})

// get catalog_news by id
app.get("/Catalog_newss/:id", async(req, res) => {
    const Catalog_news = await prisma.catalog_news.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    })
    if (!Catalog_news) res.status(404).send("Catalog not found")
    else res.status(200).send(Catalog_news)
})

app.all("*", async(req, res) => {
    res.json({
        message: "Routes you're looking is not found",
    })
})

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is already running at ${PORT}`);
});