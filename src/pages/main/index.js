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

    prevPage = () => { }

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
                        <img alt="Imóveis" src={ imovel.listing.images[0].replace('{action}/{width}x{height}', 'fit-in/470x300') } />
                        <div className="infor-imo">
                            <strong>{ imovel.listing.title }</strong>
                            <p>Quartos: { imovel.listing.bedrooms }</p>
                            <p>Suites: { imovel.listing.suites }</p>
                            <p>Banheiros: { imovel.listing.bathrooms }</p>
                            <p>Vagas na garagem: { imovel.listing.parkingSpaces }</p>
                            <p>Tipo de negócio: { imovel.listing.pricingInfos[0].businessType.replace('SALE','Venda') } </p>
                            <p>R$:{imovel.listing.pricingInfos[0].price}</p>
                            <a href="">Acessar </a>
                        </div>
                        

                    </article>
                )) }

                <div className="actions">
                    <button onClick={ this.prevPage } >Anterior</button>
                    <button onClick={ this.nextPage } >Próxima</button>
                </div>

            </div>


        );
    }
}