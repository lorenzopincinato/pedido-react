import React, { Component } from 'react';
import PedidoList from './PedidoList';
import PedidoStore from '../stores/pedidoStore';
import { Button} from 'reactstrap';

const store = new PedidoStore();
store.sincronizarComAPI();

class App extends Component {
  render() {
    return (
      <div> 
        <PedidoList pedidoList={store} />    
        
        <Button color="success" onClick={() => store.aprovarTodos}>Aprovar</Button>{' '}
        <Button color="danger" onClick={() => store.rejeitarTodos}>Rejeitar</Button>{' '}
        <Button color="warning" onClick={() => store.limparTodos}>Limpar</Button>{' '}
        <Button color="primary" onClick={() => store.sincronizarComAPI}>Enviar</Button>{' '}
      </div>
    );
  }
}

export default App;
