import axios from 'axios';
import EndpointFactory from 'axios-endpoints';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api'
});

const Endpoint = EndpointFactory(axiosInstance);

const pedidoEndpoint = new Endpoint(({ id = '' }) => '/Pedido' + id);

function getPedidos() {
   return pedidoEndpoint.get();
}

function addPedido(pedido){
    return pedidoEndpoint.post(pedido);
}

export {
    getPedidos,
    addPedido
}
