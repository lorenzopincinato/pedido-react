import { observable, decorate } from 'mobx';
import PedidoModel from '../models/pedidoModel'
import { getPedidos } from '../actions/pedidoAction';

class  PedidoStore {
    pedidos = [];

    addPedido(descricao, empresa, cnpj, valor) {
        this.pedidos.push(new PedidoModel(this, '?', descricao, empresa, cnpj, valor, 'pendente', true));
    }

    addPedidos(pedidos) {
        pedidos.forEach(pedido => this.addPedido(pedidos));
    }

    sincronizarComAPI() {
        getPedidos(this.addPedidos);
    }

    aprovarTodos() {
        this.pedidos.forEach(
            pedido => pedido.aprovar()
        );
    }

    rejeitarTodos() {
        this.pedidos.forEach(
            pedido => pedido.rejeitar()
        );
    }

    limparTodos() {
        this.pedidos.forEach(
            pedido => pedido.limpar()
        );
    }

    getCriados() {
        var criados = [];

        this.pedidos.forEach(
            pedido => {
                if (pedido.criado)
                    criados.push(pedido);
            }
        );

        return criados;
    }

    getAtualizados() {
        var atualizados = [];
        
        this.pedidos.forEach(
            pedido => {
                if (pedido.alterado && !pedido.criado)
                    atualizados.push(pedido);
            }
        );

        return atualizados;
    }   
}

decorate(PedidoStore, {
    pedidos: observable
});

export default PedidoStore;
