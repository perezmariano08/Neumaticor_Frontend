import React from 'react'
import { HeroContainerStyled, HeroInfo, HeroText, HeroWrapper } from './HeroStyles'
import Button from '../UI/Button/Button'
import { FaWhatsapp } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Hero = () => {
    const user = useSelector((state) => state.user.user); // Obtener el estado del usuario desde Redux   
    return (
        <HeroContainerStyled className='container'>
            <HeroWrapper className='wrapper'>
                <HeroText>
                    <HeroInfo>
                        <h1>
                            VENTA DE NEUMÁTICOS EN CÓRDOBA, CON LA MÁS <span>ALTA CALIDAD</span>
                        </h1>
                        {user ? (
                            <p>
                                Comprá directamente para tu <span>gomería</span> o <span>negocio</span>. Accedé a precios especiales, stock actualizado y atención personalizada.
                                <br />En Neumaticor, somos tu aliado mayorista en neumáticos de calidad.
                            </p>
                        ) : (
                            <p>
                                Renová tus neumáticos de forma <span>ágil</span> y <span>segura</span>. Seguridad garantizada para tu vehículo.
                                <br />En Neumaticor, trabajamos con marcas de alta calidad y al mejor precio del mercado.
                            </p>
                        )}
                    </HeroInfo>
                </HeroText>
            </HeroWrapper>
        </HeroContainerStyled>
    )
}

export default Hero