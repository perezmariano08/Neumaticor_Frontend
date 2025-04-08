import React from 'react'
import { BenefitItem, BenefitText, BenefitsContainerStyled, BenefitsWrapper } from './BenefitsStyles'
import { FaCreditCard, FaMobileScreen, FaTruck } from 'react-icons/fa6'

const Benefits = () => {
    return (
        <BenefitsContainerStyled>
            <BenefitsWrapper>
                <BenefitItem>
                    <FaTruck className='benefit-icon'/>
                    <BenefitText>
                        <span className="benefit-title">envíamos tu compra</span>
                        <span className="benefit-description">Entregas a todo el pais</span>
                    </BenefitText>
                </BenefitItem>
                <BenefitItem>
                    <FaCreditCard className='benefit-icon'/>
                    <BenefitText>
                        <span className="benefit-title">todos los medios de pago</span>
                        <span className="benefit-description">Tarjetas de crédito o efectivo.</span>
                    </BenefitText>
                </BenefitItem>
                <BenefitItem>
                    <FaMobileScreen className='benefit-icon'/>
                    <BenefitText>
                        <span className="benefit-title">asesoramiento inmediato</span>
                        <span className="benefit-description">Contacto por teléfono, Whatsapp y Facebook Messenger.</span>
                    </BenefitText>
                </BenefitItem>
            </BenefitsWrapper>
        </BenefitsContainerStyled>
    )
}

export default Benefits