import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Container from "../shared/container";
import Header from "../shared/header";
import Error from "../shared/error";

import MovieShowtime from "./MovieShowtime";

export default function Showtimes () {

    const { id } = useParams();
    const [movie, setMovie] = React.useState({});
    const [error, setError] = React.useState(null);
    
    React.useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${id}/showtimes`)
            .then(response => setMovie({...response.data}))
            .catch(error => setError({...error.response}));
    }, []);

    if (!error) {
        return (
            <Container>
                <Header>Selecione o horário</Header>
                <DaysContainer>
                    {Object.keys(movie).length > 0 ?
                        movie.days.map(day => (<MovieShowtime key={day.id.toString()} day={day} />)) :
                        <></>}
                </DaysContainer>
                <Footer>
                    <img src={movie.posterURL} alt={movie.title} />
                    <div>{movie.title}</div>
                </Footer>
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

const DaysContainer = styled.div`
    flex-grow: 1;
    overflow-y: scroll;
`;

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
