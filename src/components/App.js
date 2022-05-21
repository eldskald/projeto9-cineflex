import React from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "../theme/globalStyle";
import StyledLink from "../shared/styledLink";

import Home from "./Home";
import Showtimes from "./Showtimes";

export default function App () {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Header>
                    <StyledLink to="/">CINEFLEX</StyledLink>
                </Header>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sessoes/:id" element={<Showtimes />} />
                </Routes>
            </BrowserRouter>
        
            
        </>
    );
}

const Header = styled.div`
    width: 100%;
    height: 64px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #c3cfd9;

    color: #e8833a;
    font-size: 32px;
    font-weight: 400;
`;
