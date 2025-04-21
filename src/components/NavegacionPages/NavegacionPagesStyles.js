import styled from "styled-components";

export const NavegacionPagesContainer = styled.nav`
    display: flex;
    gap: 10px;
    align-items: center;

    a {
        color: var(--black-900);
        font-weight: 200;
        font-size: 16px;

        &.active {
            font-weight: 300;
        }
    }

    svg {
        font-size: 14px;
    }
`