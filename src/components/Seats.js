import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

import Container from "../shared/container";
import Header from "../shared/header";
import Footer from "../shared/footer";
import Error from "../shared/error";

export default function Seats () {

    const { id } = useParams();
    const [data, setData] = React.useState({});
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${id}/seats`)
            .then(response => setData({...response.data}))
            .catch(error => setError({...error.response}));
    }, []);

    if (Object.keys(data).length > 0) {
        if (!error) {
            return (
                <Container>
                    <Header>{"Selecione o(s) assento(s)"}</Header>
                    <Footer>
                        <img src={data.movie.posterURL} alt={data.movie.title} />
                        <div>
                            <p>{data.movie.title}</p>
                            <p>{data.day.weekday} - {data.name}</p>
                        </div>
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
