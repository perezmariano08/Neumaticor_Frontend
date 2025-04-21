import { InputText } from "primereact/inputtext";
import styled from "styled-components";

export const InputTextStyled = styled(InputText)`
    padding: 12px 16px;
    font-size: 14px;
    border-radius: 10px;
    font-weight: 300;
    color: var(--black);

    &:not(.p-invalid):hover {
        border-color: var(--yellow);
    }

    &:enabled:focus {
        outline: 0 none;
        outline-offset: 0;
        box-shadow: 0 0 0 0.2rem var(--yellow-10);
        border-color: var(--yellow);
    }

    &::placeholder {
        color: var(--white-800);
        font-weight: 200;
    }

    &.p-disabled {
        background-color: var(--white-100);
    }

`