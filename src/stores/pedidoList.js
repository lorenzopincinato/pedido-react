import { observable, decorate } from "mobx"

class Pedido {
    id = 0;
    valor = 0;
    description = "";
    status = null;
}

decorate(Pedido, {
    status: observable
});

class PedidoList {
    pedidos = [];
}

decorate(PedidoList, {
    pedidos: observable
});

export {
    Pedido,
    PedidoList
}
