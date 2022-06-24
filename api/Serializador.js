const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
class Serializador {
  json(dados) {
    return JSON.stringify(dados)
  }
  serializar(dados) {
    if(this.contentType === 'application/json') {
      return this.json(
        this.filtrar(dados)
      )
    } 
    throw new ValorNaoSuportado(this.contentType)
  }
  filtrarObjeto(dados) {
    const novoObjeto = {}
    this.camposPublicos.map((campo) => {
      if(dados.hasOwnProperty(campo)) {
        novoObjeto[campo] = dados[campo]
      }
    })
    return novoObjeto
  }
  filtrar (dados) {
    if(Array.isArray(dados)) {
      dados = dados.map(item => this.filtrarObjeto(item))
    } else {
      dados = this.filtrarObjeto(dados)
    }
    return dados
  }
}

class SerializadorFornecedor extends Serializador {
  constructor(contentType, camposExtras) {
    super()
    this.contentType = this.contentType;
    this.camposPublicos = [
      'id',
      'empresa',
      'categoria'
    ].concat(camposExtras || [])
  }
}
class SerializadorErro extends Serializador {
  constructor(contentType, camposExtras) {
    super()
    this.contentType = contentType
    this.camposPublicos = [ 
      'id',
      'mensagem'
    ].concat(camposExtras || [])
  }
}

module.exports = {
  Serializador: Serializador,
  SerializadorFornecedor: SerializadorFornecedor,
  SerializadorErro: SerializadorErro,
  formatosAceitos: ['application/json']
}