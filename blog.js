//Carregando Módulos
const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const admin = require("./routes/admin");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");

//Config:
//Session
app.use(
  session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
//Middlewares
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});
// Mongoose:
mongoose
  .connect("mongodb://localhost/blogapp")
  .then(() => {
    console.log("Conectado com Sucesso!");
  })
  .catch((erro) => {
    console.log("Não conectado, erro: " + erro);
  });
mongoose.Promise = global.Promise;
//Body parser:

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/*Estamos definindo todos os nossos dados que vem do lado
do cliente para transformamos em json*/

//Handlebars:
app.engine(
  "handlebars",
  handlebars.engine({
    extname: "handlebars",
    defaultLayout: false,
    layoutsDir: "views/layouts/",
    //Aqui dizemos que layouts contém todos os arquivos a serem renderizados na aplicação
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
//Aqui falamos que views é a pasta onde contém todos os códigos HTML

//Rotas:
app.use("/admin", admin);

//Start server:
app.listen(3400, () => {
  console.log("Start success!");
});

//Public
app.use(express.static(__dirname + "public"));
//Aqui estamos declarando qual é a pasta dos nossos arquivos estáticos(CSS)

