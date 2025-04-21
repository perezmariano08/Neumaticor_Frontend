import { Dropdown } from "primereact/dropdown";
import styled from "styled-components";

export const DropdownStyled = styled(Dropdown)`
    padding: 12px 16px;
    border-radius: 10px;
    background-color: var(--white-0);
    min-width: 200px;
    
    .p-dropdown-label {
        font-size: 14px;
        font-weight: 300;
        color: var(--black-900);
        &.p-placeholder {
            color: var(--white-800);
            font-weight: 200;
        }
    }

    .p-dropdown-trigger {
        width: fit-content;
        margin-left: 20px;

        svg {
            color: var(--white-800);
        }
    }

    &:not(.p-disabled):hover {
        border-color: var(--yellow);
    }

    &:not(.p-disabled).p-focus {
        outline: 0 none;
        outline-offset: 0;
        box-shadow: 0 0 0 0.2rem var(--yellow-10);
        border-color: var(--yellow);
    }
    

    &:focus-visible {
        outline: var(--yellow) auto 1px;
    }
`