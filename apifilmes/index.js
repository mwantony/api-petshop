const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.get('/api/filmes', (requisicao, resposta) => {
  const filmes = [
    {nome: 'Vingadores'},
    {nome: 'Arlequina'},
    {nome: 'Batman'}
  ]
  resposta.send(JSON.stringify(filmes))
})
app.listen(3000, () => console.log('API já está funcionando e aceitando requisições!'))