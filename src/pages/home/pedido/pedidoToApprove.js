import React, {Component} from 'react';
import PedidoList from "./components/PedidoList";
import { Button} from 'reactstrap';
import PedidoStore from '../../../stores/pedidoStore';

const store = new PedidoStore();
class PedidoToApprove extends Component {

  componentDidMount(){
    store.listarPedidosAprovacao();
  }
  

  enviarAprovados(){
    var result = store.enviarAprovados();
    if(result){
      setTimeout(
        function() {
            store.listarPedidosAprovacao();
        },
        500
    );
    }else{
      window.alert('Ocorreu um erro ao executar a requisição')
    }
  }

    render() {
      return (
        <div> 
          <PedidoList pedidoList={store} />              
          <Button color="success" onClick={() => store.aprovarTodos()}>Aprovar</Button>{' '}
          <Button color="danger" onClick={() => store.rejeitarTodos()}>Rejeitar</Button>{' '}
          <Button color="warning" onClick={() => store.limparTodos()}>Limpar</Button>{' '}
          <Button color="primary" onClick={() => this.enviarAprovados()}>Enviar</Button>{' '}
        </div>
      );
    }
  }

  export default PedidoToApprove;