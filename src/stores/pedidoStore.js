import { observable, decorate } from 'mobx';
import PedidoModel from '../models/pedidoModel'
import { getPedidos, patchPedido } from '../actions/pedidoAction';

class  PedidoStore {

    pedidos = [];

    criarPedido(){     
        this.pedidos.push(new PedidoModel(this, this.getNewBlockID(), "", "","", "", 0, true));
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

    enviarAprovados(){
        try{
            this.getAtualizados().forEach(async (pedido) => 
            {
                var ret = await patchPedido({id: pedido.id, status: pedido.status});
                
                console.log(ret);
            });
            
            return true;
        }
        catch(err)
        {
            return false;
        }
    }

    enviarHistorico(store){
        var index = 0;
        var pedidos = this.getAtualizados();

        pedidos.forEach(pedido => {
            patchPedido({id: pedido.id, status: pedido.status}).then(() => {
                index++;
                if (pedidos.length === index)
                    store.listarPedidosHistorico();
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
        return  this.pedidos.filter((pedido) => {return pedido.criado}); 
    }

    getAtualizados() {
      return  this.pedidos.filter((pedido) => {return pedido.alterado}); 
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
