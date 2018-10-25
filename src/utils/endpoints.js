import axios from "axios";
import EndpointFactory from "axios-endpoints";

const axiosInstance = axios.create({
    baseURL: "https://localhost:8080/api"
});

const Endpoint = EndpointFactory(axiosInstance);

const pedidoEndpoint = new Endpoint("/Pedido");

export { 
    pedidoEndpoint
}
