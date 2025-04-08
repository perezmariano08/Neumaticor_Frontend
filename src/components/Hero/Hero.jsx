import React from 'react'
import { HeroContainerStyled, HeroInfo, HeroText, HeroWrapper } from './HeroStyles'
import Button from '../UI/Button/Button'
import { FaWhatsapp } from "react-icons/fa";

const Hero = () => {
    return (
        <HeroContainerStyled className='container'>
            <HeroWrapper className='wrapper'>
                <HeroText>
                    <HeroInfo>
                        <h1>VENTA DE NEUMÁTICOS EN CÓRDOBA, CON LA MÁS <span>ALTA CALIDAD</span></h1>
                        <p>Renová tus neumáticos de forma <span>ágil</span> y <span>segura</span>. Seguridad garantizada para tu vehículo.
                        <br />En Neumaticor, trabajamos con marcas de alta calidad y al mejor precio del mercado.</p>
                    </HeroInfo>
                    <Button background='yellow' color='black'>
                        <FaWhatsapp/>
                        Comunicate con nosotros
                    </Button>
                </HeroText>
            </HeroWrapper>
        </HeroContainerStyled>
    )
}

export default Hero