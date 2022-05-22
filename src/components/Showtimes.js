import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Container from "../shared/container";
import Header from "../shared/header";
import Footer from "../shared/footer";
import Error from "../shared/error";

import MovieShowtimes from "./MovieShowtimes";

export default function Showtimes () {

    const { id } = useParams();
    const [movie, setMovie] = React.useState({});
    const [error, setError] = React.useState(null);
    
    React.useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${id}/showtimes`)
            .then(response => setMovie({...response.data}))
            .catch(error => setError({...error.response}));
    }, []);

    if (Object.keys(movie).length > 0) {
        if (!error) {
            return (
                <Container>
                    <Header>Selecione o horário</Header>
                    <DaysContainer>
                        {movie.days.map(day => (<MovieShowtimes key={day.id.toString()} day={day} />))}
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
    } else {
        return (<></>);
    }
    
    
}

const DaysContainer = styled.div`
    flex-grow: 1;
    overflow-y: scroll;
`;
