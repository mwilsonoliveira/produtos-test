import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './Home'
import Produtos from './Produtos'
import Sobre from './Sobre'

class App extends Component {
  constructor(props){
    super(props)

    this.loadCategorias = this.loadCategorias.bind(this)
    this.createCategoria = this.createCategoria.bind(this)
    this.editCategoria = this.editCategoria.bind(this)
    this.removeCategoria = this.removeCategoria.bind(this)

    this.createProduto = this.createProduto.bind(this)
    this.loadProdutos = this.loadProdutos.bind(this)
    this.loadCategoria = this.loadCategoria.bind(this)
    this.removeProduto = this.removeProduto.bind(this)
    this.readProduto = this.readProduto.bind(this)
    this.editProduto = this.editProduto.bind(this)

    this.state = {
      categorias: [],
      categoria: [],
      produtos: []
    }
  }
  loadCategorias(){ //Carrega as categorias na lista lateral
    this.props.api.loadCategorias()
      .then(res => { //Ação que acontece depois da primeira ação, se acontecer isso acontece o de baixo!
        this.setState({
          categorias: res.data 
        })
      })
  }
  loadCategoria(categoria){
    this.props.api.readCategoria(categoria)
      .then((res) => {
        this.setState({
          categoria: res.data
        })
      })
  }
  removeCategoria(categoria){
    this.props.api.deleteCategoria(categoria.id)
      .then((res)=> this.loadCategorias())
  }
  createCategoria(categoria){
    this.props.api.createCategoria(categoria)
      .then((res)=> this.loadCategorias())
  }
  editCategoria(categoria){
    this.props.api.editCategoria(categoria)
      .then((res)=> this.loadCategorias())
  }

  createProduto(produto){
    return this.props.api.createProduto(produto)
  }
  loadProdutos(categoria){
    this.props.api.loadProdutos(categoria)
      .then((res) => {
        this.setState({
        produtos: res.data
      })
    })
  }
  removeProduto(produto){
    return this.props.api.deleteProduto(produto.id)
  }
  readProduto(id){
    return this.props.api.readProduto(id)
  }
  editProduto(produto){
    return this.props.api.editProduto(produto)
  }
  render() {
    return (
      <Router>
        <div className="App">
          <nav className='navbar navbar-inverse'>
            <div className='container'>
              <div className='navbar-header'>
                <Link to='/' className='navbar-brand'>
                  Gerenciador de Produtos
                </Link>
              </div>
              <ul className='nav navbar-nav'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/produtos'>Produtos</Link></li>
                <li><Link to='/sobre'>Sobre</Link></li>
              </ul>
            </div>
          </nav>
          <div className='container'>
            <Route exact path='/' component={Home} />
            <Route path='/produtos' render={(props) => {
                return (
                    <Produtos {...props} 
                      loadCategorias={this.loadCategorias}
                      createCategoria={this.createCategoria}
                      editCategoria={this.editCategoria}
                      removeCategoria={this.removeCategoria} 
                      categorias={this.state.categorias}

                      editProduto={this.editProduto}
                      readProduto={this.readProduto}
                      createProduto={this.createProduto}
                      loadProdutos={this.loadProdutos}
                      loadCategoria={this.loadCategoria}
                      categoria={this.state.categoria}
                      produtos={this.state.produtos}
                      removeProduto={this.removeProduto}
                    />
                  )
                } 
              }
            />
            <Route exact path='/sobre' component={Sobre} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
