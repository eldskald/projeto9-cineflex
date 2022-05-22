import React from "react";
import styled from "styled-components";

export default function MovieShowtime (props) {
    return (
        <Container>
            <Date>{props.day.weekday} - {props.day.date}</Date>
            <div>
                {props.day.showtimes.map(({ name, id }) => (<Time key={id.toString()}>{name}</Time>))}
            </div>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    margin: 40px 0px;

    padding-left: 7.5%;

    .div {
        display: flex;
        justify-content: start;
        align-items: center;
    }
`;

const Date = styled.p`
    margin-bottom: 16px;

    font-size: 20px;
    font-weight: 400;
    color: #293845;
`;

const Time = styled.button`
    width: 84px;
    height: 44px;
    margin-right: 16px;

    background-color: #e8833a;
    border: 1px solid transparent;
    border-radius: 8px;

    font-size: 20px;
    font-weight: 400;
    color: #ffffff;
`;
