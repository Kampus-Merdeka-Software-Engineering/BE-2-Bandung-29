const express = require("express");
const messageRoutes = express.Router();
const { prisma } = require("../config/prisma");

//READ
messageRoutes.get("/", async(req, res) => {
    const messages = await prisma.message.findMany();
    res.status(200).send(messages);
});

// CREATE
messageRoutes.post("/", async(req, res) => {
    const { name, email, message } = req.body
    const newMessage = await prisma.message.create({
        data: {
            name: name,
            email: email,
            message: message,
        },
    });
    res.status(201).json({
        message: "Message created",
        data: newMessage,
    });
});


module.exports = { messageRoutes };