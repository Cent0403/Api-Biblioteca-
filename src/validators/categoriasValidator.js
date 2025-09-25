import { body } from "express-validator";

export const createCategoriaValidator = [
  body("nombre_categoria").notEmpty().withMessage("El nombre de la categoría es obligatorio"),
  body("clasificacion").notEmpty().withMessage("La clasificación es obligatoria"),
];

export const updateCategoriaValidator = [
  body("nombre_categoria").optional().notEmpty(),
  body("clasificacion").optional().notEmpty(),
];
