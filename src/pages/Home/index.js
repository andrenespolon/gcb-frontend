import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import api from '../../services/api';
//import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);
        this.onChangeItemPesquisa = this.onChangeItemPesquisa.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    state = {
        load: false,
        lista: false,
        msg: '',
        itemPesquisa: '',
        medicos: [],
        esp: []
    };

    onChangeItemPesquisa(e) {
        var code = e.keyCode || e.which;
        if (code === 13) {
            e.preventDefault();
            return false;
        }
        this.setState({itemPesquisa: e.target.value.replace(/[^\w\-]+/g, '').toUpperCase() });
    };

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({load:true});
        this.setState({msg: 'Pesquisando...'});
        var text = this.state.itemPesquisa;

        try {
            const res = await api.get(`/gcb/api/v1/${text}`);            
            // console.log(res.data);
            if (res.data.data.length > 0) {
                // exibe a lista
                this.setState({load:false});
                this.setState({lista:true});
                this.setState({medicos: res.data.data});
                this.setState({esp: res.data.data.espec});
                window.scrollTo(0, 350);
            }
            else {
                // esconde a lista
                this.setState({load:true});
                this.setState({msg: 'Nenhum médico encontrado.'});
                this.setState({lista:false});
            }
        } catch (error) {
            if (error.response.status < 500) {
                return alert(error.response.data.message);
                // console.log(error);
            };            
        };        
    };

    render() {
        const styleLoad = this.state.load ? {} : { display: 'none' };
        const viewLista = this.state.lista ? {} : { display: 'none' };
        const isEnabled = this.state.itemPesquisa.length > 0;
        return (
            <div className="home">
                <div className="row">
                    <label>Localize um médico especialista. <br/> Pesquise pelo nome, sobrenome ou pelo número de seu CRM.</label>
                    <form>
                        <input type="text" value={this.state.itemPesquisa} 
                        onChange={this.onChangeItemPesquisa}
                        onKeyPress={this.onChangeItemPesquisa} 
                        className="form-control form-control-lg" 
                        id="pesquisa" placeholder="Ex: JORGE"></input>
                        <small className="form-text text-muted">Para melhorar sua busca, evite utilizar caracteres especiais e espaços.</small>
                        <button type="button" className="btn btn-lg btn-secondary" disabled={!isEnabled}
                        onClick={this.onSubmit}>PESQUISAR</button>
                    </form>
                </div>
                
                <div className="list">
                    <div id="alert" className="alert alert-secondary" role="alert" style={styleLoad}>
                        {this.state.msg}
                    </div>
                    <div className="lista table" style={viewLista}>
                        <table className="table table-responsive-sm table-borderless table-striped">
                            <thead>
                                <tr>
                                    <th className="col-A">Nome</th>
                                    <th className="col-A">CRM</th>
                                    <th className="col-A">Cidade</th>
                                    <th className="col-B">Estado</th>
                                    <th className="col-C">Especialidades</th>                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.medicos.map((docs, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><Link className="link" to={`/medico/${docs.crm}`}>{docs.nome + ' ' + docs.sobrenome}</Link></td>
                                            <td>{docs.crm}</td>
                                            <td>{docs.cidade}</td>
                                            <td>{docs.estado}</td>
                                            <td className="especs">{
                                                //docs.espec
                                                docs.espec.map((arr, id) => <h6 key={id}><span className="badge badge-pill badge-info">{arr}</span></h6>)
                                            }</td>
                                        </tr>
                                    );
                                })
                                }
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </div>
        );
    };
};

export default Home;

//<button className="btn btn-sm btn-light">LIMPAR</button>