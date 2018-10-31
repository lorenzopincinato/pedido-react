import React, {Component} from 'react';
import PedidoList from "./components/PedidoList";
import { Button} from 'reactstrap';
import PedidoStore from '../../../stores/pedidoStore';

const store = new PedidoStore();

class PedidoHistory extends Component {

    componentDidMount(){
        store.listarPedidosHistorico();
    }

    render() {
        return (
           <React.Fragment>
                <PedidoList pedidoList={store} />              
                <Button color="success" onClick={() => store.aprovarTodos()}>Aprovar</Button>{' '}
                <Button color="danger" onClick={() => store.rejeitarTodos()}>Rejeitar</Button>{' '}
                <Button color="warning" onClick={() => store.limparTodos()}>Limpar</Button>{' '}
                <Button color="primary" onClick={() => store.enviarHistorico(store)}>Enviar</Button>{' '}
            </React.Fragment>
        );
    }
}

export default PedidoHistory;
