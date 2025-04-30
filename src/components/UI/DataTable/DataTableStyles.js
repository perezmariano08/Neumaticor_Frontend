import { DataTable } from "primereact/datatable";
import styled from "styled-components";

export const DataTableStyled = styled(DataTable)`
    width: 100%;
    font-size: 16px;
    font-weight: 300;
    color: var(--black-700);
    border-radius: 10px;
    overflow: hidden;
    
    thead {
        tr {
            th {
                padding: 8px 16px;
                
            }

            
        }
    }

    tbody {
        tr {
            cursor: pointer;

            &:hover {
                opacity: .9;
            }
            td {
                padding: 8px 16px;
            }
            
            &.p-highlight {
                background-color: var(--yellow-10);
                color: var(--black-900);
            }

            a {
                color: var(--black-900);
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }

`

export const DataTableEstado = styled.div`
    padding: 4px 10px;
    border-radius: 10px;
    background-color: var(--white-50);
    border: 1px solid var(--white-200);
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    font-size: 14px;

    &.red {
        border: 1px solid var(--red);
        background-color: var(--red);
        color: var(--white-0);
    }

    &.green {
        border: 1px solid var(--green);
        background-color: var(--green-10);
        color: var(--green);
    }
`