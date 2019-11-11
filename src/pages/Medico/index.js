import React, { Component } from 'react';
import './style.css';
import api from '../../services/api';
//import axios from 'axios';

class Medico extends Component {
    constructor(props) {
        super(props);
        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeSobrenome = this.onChangeSobrenome.bind(this);
        this.onChangeCRM = this.onChangeCRM.bind(this);
        this.onChangeDDD = this.onChangeDDD.bind(this);
        this.onChangeTelefone = this.onChangeTelefone.bind(this);
        this.onChangeEstado = this.onChangeEstado.bind(this);
        this.onChangeCidade = this.onChangeCidade.bind(this);
        this.adicionaEspec = this.adicionaEspec.bind(this);
        this.limpaEspecs = this.limpaEspecs.bind(this);
    };

    state = {
        nome: '',
        sobrenome: '',
        crm: '',
        ddd: '',
        telefone: '',
        estado: '',
        cidade: '',
        especs: [],
        estadosEscolha: [],
        cidadesEscolha: [],
        especsEscolha: [
            "ALERGOLOGIA",
            "ANGIOLOGIA",
            "BUCO MAXILO",
            "CARDIOLOGIA CLÍNICA",
            "CARDIOLOGIA INFANTIL",
            "CIRURGIA CABEÇA E PESCOÇO",
            "CIRURGIA CARDÍACA",
            "CIRURGIA DE TORAX",
            "CIRURGIA GERAL",
            "CIRURGIA PEDIÁTRICA",
            "CIRURGIA PLÁSTICA",
            "CIRURGIA TORÁCICA",
            "CIRURGIA VASCULAR",
            "CLÍNICA MÉDICA"
        ]
    };

    componentDidMount() {
        this.loadDados();
        this.loadEstados();
    };

    loadDados = async () => {
        try {
            const crm = this.props.match.params.crm;
            const res = await api.get(`/gcb/api/v1/medico/${crm}`);
            if (res.data.data) {
                //console.log(res.data.data);
                this.setState({nome: res.data.data.nome});
                this.setState({sobrenome: res.data.data.sobrenome});
                this.setState({crm: res.data.data.crm});
                this.setState({ddd: res.data.data.ddd});
                this.setState({telefone: res.data.data.telefone});
                this.setState({estado: res.data.data.estado});
                this.setState({cidade: res.data.data.cidade});
                this.setState({especs: res.data.data.espec});
            }
        } catch (error) {
            if (error.status < 500) {
                return alert(error.data.message);
            }; 
        }
    };

    loadEstados = async () => {
        try {
            const res = await api.get('/estados/uf');
            if (res.data) {
                var arr = res.data.map(function(item) {
                    return item.state;
                });
                this.setState({estadosEscolha: arr});
                // console.log(this.state.estadosEscolha);
            }
        } catch (error) {
            if (error.response.status < 500) {
                return alert(error.response.data.message);
            }; 
        }
    };

    loadCidades = async () => {
        let uf = this.menu_uf.value;
        try {
            const res = await api.get(`/estados/cid?uf=${uf}`);
            if (res.data) {
                var arr = res.data.cities.map(function(item) {
                    return item;
                });
                this.setState({cidadesEscolha: arr});
                // console.log(res.data.cities);
            }
        } catch (error) {
            if (error.response.status < 500) {
                return alert(error.response.data.message);
            }; 
        }
    };

    onChangeNome(e) {
        var code = e.keyCode || e.which;
        if (code === 13) {
            e.preventDefault();
            return false;
        }
        this.setState({nome: e.target.value.replace(/[^\w\-]+/g, '')});
        // console.log(this.state.nome);
    };

    onChangeSobrenome(e) {
        var code = e.keyCode || e.which;
        if (code === 13) {
            e.preventDefault();
            return false;
        }
        this.setState({sobrenome: e.target.value.replace(/[^\w\-]+/g, '')});
    };

    onChangeCRM(e) {
        var code = e.keyCode || e.which;
        if (code === 13) {
            e.preventDefault();
            return false;
        }
        this.setState({crm: e.target.value.replace(/[^\d]/, '')});
    }

    onChangeDDD(e) {
        var code = e.keyCode || e.which;
        if (code === 13) {
            e.preventDefault();
            return false;
        }
        this.setState({ddd: e.target.value.replace(/[^\d]/, '')});
    };

    onChangeTelefone(e) {
        var code = e.keyCode || e.which;
        if (code === 13) {
            e.preventDefault();
            return false;
        }
        this.setState({telefone: e.target.value.replace(/[^\d]/, '')});
    };

    // selects
    onChangeEstado(e) {
        var code = e.keyCode || e.which;
        if (code === 13) {
            e.preventDefault();
            return false;
        }
        this.setState({estado: e.target.value});
        this.loadCidades();
    };

    onChangeCidade(e) {
        var code = e.keyCode || e.which;
        if (code === 13) {
            e.preventDefault();
            return false;
        }
        this.setState({cidade: e.target.value});
    };

    // adicona espec
    adicionaEspec(e) {
        e.preventDefault();
        let esp = this.menu_esp.value;
        let arr = [...this.state.especs];
        arr.push(esp);
        this.setState({especs: arr});
        // console.log(esp);
        // console.log(this.state.especs);
    };

    // limpa lista de especializações
    limpaEspecs(e) {
        e.preventDefault();
        let arr = [];
        this.setState({especs: arr});
    }

    alterarMedico = async (e) => {
        e.preventDefault();
        
        const newMedico = {
            nome: this.state.nome,
            sobrenome: this.state.sobrenome,
            crm: this.state.crm,
            ddd: this.state.ddd,
            telefone: this.state.telefone,
            estado: this.state.estado,
            cidade: this.state.cidade,
            espec: this.state.especs
        };

        try {
            const crm = this.state.crm;
            const res = await api.put(`/gcb/api/v1/medico/${crm}`, newMedico);
            if (res.status == 201) {
                return alert(res.data.message);
            };
        } catch (error) {
            if (error.status < 500) {
                return alert(error.data.message);
            };
        }
    };

    excluirMedico = async (e) => {
        e.preventDefault();
        try {
            const crm = this.state.crm;
            const res = await api.delete(`/gcb/api/v1/medico/${crm}`);
            if (res.status == 200) {
                alert(res.data.message);
            };
        } catch (error) {
            if (error.status < 500) {
                alert(error.data.message);
            };
        }
        this.props.history.push('/');
    };

    render() {
        return(
            <div className="medico">
                <div className="row">
                    <label>Dados do Médico</label>
                    <form className="form">
                        <div className="form-group">
                            <input type="text" placeholder="Nome"
                            className="form-control"
                            value={this.state.nome}
                            onChange={this.onChangeNome}></input>
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Sobrenome" 
                            className="form-control"
                            value={this.state.sobrenome}
                            onChange={this.onChangeSobrenome}></input>
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="CRM" disabled
                            className="form-control" maxLength={9}
                            value={this.state.crm}
                            onChange={this.onChangeCRM}
                            onKeyPress={this.onChangeCRM}></input>
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="DDD. Ex: 13"
                            className="form-control" maxLength={2}
                            value={this.state.ddd}
                            onChange={this.onChangeDDD}
                            onKeyPress={this.onChangeDDD}></input>
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Telefone. Ex: 33248827"
                            className="form-control"maxLength={8}
                            value={this.state.telefone}
                            onChange={this.onChangeTelefone}
                            onKeyPress={this.onChangeTelefone}></input>
                        </div>
                        <div className="form-group">
                            <select ref={(input)=> this.menu_uf = input}
                            className="form-control"
                            value={this.state.estado} onChange={this.onChangeEstado}>
                                <option value="" disabled defaultValue>Selecione o estado</option>
                                {
                                    this.state.estadosEscolha.map((uf, index) => {
                                        return (
                                            <option key={index} value={uf}>{uf}</option>
                                        )
                                    })
                                }                                
                            </select>
                        </div>
                        <div className="form-group">
                            <select ref={(input)=> this.menu_cid = input}
                            className="form-control"
                            value={this.state.cidade} onChange={this.onChangeCidade}>
                                <option value="" disabled defaultValue>{this.state.cidade}</option>
                                {
                                    this.state.cidadesEscolha.map((cid, index) => {
                                        return (
                                            <option key={index} value={cid}>{cid}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group input-group mb-3">
                            <small className="small">Selecione e adicione especializações em que o médico atua. Inclua quantas forem necessárias!</small>
                            <select ref={(input)=> this.menu_esp = input}
                            className="form-control">
                                {
                                    this.state.especsEscolha.map((esps, index) => {
                                        return (
                                            <option key={index} value={esps}>{esps}</option>
                                        )
                                    })
                                }
                            </select>
                            <button className="btn btn-outline-secondary" type="button"
                            onClick={this.adicionaEspec}>Adicionar</button>
                            <div className="borda especs">
                                {
                                    this.state.especs.map((esp, index) => {
                                        return (
                                            <h6 key={index}><span className="badge badge-pill badge-info">{esp}</span></h6>
                                        )
                                    })
                                }                                
                            </div>
                            <small onClick={this.limpaEspecs} className="small click">[X] Limpar lista de especialidades</small>
                        </div>                        
                        <div className="form-group">
                            <button type="button" className="btn btn-lg btn-secondary"
                            onClick={this.alterarMedico}>SALVAR</button>
                            <button type="button" className="btn btn-lg btn-secondary"
                            onClick={this.excluirMedico}>EXCLUIR</button>
                        </div>                        
                    </form>
                </div>
            </div>
        );
    }
};

export default Medico;