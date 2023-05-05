import express from "express";
import { curso } from "../models/index.js";
import { CursoController } from "../controller/curso.controller.js";
import { body, validationResult } from "express-validator";
const router = express.Router();

const cursoController = new CursoController(curso);

router.get("/", async (req, res) => {
  const cursos = await cursoController.getAll();
  res.json(cursos);
});

router.post(
  "/create",
  [
    //validação dos dados
    body("nome")
      .notEmpty()
      .trim()
      .withMessage("O campo nome é obrigatório"),
    body("ch")
      .isNumeric()
      .isLength({ min: 2 })
      .withMessage("O campo ch deve ser numérico apenas"),
  ],

  async (req, res) => {
    console.log(req.body)
    // caso encontre erros, ficará nessa variável errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //se os dados forem válidos, o sistema executará aqui
    const { nome, ch, categoria } = req.body;
    await cursoController.adicionar({ nome, ch, categoria });
    res.status(201).send("Curso criado com sucesso!");
  }
);

router.get("/:id",
  async (req, res) => {
    const id = req.params.id
    const curso = await cursoController.getbyid(id);
    res.json(curso);

  }

)

router.delete("/delete/:id",

  async (req, res) => {
    const id = req.params.id
    await cursoController.deletecurso(id)
    res.status(200).send("Curso deletado com sucesso!");
    
  }
)

router.put("/update/:id",
  [
    //validação de dados
    body("nome")
      .notEmpty()
      .trim()
      .withMessage("O campo é obrigatorio"),
    body("ch")
    .isNumeric()
    .isLength({min: 2})
    .withMessage("O campo de CH deve ser apenas numérico")
  ],

  async(req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
    }
    const id = req.params.id

    const { nome, ch } = req.body;
    await cursoController.atualizar({ nome, ch }, id);
    res.status(200).send("Curso atualizado com sucesso!");

  }

)


export default router;
