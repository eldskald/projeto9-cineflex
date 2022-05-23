import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Container from "../shared/container";
import Error from "../shared/error";

export default function Success ({ purchaseData }) {

    const navigate = useNavigate();
    const [error, setError] = React.useState(null);

    React.useEffect(function () {
        const data = {
            ids: [...purchaseData.seats],
            name: purchaseData.buyer.name,
            cpf: purchaseData.buyer.cpf
        };
        axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", data)
            .catch(error => setError(error.response));
    }, [])

    if (!error) {
        return (
            <Container>
                <Header>{"Pedido feito com sucesso!"}</Header>
                <InfoContainer>
                    <h1>Filme e sessão</h1>
                    <p>{purchaseData.showtime.movie}</p>
                    <p>{purchaseData.showtime.date} {purchaseData.showtime.time}</p>
                </InfoContainer>
                <InfoContainer>
                    <h1>Ingressos</h1>
                    {purchaseData.seats.map(seat => (<p key={seat}>Assento {seat}</p>))}
                </InfoContainer>
                <InfoContainer>
                    <h1>Comprador</h1>
                    <p>Nome: {purchaseData.buyer.name}</p>
                    <p>CPF: {purchaseData.buyer.cpf}</p>
                </InfoContainer>
                <Button onClick={() => {navigate("/")}}>Voltar para Home</Button>
            </Container>
        );
    } else {
        return (
            <Error>
                <h1>{error.status}</h1>
                <h2>{error.data}</h2>
            </Error>
        );
    }
}

const Header = styled.div`
    width: 100%;
    min-height: 96px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: #247a6b;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
`;

const InfoContainer = styled.div`
    width: 100%;
    margin: 16px 0px;

    padding-left: 32px;

    color: #293845;
    
    h1 {
        font-size: 24px;
        font-weight: 700;
    }

    p {
        font-size: 20px;
        font-weight: 400;
    }
`;

const Button = styled.button`
    width: fit-content;
    height: fit-content;
    margin: 24px auto;

    padding: 12px 32px;
    background-color: #e8833a;
    border: 1px solid transparent;
    border-radius: 8px;
    cursor: pointer;

    font-size: 24px;
    font-weight: 400;
    color: #ffffff;
`;
