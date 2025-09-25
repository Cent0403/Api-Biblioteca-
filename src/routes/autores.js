import { Router } from "express";
import {
  getAutores,
  createAutor,
  updateAutor,
  deleteAutor,
} from "../services/autoresServices.js";

import { createAutorValidator, updateAutorValidator } from "../validators/autoresValidator.js";
import { validate } from "../middlewares/validate.js";

const router = Router();

router.get("/", getAutores);
router.post("/", createAutorValidator, validate, createAutor);
router.put("/:id", updateAutorValidator, validate, updateAutor);
router.delete("/:id", deleteAutor);

export default router;
