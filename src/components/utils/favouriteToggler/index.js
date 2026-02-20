import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

import { isFavourite, addFavourite, removeFavourite } from "../../../utils/favourites";

import fullHeart from "../../../assets/heart-full.png"
import emptyHeart from "../../../assets/heart-empty.png"

const Toggler = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px;
    width: 30px;
    height: 30px;
`;

function FavouriteToggler(props) {
    const name = props.pokemon;
    const [icon, setIcon] = useState("");

    useEffect(() => {
        setIcon(favIcon(name));
    }, []);

    const favIcon = () => {
        let is = isFavourite(name);
        return is ? fullHeart : emptyHeart;
    }

    const toggleFav = (e) => {
        e.stopPropagation();
        e.preventDefault();

        let is = isFavourite(name);
        is ? removeFavourite(name) : addFavourite(name);
        setIcon(favIcon(name));
    }

    return (
        <Toggler src={icon} onClick={(e) => toggleFav(e)}/>
    );
}

FavouriteToggler.propTypes = {
    pokemon: PropTypes.string,
};

export default FavouriteToggler;