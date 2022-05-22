import styled from "styled-components";

const Error = styled.div`
    position: absolute;
    width: 100%;
    top: 64px;
    bottom: 0px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: #9e1111;
    font-weight: 400;

    h1 {
        font-size: 64px;
    }

    h2 {
        margin-top: 32px;
        font-size: 24px;
    }
`;

export default Error;
