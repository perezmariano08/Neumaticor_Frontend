import { Checkbox } from "primereact/checkbox";
import styled from "styled-components";

export const CheckboxStyled = styled(Checkbox)`


    .p-checkbox-box {
        border: 1px solid var(--white-400);
        background: #ffffff;
        width: 22px;
        height: 22px;
        color: #4b5563;
        border-radius: 6px;
        transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
        outline-color: transparent;
    }
`