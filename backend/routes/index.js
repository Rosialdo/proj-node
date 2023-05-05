import express from "express";
import alunos from "./alunos.js";
import cursos from "./cursos.js";
import sequelize from "../config/sequelize.js";
import { Sequelize } from "sequelize";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Pagina inicial");
});

router.use("/alunos", alunos);
router.use("/cursos", cursos);

export default router;
