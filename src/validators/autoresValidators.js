import { body } from "express-validator";

export const createAutorValidator = [
  body("nombre")
    .notEmpty().withMessage("El nombre es obligatorio")
    .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),
  body("nacionalidad").optional().isString().withMessage("La nacionalidad debe ser texto"),
  body("biografia").optional().isString(),
  body("correo")
    .notEmpty().withMessage("El correo es obligatorio")
    .isEmail().withMessage("Debe ser un correo válido"),
];

export const updateAutorValidator = [
  body("nombre").optional().isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),
  body("nacionalidad").optional().isString(),
  body("biografia").optional().isString(),
  body("correo").optional().isEmail().withMessage("Debe ser un correo válido"),
];
