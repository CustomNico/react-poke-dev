import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";

import PokemonList from "./components/pokemon/list";
import PokemonDetail from "./components/pokemon/detail";
import { generations } from "./utils/generations";

const AppWrapper = styled.div`
    padding-top: 30px;
    padding-bottom: 30px;
`;

function App() {
    return (
        <AppWrapper>
            <Routes>
                {generations.map(gen => (
                    <Route
                        key={gen.path}
                        path={gen.path}
                        element={<PokemonList limit={gen.limit} offset={gen.offset} favs={false} />}
                    />
                ))}
                <Route path="favourites" element={<PokemonList favs={true} limit={1000} offset={0} />} />
                <Route path="/pokemon/:name" element={<PokemonDetail />} />
                <Route path="*" element={<Navigate to="/gen1" />} />
            </Routes>
        </AppWrapper>
    );
}

export default App;
