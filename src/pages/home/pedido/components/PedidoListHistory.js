import React, { Component } from 'react'
import { observer } from 'mobx-react';
import { Table,  Button, ButtonGroup } from 'reactstrap';

const PedidoListHistory = observer(class PedidoListView extends Component {
    render() {
        return (
            <Table hover size="sm">
                <thead>
                <tr>
       
                    <th>Empresa</th>
                    <th>CNPJ</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                    {
                        this.props.pedidoList.pedidos.map(pedido =>
                        <Pedido key={pedido.id} pedido={pedido} />
                    )}
                </tbody>
            </Table>
        );
    }
});

const Pedido = observer(({pedido}) => {   
    return(
        <tr  key={pedido.id}>
            <td>{pedido.empresa}</td>
            <td>{pedido.cnpj}</td>
            <td>{pedido.descricao}</td>
            <td>R$:{pedido.valor}</td>      
            <td> 
                {pedido.statusToString}
            </td>
        </tr>
    );
})

export default PedidoListHistory;
