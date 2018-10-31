import axios from 'axios';
import EndpointFactory from 'axios-endpoints';
import PedidoModel from '../models/pedidoModel'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api'
});

const Endpoint = EndpointFactory(axiosInstance);

const getPedidoEndPoint = new Endpoint(({ id = '' }) => '/Pedido');
const patchPedidoEndPoint = new Endpoint(({ id = '' }) => '/Pedido/' + id +'/status');

function getPedidos() {
   return getPedidoEndPoint.get();
}

function addPedido(pedido){
    return patchPedidoEndPoint.post(pedido);
}

function patchPedido(pedido){
    var js = {status: pedido.status};
     return patchPedidoEndPoint.patch(js,{ uriParams:{id: pedido.id} });
}

export {
    getPedidos,
    addPedido,
    patchPedido
}
