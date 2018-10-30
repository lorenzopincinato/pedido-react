import axios from 'axios';
import EndpointFactory from 'axios-endpoints';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api'
});

const Endpoint = EndpointFactory(axiosInstance);

const pedidoEndpoint = new Endpoint(({ id = '' }) => '/Pedido' + id);

function getPedidos(callback) {
    pedidoEndpoint.get().then(response => {
       callback(response.data);
    }).catch(e => {
       console.log(e);
    });
}

export {
    getPedidos
}
