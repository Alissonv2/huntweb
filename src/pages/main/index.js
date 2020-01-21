import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';

export default class Main extends Component {

    state = {
        imoveis: [],
        imovelInfo: {},
        page: 1,
    }

    componentDidMount() {
        this.loadImoveis();
    }

    loadImoveis = async (page = 1) => {
        const res = await api.get(`/?page=${page}`);

        const { listings, ...imovelInfo } = res.data.search.result;

        this.setState({ imoveis: listings, imovelInfo });
    }

    prevPage = () => {}

    nextPage = () => {
        const { page, imovelInfo } = this.state;
        
        if (page === imovelInfo.totalCount) return;

        const pageNumber = page + 1;
        this.loadImoveis(pageNumber);
    }

    render() {
        //desestruturando
        const { imoveis } = this.state;

        return (
            <div className="imovel-list" >
                { imoveis.map(imovel => (
                    <article key={ imovel.url.id }>
                        <strong>{ imovel.listing.title }</strong>
                        <img alt="Imóveis" src={imovel.listing.images[0].replace('{action}/{width}x{height}', 'fit-in/870x453')}/>
                        <p>{ imovel.listing.description.replace(/<br><br>/g, '').replace('Este é um Imóvel ZAP. Estamos comprando, renovando e vendendo imóveis.', '') }</p>
                        <a href="">Acessar </a>

                    </article>
                )) }

                <div className="actions">
                    <button onClick={this.prevPage} >Anterior</button>
                    <button onClick={this.nextPage} >Próxima</button>
                </div>

            </div>


        );
    }
}