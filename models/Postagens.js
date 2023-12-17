//Importando nossa biblioteca para conversar com  o  mongoDB
const mongoose = require("mongoose");
//Schema representa um esquema de dados(Modelo):
const Schema = mongoose.Schema;
//Criamos uma  nova Postagem(Modelo):
const Postagem = new Schema({
  titulo: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  conteudo: {
    type: Schema.Types.ObjectId,
    ref: "categorias",
    required: true,
  },
  data: {
    type: Date,
    default: Date.now(),
  },
});

//Definimos o esqueleto do nosso modelo "postagens"
mongoose.model("postagens", Postagem);
