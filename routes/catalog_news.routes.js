const express = require('express');
const catalogRoutes = express.Router();
const { prisma } = require("../config/prisma")


// Catalog_news routes
// get all Catalog_news 
catalogRoutes.get("/", async(req, res) => {
    const Catalog_news = await prisma.catalog_news.findMany()
    res.status(200).send(Catalog_news);
})

// READ
catalogRoutes.get("/:id", async(req, res) => {
    const Catalog_news = await prisma.catalog_news.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    if (!Catalog_news) res.status(404).send("Catalog not found")
    else res.status(200).send(Catalog_news)
})

// CREATE
catalogRoutes.post("/", async (req, res) => {
    const { name } = req.body 
    // todo - handle if name is not passed in 
    if (!name) {
        console.error('Name is required');
        return res.status(422).json({ message: 'Name is required' });
      }
    const newCatalog = await prisma.catalog_news.create({
      data:{
        name: name,
      },
    }) ;
    res.status(201).json({
        message: "Catalog created",
        data: newCatalog
    })
})


// UPDATE

catalogRoutes.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCatalog = await prisma.catalog_news.update({
        where: { id: parseInt(id), },
        data: { name: name },
    })
    res.status(200).json({
        message: `catalog with id: ${id} is updated`,
        data: updatedCatalog,
    })
})

// DELETE

catalogRoutes.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await prisma.catalog_news.delete({
        where: {
            id: parseInt(id),
        },
    });
    res.status(200).json({
        message: `news with id: ${id} sucessfully deleted`,
    })
})

module.exports = { catalogRoutes };