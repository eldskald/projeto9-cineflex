import React from "react";
import axios from "axios";
import styled from "styled-components";

import Container from "../shared/container";
import Header from "../shared/header";
import Error from "../shared/error";

import MovieThumbnail from "./MovieThumbnail";

export default function Home () {

    const [movies, setMovies] = React.useState([]);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies")
            .then(response => setMovies([...response.data]))
            .catch(error => setError({...error.response}));
    }, []);

    if (!error) {
        return (
            <Container>
                <Header>Selecione o filme</Header>
                <MoviesContainer>
                    {movies.map(movie => (<MovieThumbnail movie={movie} key={movie.id.toString()} />) )}
                </MoviesContainer>
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

const MoviesContainer = styled.div`
    width: 100%;
    flex-grow: 1;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    overflow-y: scroll;
`;
