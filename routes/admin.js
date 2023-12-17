// Config Para trabalhar com rotas em arquivos separados
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Categorias");
const Categorias = mongoose.model("categorias");

// Rota para a página principal do painel administrativo
router.get("/", (req, res) => {
  res.send("Página principal do painel adm");
});

// Rota para a página de posts
router.get("/posts", (req, res) => {
  res.render("layouts/main");
});

// Rota para a página de categorias
router.get("/categorias", (req, res) => {
  Categorias.find()
    .lean()
    .sort({ date: "desc" })
    .then((categorias) => {
      res.render("admin/categorias", { categorias: categorias });
    })
    .catch((err) => {
      req.flash("error_msg", "Erro ao listar categorias :(");
      res.redirect("/admin");
    });
});

// Rota para a página de adição de categorias (formulário)
router.get("/categorias/add", (req, res) => {
  res.render("admin/addcategorias");
});

router.get("/categorias/edit/:id", (req, res) => {
  Categorias.findOne({ _id: req.params.id })
    .then((categoria) => {
      res.render("admin/editarcategoria", { categoria: categoria });
    })
    .catch((error) => {
      req.flash("error_msg", "Erro ao editar categori'ds'");
      res.redirect("/admin/categorias");
    });
});

router.post("/categorias/edit", (req, res) => {
  Categorias.findOne({ _id: req.body.id })
    .then((categoria) => {
      categoria.nome = req.body.nome;
      categoria.slug = req.body.slug;
      categoria
        .save()
        .then(() => {
          req.flash("success_msg", "Categoria editada com sucesso");
          res.redirect("/admin/categorias");
        })
        .catch((err) => {
          req.flash("error_msg", "Erro ao editar categoria: " + err);
          res.redirect("/admin/categorias");
        });
    })
    .catch((err) => {
      req.flash("error_msg", "Erro: " + err);
      res.redirect("/admin/categorias");
    });
});

router.post("/categorias/deletar",(req, res)=>{
  Categorias.deleteOne({_id: req.body.id}).then(()=>{
    req.flash("success_msg","Categoria deletada com sucesso!");
    res.redirect("/admin/categorias");
  }).catch((err)=>{
    req.flash("error_msg", "Erro: "+err);
    res.redirect("/admin/categorias");
  })
})

// Rota para lidar com o envio do formulário de adição de categorias
router.post("/categorias/nova", (req, res) => {
  const erros = [];

  // Validação das credenciais do formulário
  if (!req.body.nome || req.body.nome == null) {
    erros.push({ msg: "Credenciais de Nome, inválido :(" });
  }
  if (!req.body.slug || req.body.slug == null) {
    erros.push({ msg: "Credenciais de Slug inválido :(" });
  }

  // Validação do tamanho mínimo do nome
  if (req.body.nome.length < 2) {
    erros.push({ msg: "O nome de Usuário é muito pequeno :(" });
  }

  // Verifica se há erros
  if (erros.length > 0) {
    // Se houver erros, renderiza a página de adição de categorias com as mensagens de erro
    res.render("admin/addcategorias", { erros: erros });
  } else {
    // Se não houver erros, cria uma nova categoria e a salva no banco de dados
    const novaCategoria = {
      nome: req.body.nome,
      slug: req.body.slug,
    };
    new Categorias(novaCategoria)
      .save()
      .then(() => {
        // Redireciona para a página de categorias após a criação bem-sucedida
        req.flash("success_msg", "Categoria criada com sucesso :)");
        res.redirect("/admin/categorias");
      })
      .catch(() => {
        // Em caso de erro ao criar a categoria, redireciona para a página principal do painel administrativo com uma mensagem de erro
        req.flash("error_msg", "Erro ao criar Categoria:");
        res.redirect("/admin");
      });
  }
});

module.exports = router;
