import { pool } from "../db.js";

export const getAutores = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM autores");
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

export const createAutor = async (req, res, next) => {
  try {
    const { nombre, nacionalidad, biografia, correo } = req.body;
    const result = await pool.query(
      "INSERT INTO autores (nombre, nacionalidad, biografia, correo) VALUES ($1, $2, $3, $4) RETURNING *",
      [nombre, nacionalidad, biografia, correo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const updateAutor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, nacionalidad, biografia, correo } = req.body;
    const result = await pool.query(
      "UPDATE autores SET nombre=$1, nacionalidad=$2, biografia=$3, correo=$4 WHERE id_autor=$5 RETURNING *",
      [nombre, nacionalidad, biografia, correo, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Autor no encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const deleteAutor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM autores WHERE id_autor=$1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Autor no encontrado" });
    res.json({ message: "Autor eliminado correctamente" });
  } catch (err) {
    next(err);
  }
};
