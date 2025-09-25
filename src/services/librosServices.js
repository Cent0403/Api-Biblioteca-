import { pool } from "../db.js";

// CRUD
export const getLibros = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM libros");
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

export const createLibro = async (req, res, next) => {
  try {
    const { titulo, anio_publicacion, autor_id, categoria_id, resumen } =
      req.body;
    const result = await pool.query(
      "INSERT INTO libros (titulo, anio_publicacion, autor_id, categoria_id, resumen) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [titulo, anio_publicacion, autor_id, categoria_id, resumen]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const updateLibro = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { titulo, anio_publicacion, autor_id, categoria_id, resumen } =
      req.body;
    const result = await pool.query(
      "UPDATE libros SET titulo=$1, anio_publicacion=$2, autor_id=$3, categoria_id=$4, resumen=$5 WHERE id_libro=$6 RETURNING *",
      [titulo, anio_publicacion, autor_id, categoria_id, resumen, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Libro no encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const deleteLibro = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM libros WHERE id_libro=$1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Libro no encontrado" });
    res.json({ message: "Libro eliminado correctamente" });
  } catch (err) {
    next(err);
  }
};

export const buscarPorAnio = async (req, res, next) => {
  try {
    const { anio } = req.params;
    const result = await pool.query(
      "SELECT * FROM libros WHERE anio_publicacion=$1",
      [anio]
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

export const buscarPorAutor = async (req, res, next) => {
  try {
    const { autorId } = req.params;
    const result = await pool.query(
      "SELECT * FROM libros WHERE autor_id=$1",
      [autorId]
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

export const buscarPorCategoria = async (req, res, next) => {
  try {
    const { categoriaId } = req.params;
    const result = await pool.query(
      "SELECT * FROM libros WHERE categoria_id=$1",
      [categoriaId]
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

export const buscarPorClasificacion = async (req, res, next) => {
  try {
    const { clasificacion } = req.params;
    const result = await pool.query(
      `SELECT l.* FROM libros l
       JOIN categorias c ON l.categoria_id = c.id_categoria
       WHERE c.clasificacion=$1`,
      [clasificacion]
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};
