import React, { Component } from 'react';
import { PedidoListView } from '../../components';
import { Pedido, PedidoList } from '../../stores/pedidoList';
import { Button} from 'reactstrap';

const store = new PedidoList();

store.getPedidos();

class App extends Component {
  render() {
    return (
      <div>
        <PedidoListView pedidoList={store} />
        <Button color="success" onClick={() => store.pedidos.forEach(pedido => {pedido.status = 'approved';  pedido.changed = true})}>Aprovar</Button>{' '}
        <Button color="danger" onClick={() => store.pedidos.forEach(pedido => {pedido.status = 'rejected';  pedido.changed = true})}>Rejeitar</Button>{' '}
        <Button color="warning" onClick={() => store.pedidos.forEach(pedido => {pedido.status = null;  pedido.changed = true})}>Limpar</Button>{' '}
        <Button color="primary" onClick={() => store.sendChanges()}>Enviar</Button>{' '}
      </div>
    );
  }
}

export default App;
