import { pool } from "../db.js";

export const getCategorias = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM categorias");
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

export const createCategoria = async (req, res, next) => {
  try {
    const { nombre_categoria, clasificacion } = req.body;
    const result = await pool.query(
      "INSERT INTO categorias (nombre_categoria, clasificacion) VALUES ($1, $2) RETURNING *",
      [nombre_categoria, clasificacion]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const updateCategoria = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre_categoria, clasificacion } = req.body;
    const result = await pool.query(
      "UPDATE categorias SET nombre_categoria=$1, clasificacion=$2 WHERE id_categoria=$3 RETURNING *",
      [nombre_categoria, clasificacion, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Categoría no encontrada" });
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const deleteCategoria = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM categorias WHERE id_categoria=$1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Categoría no encontrada" });
    res.json({ message: "Categoría eliminada correctamente" });
  } catch (err) {
    next(err);
  }
};
