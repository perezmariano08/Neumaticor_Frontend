import styled from "styled-components";

export const FormStyled = styled.form`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem; /* Separación entre inputs */
    row-gap: 2rem;
    border-radius: 10px;

    background-color: ${({ bg }) => `var(--${bg})` || 'transparent'};
    padding: ${({ padding }) => `${padding}px` || '0'};
`;
