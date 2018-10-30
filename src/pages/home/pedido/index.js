import React, {Component} from 'react';
import PedidoList from "./components/PedidoList";
import { Button} from 'reactstrap';
import PedidoStore from '../../../stores/pedidoStore';

const store = new PedidoStore();
store.sincronizarComAPI();


class PedidoGridView extends Component {
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

  export default PedidoGridView;