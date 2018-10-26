import { observable, decorate } from "mobx"
import { getPedidos } from "../Action/PedidoAction";

class Pedido {
    id = 0;
    valor = 0;
    descricao = "";
    empresa = "";
    cnpj = "";
    status = null;
    changed = false;
    created = true;
}

decorate(Pedido, {
    valor: observable,
    status: observable,
    changed: observable,
    created: observable
});

class PedidoStore{

    pedidos = [];

    sendChanges() {
        var updates = this.filterUpdated();
        var creates = this.filterCreated();

        console.log('Updated: ' + updates);
        console.log('Created: ' + creates);
        //this.updatePedidos(updates);
        //this.createPedidos(creates);
    }
    
    filterUpdated() {
        var updated = [];
        this.pedidos.forEach(pedido => {
            if (pedido.changed)
                updated.push(pedido);
        })

        return updated;
    }

    filterCreated() {
        var created = [];
        this.pedidos.forEach(pedido => {
            if (pedido.created)
                created.push(pedido);
        })

        return created;
    }

    getPedidos() {
        getPedidos().then(response=>{
            response.data.forEach(pedido => {

                var newPedido = new Pedido();

                newPedido.id = pedido.id;
                newPedido.empresa = pedido.empresa;
                newPedido.cnpj = pedido.cnpj;
                newPedido.valor = pedido.valor;
                newPedido.descricao = pedido.descricao;
                newPedido.status = pedido.status;
                newPedido.changed = false;
                newPedido.created = false;

                this.pedidos.push(newPedido);
            });

        }).catch(e=>{
           console.log(e);
        });
    }

    createPedidos(cratedPedidos) {

    }
}

decorate(PedidoStore, {
    pedidos: observable
});

export {
    Pedido,
    PedidoStore
}
