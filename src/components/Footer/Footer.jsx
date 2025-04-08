import React from 'react'
import { FooterBrand, FooterContact, FooterContainerStyled, FooterCopyright, FooterDivider, FooterInfo, FooterMenu, FooterSocialIcons, FooterWrapper, ItemFooterContact } from './FooterStyles'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa6'

const Footer = () => {
    return (
        <FooterContainerStyled className='container'>
            <FooterWrapper className='wrapper'>
                <FooterInfo>
                    <FooterBrand>
                        <img src="/Logos/Logotipo-Positivo.png" />
                        <p>Brindamos soluciones a usuarios particulares y profesionales de neumáticos, generando vínculos estrechos, ágiles y honestos que promueven relaciones a largo plazo basados en la evolución continua de nuestros procesos.</p>
                        <FooterSocialIcons>
                            <a target="_blank" href="https://www.instagram.com/cubat.ok/"><FaInstagram/></a>
                            <a target="_blank" href="https://www.facebook.com/cubat.ok/"><FaFacebook/></a>
                        </FooterSocialIcons>
                    </FooterBrand>
                    <FooterMenu>
                        <li>INICIO</li>
                        <li>productos</li>
                    </FooterMenu>
                    <FooterContact>
                        <ItemFooterContact>
                            <span>Telefono</span>
                            +54 9 3517 64-9357
                        </ItemFooterContact>
                        <ItemFooterContact>
                            <span>Email</span>
                            contacto@neumaticor.com
                        </ItemFooterContact>
                        <ItemFooterContact>
                            <span>Instagram</span>
                            @neumaticor.ok
                        </ItemFooterContact>
                    </FooterContact>
                </FooterInfo>
                <FooterDivider/>
                <FooterCopyright>
                    <span>© Copyright 2023 Neumaticor. Todos los derechos reservados.</span>
                </FooterCopyright>
            </FooterWrapper>
        </FooterContainerStyled>
    )
}

export default Footer