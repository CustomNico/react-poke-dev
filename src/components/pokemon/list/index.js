import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

import SearchFilter from "../../utils/searchFilter";
import Nav from "../../utils/nav";
import FavouriteToggler from "../../utils/favouriteToggler";

import { getPokemons } from "../../../utils/pokemonAPI";

import logo from "../../../assets/pokemon-logo.png"

import { isFavourite } from "../../../utils/favourites";

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px 2vw;
    
    margin-left: 40px;
    margin-right: 40px;

    width: calc(100% - 80px);
    max-width: 900px;

    @media screen and (min-width: 420px) {
        margin-left: 75px;
        margin-right: 75px;

        width: calc(100% - 150px);
    }
    @media screen and (min-width: 900px) {
        margin-left: 120px;
        margin-right: 120px;

        width: calc(100% - 240px);
    }
    @media screen and (min-width: 1200px) {
        margin-left: auto;
        margin-right: auto;

        width: 100%;
    }
`;

const PokemonCard = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    background: #FFF;
    border: 1px solid grey;
    border-radius: 5px;
    padding: 30px 0px;

    width: 100%;
    height: 120px;
    
    @media screen and (min-width: 420px) {
        width: calc(50% - 2vw);
    }
    @media screen and (min-width: 900px) {
        width: calc(33.333% - 2vw);
    }

    font-family: Arial;
    font-weight: 600;
    text-transform: capitalize
`;

const PokeName = styled.div`
    margin-top: 25px;
    color: slategrey;
`;

const Logo = styled.img`
    width: 80%;
    max-width: 700px;
    display:block;
    margin:auto;
`;

function PokemonList(props) {
    const { favs, limit, offset } = props
    const [pokemons, setPokemons] = useState([]);
    const [filter, setFilter] = useState("");
    const navigate = useNavigate();

    async function getData(){
        let data = await getPokemons(limit, offset);
        setPokemons(data.results);
    }

    useEffect(() => {
        getData();
    }, [limit, offset]);


    return (
        <div>
            {pokemons.length === 0 ?
                <div>Loading pokemons</div>
                :
                <div>
                    <Logo src={logo} onClick={() => navigate("/pokemon")}/>
                    <Nav/>
                    <SearchFilter onChange={setFilter}/>
                    <Wrapper>
                        {pokemons.filter(poke =>
                            ((filter === "" || poke.name.includes(filter)) && (isFavourite(poke.name) || !favs)))
                            .map(poke => {
                                const img_url = "https://img.pokemondb.net/sprites/black-white/anim/" + (favs ? "shiny" : "normal") + "/" + poke.name + ".gif";
                                const link_path = "/pokemon/" + poke.name
                                return (
                                    <PokemonCard key={poke.name} onClick={() => navigate(link_path)}>
                                        {!favs &&
                                            <FavouriteToggler pokemon={poke.name} />
                                        }
                                        <img align="center" style={{ display: 'block', margin: 'auto' }} src={img_url} />
                                        <PokeName>{poke.name}</PokeName>
                                    </PokemonCard>
                                )
                            })}
                    </Wrapper>
                </div>
            }
        </div>
    );
}

PokemonList.propTypes = {
    favs: PropTypes.bool,
};

export default PokemonList;