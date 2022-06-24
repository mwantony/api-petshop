const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("config");
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
app.use(bodyParser.json());

const roteador = require("./rotas/fornecedores");
app.use("/api/fornecedores", roteador);

app.use((erro, req, res, proximo) => {
  let status = 500
  if (erro instanceof NaoEncontrado) {
    status = 404
  } 
  if(erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
    status = 400
  }
  if(erro instanceof ValorNaoSuportado) {
    status = 406
  }
  res.status(status)
  res.send(
    JSON.stringify({
      mensagem: erro.message,
    })
  );
});

app.listen(config.get("api.porta"), () =>
  console.log("A API está funcionando!")
);
