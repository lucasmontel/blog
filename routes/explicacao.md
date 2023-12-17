# Rotas
## admin.js
### Aqui nós temos o nosso arquivo de rotas do nosso projeto, nele armazenamos todas as rotas:


```
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Categorias");
const Categorias = mongoose.model("categorias")
router.get("/", (req, res) => {
  res.send("Página principal do painel adm");
});

router.get("/posts", (req, res) => {
  res.render("layouts/main");
});

router.get("/categorias", (req, res) => {
  res.render("admin/categorias");
});

router.get("/categorias/add", (req, res) => {
  res.render("admin/addcategorias");
});

router.post("/categorias/nova", (req, res) => {});
module.exports = router;
```