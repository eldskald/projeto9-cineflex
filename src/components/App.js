import React from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "../theme/globalStyle";
import StyledLink from "../shared/styledLink";

import Home from "./Home";
import Showtimes from "./Showtimes";
import Seats from "./Seats";
import Success from "./Success";

export default function App () {

    const [purchase, setPurchase] = React.useState({});

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
                    <Route path="/assentos/:id" element={<Seats makePurchase={setPurchase} />} />
                    <Route path="/sucesso" element={<Success purchaseData={purchase} />} />
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
    border-bottom: 1px solid #9eadba;

    color: #e8833a;
    font-size: 32px;
    font-weight: 400;
`;
