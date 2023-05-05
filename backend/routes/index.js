import express from "express";
import users from "./users.js";
import cursos from "./cursos.js";
import sequelize from "../config/sequelize.js";
import { Sequelize } from "sequelize";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Pagina inicial");
});

router.use("/users", users);
router.use("/cursos", cursos);

export default router;
