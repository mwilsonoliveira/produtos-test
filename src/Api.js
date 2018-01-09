import axios from 'axios'

//Esse componente serve para fazer as requisições com o banco dinamicamente
//As funções em 'arrow functions' são para facilitar o código nos outros componentes e retornar uma 'promise'

const api = axios.create({
  baseURL: 'http://localhost:3001'
})

const apis = {
  readCategoria: (id) => api.get('categorias/'+id),
  loadCategorias: ()=> api.get('categorias'),
  deleteCategoria: (id) => api.delete('categorias/'+id),
  createCategoria: (categoria) =>  api.post('categorias', categoria),
  editCategoria: (categoria) =>  api.put('categorias/'+categoria.id, categoria),

  readProduto: (id) => api.get('produtos/'+id),
  createProduto: (produto) =>  api.post('produtos', produto),
  loadProdutos: (categoria) => api.get('produtos?categoria='+categoria),
  deleteProduto: (id) => api.delete('produtos/'+id),
  editProduto: (produto) => api.put('produtos/'+produto.id, produto)

}

export default apis