import { createGlobalStyle } from "styled-components"
import { FONTS_URL } from "../utils/constants"
export const GlobalStyles = createGlobalStyle`
    :root {
        --red: #BC0000;
        --blue: #000E1B;
        --green: #57D163;
        --green-10: #57D16310;
        --white: #fafafa;
        --gray-100: #e9ebed;
        --gray-200: #CACDD2;
        --gray-300: #9FA4A9;
        --gray-400: #73787E;
        --gray-500: #464C52;
        --gray-600: #26282B;
        --gray-700: #1B1D1F;

        /* GrayScale */
        --white-0: #FDFDFD;
        --white-50: #F0F0F0;
        --white-100: #E4E4E4;
        --white-200: #D7D7D7;
        --white-300: #CACACA;
        --white-400: #BDBDBD;
        --white-500: #B0B0B0;
        --white-600: #A4A4A4;
        --white-700: #979797;
        --white-800: #8A8A8A;
        --white-900: #7E7E7E;
        --black-0: #71716F;
        --black-50: #656563;
        --black-100: #575757;
        --black-200: #4A4A4A;
        --black-300: #3D3D3D;
        --black-400: #303030;
        --black-500: #242424;
        --black-600: #171717;
        --black-700: #0A0A0A;
        --black-800: #050505;
        --black-900: #000000;

        

        --orange: #f97316;
        --orange-10: #f973161A;
        --text: #1a1a1a;
        --yellow: #FED602;
        --yellow-10: rgba(255, 214, 2, 0.1); /* 10% de opacidad */
        --black: #101010;
    }

    .container {
        display: flex;
        width: 100%;
        justify-content: center;
    }

    .wrapper {
        width: 100%;
        display: flex;
        max-width: 1260px;
    }

    @font-face {
        font-family: 'Neumaticor';
        src: local('Neumaticor Light'), url(${FONTS_URL}/neumaticor-font/Neumaticor-Light.woff2) format('woff2');
        font-weight: 100;
        font-style: normal;
    }

    @font-face {
        font-family: 'Neumaticor';
        src: local('Neumaticor Regular'), url(${FONTS_URL}/neumaticor-font/Neumaticor-Regular.woff2) format('woff2');
        font-weight: 200;
        font-style: normal;
    }

    @font-face {
        font-family: 'Neumaticor';
        src: local('Neumaticor Medium'), url(${FONTS_URL}/neumaticor-font/Neumaticor-Medium.woff2) format('woff2');
        font-weight: 300;
        font-style: normal;
    }

    @font-face {
        font-family: 'Neumaticor';
        src: local('Neumaticor Bold'), url(${FONTS_URL}/neumaticor-font/Neumaticor-Bold.woff2) format('woff2');
        font-weight: 400;
        font-style: normal;
    }


    html {
        scroll-behavior: smooth;
    }

    .no-scroll {
        overflow: hidden;
        overflow: -moz-scrollbars-none; /* Firefox */
        -ms-overflow-style: none; /* Internet Explorer / Edge */
    }

    img {
        user-select: none;
    }

    body {
        background-color: var(--white-50);
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
        list-style-type: none;
        font-family: 'Neumaticor', sans-serif;
    }
    

    /*? Headings */
    

    .visible {
        opacity: 1 !important;
    }

    h1 {
        font-size: 47.8px;
        line-height: 47.8px;
        font-weight: 400;
        text-transform: uppercase;
        @media (max-width: 575px) {
            h1 {
                
            }
        }
    }

    h2 {
        font-size: 45px;
        line-height: 45px;
        font-weight: 400;
        text-transform: uppercase;
        @media (max-width: 575px) {
            h2 {
                
            }
        }
    }

    h3 {
        font-size: 40px;
        line-height: 40px;
        font-weight: 400;
    }

    h4 {
        font-size: 35px;
        line-height: 35px;
        font-weight: 400;
    }

    h5 {
        font-size: 30px;
        line-height: 30px;
        font-weight: 400;
    }

    h6 {
        font-size: 25px;
        line-height: 25px;
        font-weight: 400;
    }

    p {
        font-size: 16px;
        font-weight: 200;
        line-height: normal;
    }

    /* Mobile */
    @media (max-width: 575px) {
        h1 {
            font-size: 40px;
            line-height: 40px;
            font-weight: 700;
        }
        
        h2 {
            font-size: 35px;
            line-height: 35px;
            font-weight: 700;
        }
        
        h3 {
            font-size: 30px;
            line-height: 30px;
            font-weight: 700;
        }
        
        h4 {
            font-size: 30px;
            font-weight: 700;
        }
        
        h5 {
            font-size: 25px;
            font-weight: 700;
        }
        
        h6 {
            font-size: 20px;
            font-weight: 700;
        }

        p {
            font-size: 16px;
            font-weight: 200;
            line-height: normal;
        }
    } 
    // Estilo de la barra de desplazamiento para Chrome
    ::-webkit-scrollbar {
        width: 10px; /* Ancho de la barra de desplazamiento */
    }

    /* Estilo del botón de flecha (flecha de desplazamiento) en Chrome */
    ::-webkit-scrollbar-button {
        display: none;
    }

    /* Estilo de la pista (fondo) de la barra de desplazamiento en Chrome */
    ::-webkit-scrollbar-track {
        background-color: #f0f0f0; /* Color de fondo de la pista */
    }

    /* Estilo del pulgar (el indicador que se arrastra) de la barra de desplazamiento en Chrome */
    ::-webkit-scrollbar-thumb {
        background-color: var(--black); /* Color del pulgar */
        height: 80px;
    }

    /* Estilo del pulgar cuando se pasa el mouse por encima en Chrome */
    ::-webkit-scrollbar-thumb:hover {
        background-color: #999; /* Color del pulgar al pasar el mouse por encima */
    }

    /* Toast */

    .p-toast {
        @media (max-width: 968px) {
            top: 80px !important;
            right: 0;
            left: 20px;
        }
        .p-toast-message {
            margin-bottom: 14px;
            
            .p-toast-message-content {
                gap: 14px;
                padding: 14px;
                
                .p-toast-detail {
                    font-weight: 200;
                    margin-top: 4px;
                }
            }

            @media (max-width: 968px) {
                background-color: var(--white);
                max-width: 300px;
                font-size: 14px;
                right: 0;
                left: auto;
            }
        }
    }

    

    @keyframes p-progress-spinner-custom {
        0%, 100% {
            stroke: var(--black);
        }
        40% {
            stroke: var(--black);
        }
        66% {
            stroke: var(--black);
        }
        80%, 90% {
            stroke: var(--black);
        }
    }

    .p-progress-spinner-circle {
        animation: p-progress-spinner-custom 2s infinite !important;
    }
    .p-radiobutton.p-highlight .p-radiobutton-box {
        border-color: var(--yellow);
        background: var(--yellow);
    }

    .p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
        outline: 0 none;
        outline-offset: 0;
        box-shadow: 0 0 0 0.2rem var(--yellow);
        border-color: #06b6d4;
    }

    .p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {
        border-color: var(--yellow);
    }


    .p-accordion {
        display: flex;
        flex-direction: column;
        gap: 20px;

        .p-accordion {
            .p-highlight {
                
            }
        }

        .p-accordion-header-link {
            padding: 12px 16px;
            display: flex;
            flex-direction: row-reverse;
            justify-content: space-between;
            background-color: var(--white-0);

            .p-accordion-header-text {
                font-size: 16px;
                line-height: 16px;
                font-weight: 300;
                color: var(--black-900);
            }

            &.p-highlight {
                background-color: var(--red);
            }

            .p-accordion-content {
                width: 100%;
            }
        }
    }

    .p-dropdown-items-wrapper {
        .p-dropdown-items {
            .p-dropdown-item {
                padding: 8px 16px;
                font-weight: 300;
                color: var(--black-900);
                border: none !important;
                font-size: 14px;

                &.p-highlight {
                    background-color: var(--yellow-10);
                    color: var(--black-900);
                }

                &:hover {
                    border: none;
                }
            }
        }
    }
    
`