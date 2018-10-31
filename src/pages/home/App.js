import React,{Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavLink,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
  } from 'reactstrap';

  import {PedidoToAprove, PedidoToInsert,PedidoHistory} from '../home/pedido/index'

 class App extends Component {

  render() {
    const { path } = this.props.match;
    return (
      <div>
        <Navbar color="light" light expand="md">
          <Nav className="ml-auto" navbar>
                <NavItem>            
                    <Link to={`${path}`}><NavLink>Pagina Principal</NavLink></Link>                       
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Pedidos
                </DropdownToggle>
                <DropdownMenu right>
                    <Link to={`${path}/cadastro`}>
                      <DropdownItem>Cadastro</DropdownItem>
                    </Link>                
                   <Link to={`${path}/aprovacao`}>  
                      <DropdownItem>Aprovação</DropdownItem>
                   </Link>              
                    <Link to={`${path}/historico`}><DropdownItem>Histórico </DropdownItem></Link> 
                </DropdownMenu>
              </UncontrolledDropdown>
          </Nav>
        </Navbar>
        <div className='tabs'>
          <Switch>
            <Route path={`${path}/cadastro`} component={PedidoToInsert} />
            <Route path={`${path}/aprovacao`} component={PedidoToAprove} />
            <Route path={`${path}/historico`} component={PedidoHistory} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;