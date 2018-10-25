import { observable, decorate } from "mobx"
import { pedidoEndpoint } from "../utils/endpoints";

class Pedido {
    id = 0;
    valor = 0;
    description = "";
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

class PedidoList {
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
        pedidoEndpoint.get().then(response=>{
            response.data.forEach(pedido => {
                var newPedido = new Pedido();
                newPedido.id = pedido.id;
                newPedido.valor = pedido.valor;
                newPedido.description = pedido.description;
                newPedido.status = pedido.status;
                newPedido.changed = false;
                newPedido.created = false;

                this.pedidos.push(newPedido);
            });
        }).catch(e=>{
            console.log("Error");
        });
    }

    createPedidos(cratedPedidos) {

    }
}

decorate(PedidoList, {
    pedidos: observable
});

export {
    Pedido,
    PedidoList
}
