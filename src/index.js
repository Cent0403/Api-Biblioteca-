import express from "express";
import dotenv from "dotenv";
import autoresRoutes from "./routes/autores.js";
import categoriasRoutes from "./routes/categorias.js";
import librosRoutes from "./routes/libros.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API de la biblioteca funcionando correctamente");
});

app.use("/autores", autoresRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/libros", librosRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
