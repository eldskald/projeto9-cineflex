import React from "react";
import axios from "axios";
import styled from "styled-components";

import Container from "../shared/container";

import MovieThumbnail from "./MovieThumbnail";

export default function Home () {

    const [movies, setMovies] = React.useState([]);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies")
            .then(response => setMovies(response.data))
            .catch(error => setError({ code: error.response.status, desc: error.response.data }));
    }, []);

    if (!error) {
        return (
            <Container>
                <Header>Selecione o filme</Header>
                <MoviesContainer>
                    {movies.map(movie => (<MovieThumbnail movie={movie} />) )}
                </MoviesContainer>
            </Container>
        );
    } else {
        return (
            <Error>
                <h1>{error.code}</h1>
                <h2>{error.desc}</h2>
            </Error>
        );
    }
}

const Header = styled.div`
    width: 100%;
    min-height: 96px;
    z-index: 1;

    display: flex;
    justify-content: center;
    align-items: center;

    box-shadow: 0px 8px 8px #ffffff;

    color: #293845;
    font-size: 24px;
    font-weight: 400;
`;

const MoviesContainer = styled.div`
    width: 100%;
    flex-grow: 1;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    overflow-y: scroll;
`;

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
