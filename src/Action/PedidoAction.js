import axios from "axios";

const urlGet = "http://localhost:5000/api/pedido";


var getPedidos = function GetPedido()
{
    return axios.get(urlGet);
}

export { 
    getPedidos
}