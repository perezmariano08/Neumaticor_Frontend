import React from 'react'
import { MarcasCarousel, MarcasContainer, MarcasWrapper } from './MarcasStyles'
import { IMAGES_URL } from '../../utils/constants';

const Marcas = () => {
    const marcas = [
        {marca: "Fate", img: 'fate_white.webp'},
        {marca: "Pirelli", img: 'pirelli_white.webp'},
        {marca: "BF Goodrich", img: 'bf-goodrich_white.webp'},
        {marca: "Michelin", img: 'michelin_white.webp'},
        {marca: "Austone", img: 'austone_white.webp'},
        {marca: "Greentrac", img: 'greentrac_white.webp'},
    ]
    
    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
    ];    

    const marcaTemplate = (marca) => {
        return (
            <img src={`${IMAGES_URL}/marcas/${marca.img}`} title={marca.marca}/>
        );
    };


    return (
        <MarcasContainer>
            <MarcasWrapper>
                <MarcasCarousel 
                    value={marcas} 
                    numVisible={4} 
                    numScroll={1} 
                    responsiveOptions={responsiveOptions} 
                    itemTemplate={marcaTemplate}
                    autoplayInterval={3000}
                />
            </MarcasWrapper>
        </MarcasContainer>
    )
}

export default Marcas