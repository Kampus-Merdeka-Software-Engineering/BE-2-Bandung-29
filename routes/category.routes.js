const express = require('express');
const categoryRoutes = express.Router();
const { prisma } = require("../config/prisma")

// READ
categoryRoutes.get("/", async (req, res) => {
    const category = await prisma.category.findMany({
        include: {
            Catalog_news: true,
        },
    });
    res.status(200).send(category);
});

categoryRoutes.get("/:catalogId", async (req, res) => {
    const { catalogId } = req.params;
    const category = await prisma.category.findMany({
        where: {
            catalog_newsId: parseInt(catalogId),
        },
    });
    res.status(200).send(category);
})



// CREATE
categoryRoutes.post("/", async (req, res) => {
    const newCategory = await prisma.category.create({
        data: {
            name: req.body.name,
            title: req.body.title,
            content: req.body.content,
            imageUrl: req.body.imageUrl,
            catalog_newsId: parseInt(req.body.catalog_newsId),
        },
    })
    res.status(201).json({
        message: "Category created",
        data: newCategory,
    })
})

module.exports = { categoryRoutes };