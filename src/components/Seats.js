import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Container from "../shared/container";
import Header from "../shared/header";
import Footer from "../shared/footer";
import Error from "../shared/error";

export default function Seats ({ makePurchase }) {

    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedSeatsIDs, setSelectedSeatsIDs] = useState([]);
    const [name, setName] = useState("");
    const [cpf, setCPF] = useState("");

    useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${id}/seats`)
            .then(response => setData({...response.data}))
            .catch(error => setError({...error.response}));
    }, []);

    function getSeatState (seat) {
        if (seat.isAvailable && !selectedSeatsIDs.includes(seat.id)) {
            return "available";
        } else if (seat.isAvailable && selectedSeatsIDs.includes(seat.id)) {
            return "selected";
        } else {
            return "unavailable";
        }
    }

    function selectSeat (seat) {
        if (seat.isAvailable && !selectedSeatsIDs.includes(seat.id)) {
            setSelectedSeatsIDs([...selectedSeatsIDs, seat.id]);
            setSelectedSeats([...selectedSeats, seat.name]);
        } else if (seat.isAvailable && selectedSeatsIDs.includes(seat.id)) {
            const auxIDs = [...selectedSeatsIDs];
            const auxNames = [...selectedSeats];
            const index = auxIDs.findIndex(value => value === seat.id);
            auxIDs.splice(index, 1);
            auxNames.splice(index, 1);
            setSelectedSeatsIDs([...auxIDs]);
            setSelectedSeats([...selectedSeats]);
        }
    }

    function comprar () {
        makePurchase({
            showtime: {
                movie: data.movie.title,
                date: data.day.date,
                time: data.name
            },
            seats: [...selectedSeats],
            buyer: {
                name: name,
                cpf: cpf
            }
        });
        navigate("/sucesso");
    }

    if (Object.keys(data).length > 0) {
        if (!error) {
            return (
                <Container>
                    <Header>{"Selecione o(s) assento(s)"}</Header>
                    <Legends>
                        <div>
                            <Seat state={"selected"} />
                            <p>Selecionado</p>
                        </div>
                        <div>
                            <Seat state={"available"} />
                            <p>Disponível</p>
                        </div>
                        <div>
                            <Seat state={"unavailable"} />
                            <p>Indisponível</p>
                        </div>
                    </Legends>
                    <SeatContainer>
                        <div>
                            {data.seats.map(seat => (<div key={seat.id.toString()}><Seat
                                state={getSeatState(seat)}
                                onClick={() => selectSeat(seat)}
                            >{seat.name}</Seat></div>))}
                        </div>
                    </SeatContainer>
                    <InputContainer>
                        <label htmlFor="inputName">Nome do comprador:</label>
                        <input
                            id="inputName"
                            placeholder="Digite seu nome..."
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </InputContainer>
                    <InputContainer>
                        <label htmlFor="inputCPF">CPF do comprador:</label>
                        <input
                            id="inputCPF"
                            placeholder="Digite seu CPF..."
                            value={cpf}
                            onChange={e => setCPF(e.target.value)}
                        />
                    </InputContainer>
                    <Button onClick={comprar}>
                        {"Reservar assento(s)"}
                    </Button>
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

const Legends = styled.div`
    width: 100%;
    margin: 8px 0px;

    display: flex;
    justify-content: space-evenly;
    align-items: center;

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        p {
            font-size: 14px;
            font-weight: 400;
            color: #4e5a65;
        }
    }
`;

const SeatContainer = styled.div`
    width: 100%;
    flex-grow: 1;

    padding: 8px 16px;
    overflow-y: scroll;

    div {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;

        div {
            flex: 0 1 10%;
        }
    }
`;

const Seat = styled.div`
    min-width: 26px;
    min-height: 26px;
    margin: 8px 0px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${props => props.state === "selected" ? "#8dd7cf" : "#c3cfd9"};
    border: 1px solid ${props => props.state === "selected" ? "#1aae9e" : "#7b8b99"};
    opacity: ${props => props.state === "unavailable" ? 0.25 : 1.0};
    border-radius: 50%;
    cursor: ${props => props.state === "unavailable" ? "default" : "pointer"};

    font-size: 12px;
    font-weight: 400;
    color: #000000;
`;

const InputContainer = styled.div`
    width: 90%;
    height: fit-content;
    margin: 8px auto;
    position: relative;

    font-size: 18px;
    font-weight: 400;
    color: #293845;

    input {
        width: 100%;
        height: 32px;

        padding-left: 24px;

        border: 1px solid #d4d4d4;
        border-radius: 16px;
        outline: none;

        font-size: 18px;
        font-weight: 400;
        color: #293845;

        ::placeholder {
            opacity: 0.5;
        }
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
