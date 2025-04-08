import styled from "styled-components";

export const ModalUserWrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
    padding: 20px;
    top: 80px;
    right: 0;
    background-color: var(--yellow);
    color: var(--white);
    width: 300px;
    border-radius: 20px;

    p {
        color: var(--black);
        font-weight: 400;
        font-size: 20px;
    }
    
    button {
        height: fit-content;
    }
`