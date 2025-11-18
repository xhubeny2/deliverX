const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const deliveries = await prisma.delivery.findMany({where: });
      res.status(200).json(deliveries);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .post(async (req, res) => {
    const { customerName, address } = req.body;

    try {
      const newDelivery = await prisma.delivery.create({
        data: { customerName, address },
      });
      res.status(201).json(newDelivery);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      const delivery = await prisma.delivery.findUnique({
        where: { id: parseInt(id) },
      });
      if (delivery) {
        res.status(200).json(delivery);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { name, email },
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.delivery.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
