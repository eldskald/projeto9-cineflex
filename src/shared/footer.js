import styled from "styled-components";

const Footer = styled.div`
    width: 100%;
    height: 120px;

    padding: 16px;
    display: flex;
    align-items: center;

    background-color: #dfe6ed;
    border-top: 1px solid #9eadba;

    img {
        width: 64px;
        height: 90px;

        object-fit: cover;
    }

    div {
        margin-left: 16px;

        color: #293845;
        font-size: 24px;
        font-weight: 400;
    }
`;

export default Footer;
