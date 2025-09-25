import { body } from "express-validator";

export const createLibroValidator = [
  body("titulo")
    .notEmpty().withMessage("El título es obligatorio")
    .isLength({ min: 10 }).withMessage("El título debe tener al menos 10 caracteres"),
  body("anio_publicacion")
    .notEmpty().withMessage("El año de publicación es obligatorio")
    .isInt({ min: 1900 }).withMessage("El año debe ser mayor a 1900"),
  body("autor_id").notEmpty().withMessage("El ID del autor es obligatorio"),
  body("categoria_id").notEmpty().withMessage("El ID de la categoría es obligatorio"),
  body("resumen").optional().isString(),
];

export const updateLibroValidator = [
  body("titulo").optional().isLength({ min: 10 }),
  body("anio_publicacion").optional().isInt({ min: 1900 }),
  body("autor_id").optional(),
  body("categoria_id").optional(),
  body("resumen").optional(),
];
