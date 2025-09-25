import { Router } from "express";
import {
  getLibros,
  createLibro,
  updateLibro,
  deleteLibro,
  buscarPorAnio,
  buscarPorAutor,
  buscarPorCategoria,
  buscarPorClasificacion,
} from "../services/librosServices.js";

import { createLibroValidator, updateLibroValidator } from "../validators/librosValidator.js";
import { validate } from "../middlewares/validate.js";

const router = Router();

router.get("/", getLibros);
router.post("/", createLibroValidator, validate, createLibro);
router.put("/:id", updateLibroValidator, validate, updateLibro);
router.delete("/:id", deleteLibro);

router.get("/anio/:anio", buscarPorAnio);
router.get("/autor/:autorId", buscarPorAutor);
router.get("/categoria/:categoriaId", buscarPorCategoria);
router.get("/clasificacion/:clasificacion", buscarPorClasificacion);

export default router;
