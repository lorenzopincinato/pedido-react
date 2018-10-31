import React, {Component} from 'react';
import { Button} from 'reactstrap';
import PedidoStore from '../../../stores/pedidoStore';
import PedidoListHistory from './components/PedidoListHistory';

const store = new PedidoStore();

class PedidoHistory extends Component {

    componentDidMount(){
        store.listarPedidosHistorico();
    }

    render() {
        return (
           <React.Fragment>
                <PedidoListHistory pedidoList={store} />              
                <Button color="warning" onClick={() => store.limparTodos()}>Limpar</Button>{' '}
                <Button color="primary" onClick={() => store.enviarHistorico(store)}>Enviar</Button>{' '}
            </React.Fragment>
        );
    }
}

export default PedidoHistory;
