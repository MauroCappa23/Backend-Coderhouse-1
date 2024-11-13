import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();
const cartManager = new CartManager();

// Ruta para obtener los cartos
router.get("/", async (req, res) => {
    try {
        const carts = await cartManager.getAll(req.query);
        res.status(200).json({ status: "success", payload: carts });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

// Ruta para obtener un carrito por su ID
router.get("/:id", async (req, res) => {
    try {
        const cart = await cartManager.getOneById(req.params.id);
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

// Ruta para crear un carto, permite la subida de imágenes
router.post("/", async (req, res) => {
    try {
        const cart = await cartManager.createOne(req.body);
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

// Ruta para actualizar un carto por su ID, permite la subida de imágenes
router.put("/:id", async (req, res) => {
    try {
        const cart = await cartManager.updateOneById(req.params.id, req.body, req.file);
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

export default router;