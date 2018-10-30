import { observable, decorate } from 'mobx';
import PedidoModel from '../models/pedidoModel'
import { getPedidos } from '../actions/pedidoAction';

class  PedidoStore {

    pedidos = [];

    criarPedido(){     
        this.pedidos.push(new PedidoModel(this, this.getNewBlockID(), "", "","", "", 'pendente', true));
    }

    addPedidos(pedidosJS) {
        this.pedidos = [];
        pedidosJS.forEach(pedido => this.pedidos.push(new PedidoModel(this, pedido.id, pedido.descricao, pedido.empresa, pedido.cnpj, pedido.valor, pedido.status, false)));
    }

    listarPedidos(){
        getPedidos().then(response => {
            this.addPedidos(response.data);
        }).catch(e => {
            window.alert("Ocorreu um erro");
        });
    }

    enviar(){
       //TODO:Implementar Enviar
       this.listarPedidos();       
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
