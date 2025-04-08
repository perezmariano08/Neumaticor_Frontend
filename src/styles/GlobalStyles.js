import { createGlobalStyle } from "styled-components"
export const GlobalStyles = createGlobalStyle`
    :root {
        --red: #BC0000;
        --blue: #000E1B;
        --green: #57D163;
        --white: #fafafa;
        --gray-100: #e9ebed;
        --gray-200: #CACDD2;
        --gray-300: #9FA4A9;
        --gray-400: #73787E;
        --gray-500: #464C52;
        --gray-600: #26282B;
        --gray-700: #1B1D1F;
        --yellow: #FED602;
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
        src: local('Neumaticor Light'), url(/uber-font/UberMoveAR-Light.ttf) format('truetype');
        font-weight: 100;
        font-style: normal;
    }

    @font-face {
        font-family: 'Neumaticor';
        src: local('Neumaticor Regular'), url(/uber-font/UberMoveAR-Regular.ttf) format('truetype');
        font-weight: 200;
        font-style: normal;
    }

    @font-face {
        font-family: 'Neumaticor';
        src: local('Neumaticor Medium'), url(/uber-font/UberMoveAR-Medium.ttf) format('truetype');
        font-weight: 300;
        font-style: normal;
    }

    @font-face {
        font-family: 'Neumaticor';
        src: local('Neumaticor Bold'), url(/uber-font/UberMoveAR-Bold.ttf) format('truetype');
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
        background-color: var(--white);
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
        font-size: 18px;
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

`