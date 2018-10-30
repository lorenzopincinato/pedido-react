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

  import {PedidoToAprove, PedidoToInsert} from '../home/pedido/index'

 class App extends Component {

  render() {
    const { path } = this.props.match;
    return (
      <div>
        <Navbar color="light" light expand="md">
          <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink>
                    <Link to={`${path}`}>Pagina Principal</Link>
                  </NavLink>               
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Pedidos
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to={`${path}/cadastro`}>Cadastro</Link>
                  </DropdownItem>
                  <DropdownItem>
                   <Link to={`${path}/aprovacao`}>Aprovacao</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
          </Nav>
        </Navbar>
        <div className='tabs'>
          <Switch>
            <Route path={`${path}/cadastro`} component={PedidoToInsert} />
            <Route path={`${path}/aprovacao`} component={PedidoToAprove} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;