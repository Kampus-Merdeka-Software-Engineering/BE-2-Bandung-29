require('dotenv').config()
const express = require('express')
const cors = require("cors")
const { catalogRoutes } = require('./routes/catalog_news.routes.js')
const { productRoutes, categoryRoutes } = require('./routes/category.routes.js')
const { messageRoutes } = require('./routes/message.routes.js')
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async(req, res) => {
    res.send("here is the response")
})

// catalog routes
app.use("/catalog_news", catalogRoutes)

// category routes
app.use("/category", categoryRoutes)

// message routes
app.use("/message", messageRoutes)

app.all("*", async(req, res) => {
    res.json({
        message: "Routes you're looking is not found",
    })
})

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is already running at ${PORT}`);
});