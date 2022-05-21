import React from "react";
import styled from "styled-components";

import StyledLink from "../shared/styledLink";

export default function MovieThumbnail ({ movie }) {
    return (
        <StyledLink to={`/sessoes/${movie.id}`}>
            <Container>
                <img src={movie.posterURL} alt={movie.title} />
            </Container>
        </StyledLink>
    );
}

const Container = styled.div`
    width: 145px;
    height: 210px;
    margin: 16px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #ffffff;
    box-shadow: 0px 2px 4px 2px #e0e0e0;
    cursor: pointer;

    img {
        width: 129px;
        height: 193px;

        object-fit: cover;
    }
`;
