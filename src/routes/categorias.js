import { Router } from "express";
import {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from "../services/categoriasServices.js";

import { createCategoriaValidator, updateCategoriaValidator } from "../validators/categoriasValidator.js";
import { validate } from "../middlewares/validate.js";

const router = Router();

router.get("/", getCategorias);
router.post("/", createCategoriaValidator, validate, createCategoria);
router.put("/:id", updateCategoriaValidator, validate, updateCategoria);
router.delete("/:id", deleteCategoria);

export default router;
