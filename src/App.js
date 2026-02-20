import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";

import PokemonList from "./components/pokemon/list";
import PokemonDetail from "./components/pokemon/detail";

const AppWrapper = styled.div`
    padding-top: 30px;
    padding-bottom: 30px;
`;

function App() {

    return (
        <AppWrapper>
            <Routes>
                {/* Generation 1 (Kanto) - Pokemon 1-151 */}
                <Route index path="pokemon" element={<PokemonList limit={151} offset={0} />} />
                
                {/* Generation 3 (Hoenn) - Pokemon 252-386 */}
                <Route path="pokemon3" element={<PokemonList limit={135} offset={251} />} />
                
                {/* Favourites */}
                <Route path="favourites" element={<PokemonList favs={true}/>} />
                
                {/* Pokemon Detail */}
                <Route path="/pokemon/:name" element={<PokemonDetail />} />
                
                {/* Redirect unknown routes to pokemon list */}
                <Route path="*" element={<Navigate to="pokemon" />} />
            </Routes>
        </AppWrapper>
    );
}

export default App;