import React, { Component } from 'react'
import { observer } from 'mobx-react';
import { Table, Input, InputGroup, InputGroupAddon, InputGroupText, Button, ButtonGroup } from 'reactstrap';

const PedidoListView = observer(class PedidoListView extends Component {
    render() {
        return (
            <Table hover size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                    {this.props.pedidoList.pedidos.map(pedido =>
                        <PedidoView key={pedido.id} pedido={pedido} />
                    )}
                </tbody>
            </Table>
        );
    }
});

const PedidoView = observer(({pedido}) => {   
    return(
        <tr  key={pedido.id}>
            <th scope="row">{pedido.id}</th>
            <td>{pedido.description}</td>
            <td>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText>R$</InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="100.000,00" value={pedido.valor}  onChange={(e) => {pedido.valor = e.target.value; pedido.changed = true}}/>
                </InputGroup>
            </td>
            <td> 
                <ButtonGroup>
                <Button outline color="success" onClick={() => {pedido.status = 'approved'; pedido.changed = true}} active={pedido.status === 'approved'}>Aprovar</Button>
                <Button outline color="danger"  onClick={() => {pedido.status = 'rejected'; pedido.changed = true}} active={pedido.status === 'rejected'}>Rejeitar</Button>
                </ButtonGroup>{' '}
                <Button outline color="warning" onClick={() => pedido.status = null}>Limpar</Button>
            </td>
        </tr>
    );
})

export default PedidoListView;
