import React, { Component } from 'react';
import { PedidoListView } from '../../components';
import { Pedido, PedidoList } from '../../stores/pedidoList';
import { Button} from 'reactstrap';

const store = new PedidoList();

var i;
for (i = 0; i < 10; i++) { 
  var pedido = new Pedido();
  pedido.id = i;
  pedido.description = 'Exemplo ' + i;

  store.pedidos.push(pedido);
}

class App extends Component {
  render() {
    return (
      <div>
        <PedidoListView pedidoList={store} />
        <Button color="success" onClick={() => store.pedidos.forEach(pedido => {pedido.status = 'approved'})}>Aprovar</Button>{' '}
        <Button color="danger" onClick={() => store.pedidos.forEach(pedido => {pedido.status = 'rejected'})}>Rejeitar</Button>{' '}
        <Button color="warning" onClick={() => store.pedidos.forEach(pedido => {pedido.status = null})}>Limpar</Button>{' '}
      </div>
    );
  }
}

export default App;
