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
    const [days, setDays] = React.useState([]);
    const [error, setError] = React.useState(null);
    
    React.useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${id}/showtimes`)
            .then(response => setDays(response.data.days))
            .catch(error => setError(error.response));
    }, []);

    if (!error) {
        return (
            <Container>
                <Header>Selecione o horário</Header>
                <DaysContainer>
                    {days.map(day => (<MovieShowtime key={day.id.toString()} day={day} />))}
                </DaysContainer>
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
    overflow-y: scroll;
`;
