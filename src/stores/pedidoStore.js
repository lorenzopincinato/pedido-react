import { observable, decorate } from 'mobx';
import PedidoModel from '../models/pedidoModel'
import { getPedidos, putPedido } from '../actions/pedidoAction';

class  PedidoStore {

    pedidos = [];

    criarPedido(){     
        this.pedidos.push(new PedidoModel(this, this.getNewBlockID(), "", "","", "", 'pendente', true));
    }

    addPedidosAprovacao(pedidosJS) {
        this.pedidos = [];
        pedidosJS.forEach(pedido => {
            if (pedido.status === 0)
                this.pedidos.push(new PedidoModel(this, pedido.id, pedido.descricao, pedido.empresa, pedido.cnpj, pedido.valor, pedido.status, false))
        });
    }

    addPedidosHistorico(pedidosJS) {
        this.pedidos = [];
        pedidosJS.forEach(pedido => {
            if (pedido.status !== 0)
                this.pedidos.push(new PedidoModel(this, pedido.id, pedido.descricao, pedido.empresa, pedido.cnpj, pedido.valor, pedido.status, false))
        });
    }

    listarPedidosAprovacao(){
        getPedidos().then(response => {
            this.addPedidosAprovacao(response.data);
        }).catch(e => {
            window.alert("Ocorreu um erro");
        });
    }

    listarPedidosHistorico(){
        getPedidos().then(response => {
            this.addPedidosHistorico(response.data);
        }).catch(e => {
            window.alert("Ocorreu um erro");
        });
    }

    enviar(){
        this.getAtualizados().forEach(pedido => {
            putPedido({id: pedido.id, status: pedido.status}).then(() => {
                pedido.atualizado = false;
            }).catch(e => {
                window.alert("Erro ao enviar alterações");
            })
       });
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

    getNewBlockID() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }

    getNewID() {  
        return this.getNewBlockID() 
        +this.getNewBlockID() 
        + '-' 
        +this.getNewBlockID() 
        + '-' +this.getNewBlockID()
        + '-' + this.getNewBlockID() 
        + '-' + this.getNewBlockID() 
        + this.getNewBlockID() 
        + this.getNewBlockID();
      }
}

decorate(PedidoStore, {
    pedidos: observable
});

export default PedidoStore;
