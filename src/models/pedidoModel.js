import { observable, decorate } from "mobx"

class PedidoModel {
    store;
    id;
    descricao;
    empresa;
    cnpj;
    valor;
    status;
    alterado;
    criado;

    constructor(store, id, descricao, empresa, cnpj, valor, status, criado) {
        this.store = store;
        this.id = id;
        this.descricao = descricao;
        this.empresa = empresa;
        this.cnpj = cnpj;
        this.valor = valor;
        this.status = status;
        this.alterado = false;
        this.criado = criado;
    }

    destroy() {
		this.store.pedidos.remove(this);
	}

    setId(id) {
        this.id = id;
    }

    setValor(valor) {
        this.valor = valor;
        this.alterado = true;
    }

    aprovar() {
        this.status = 'aprovado'
        this.alterado = true;
    }

    rejeitar() {
        this.status = 'rejeitado';
        this.alterado = true;
    }

    limpar() {
        this.status = 'pendente';
        this.alterado = true;
    }

    toJS() {
		return {
			id: this.id,
			descricao: this.descricao,
            empresa: this.empresa,
            cnpj: this.cnpj,
            valor: this.valor,
		};
    }

    fromJS(store, object) {
        return new PedidoModel(store, object.id, object.descricao, object.empresa, object.cnpj, object.valor, object.status, false);
    }
}

decorate(PedidoModel, {
    id: observable,
    valor: observable,
    status: observable,
    alterado: observable,
    criado: observable
});

export default PedidoModel;
