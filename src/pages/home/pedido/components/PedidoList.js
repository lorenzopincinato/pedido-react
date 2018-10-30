import React, { Component } from 'react'
import { observer } from 'mobx-react';
import { Table,  Button, ButtonGroup } from 'reactstrap';

const PedidoList = observer(class PedidoListView extends Component {
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
                <ButtonGroup>
                <Button outline color="success" onClick={() => {pedido.aprovar()}} active={pedido.status === 'approved'}>Aprovar</Button>
                <Button outline color="danger"  onClick={() => {pedido.rejeitar()}} active={pedido.status === 'rejected'}>Rejeitar</Button>
                </ButtonGroup>{' '}
                <Button outline color="warning" onClick={() => pedido.limpar()}>Limpar</Button>
            </td>
        </tr>
    );
})

export default PedidoList;
