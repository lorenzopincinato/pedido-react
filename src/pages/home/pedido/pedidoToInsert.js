import React, { Component } from 'react';
import {Button, Input, InputGroup, InputGroupAddon} from 'reactstrap';
import {addPedido} from '../../../actions/pedidoAction'

class PedidoToInsert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empresa: '',
      cnpj:'',
      descricao:'',
      valor:0
     };

  }

  salvar(){
    var pedido = {
                  empresa: this.state.empresa,
                  cnpj: this.state.cnpj,
                  descricao: this.state.descricao,
                  valor: this.state.valor
    }

    addPedido(pedido,this.carregar,this.exibirErro).then((result) => {
     window.alert("Registro salvo com sucesso");
     this.carregar();  
  }).catch((err) => {
    window.alert(err);
  });;   

  }

  carregar(){
    this.setState({empresa:'',cnpj:'',descricao:'',valor:0});
  }


  render() {
    return (
        <div>
            <InputGroup>
                    <InputGroupAddon addonType="prepend">Empresa:</InputGroupAddon>
                    <Input placeholder="Empresa" value={this.state.empresa} onChange={(e) => this.setState({empresa: e.target.value})} />
            </InputGroup>
            <br/>
            <InputGroup>
                    <InputGroupAddon addonType="prepend">CNPJ:</InputGroupAddon>
                    <Input placeholder="CNPJ" value={this.state.cnpj} onChange={(e) => this.setState({cnpj: e.target.value})}  />
            </InputGroup>
            <br/>
            <InputGroup>
                        <InputGroupAddon addonType="prepend">Descrição:</InputGroupAddon>
                        <Input placeholder="Descrição" value={this.state.descricao} onChange={(e) => this.setState({descricao: e.target.value})}  />
            </InputGroup>
            <br/>
            <InputGroup>
                        <InputGroupAddon addonType="prepend">Valor:</InputGroupAddon>
                        <Input type="number" placeholder="Valor" value={this.state.valor} onChange={(e) => this.setState({valor: e.target.value})}  />
            </InputGroup>
            <br/>
            <Button color="primary" onClick={() => this.salvar()}>Salvar</Button>
        </div>
    )
  }
}

export default PedidoToInsert;
