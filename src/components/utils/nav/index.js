import React from 'react';
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { generations } from "../../../utils/generations";
import master from "../../../assets/masterball.png"
import pokeball from "../../../assets/pokeball.png"
import healball from "../../../assets/heal-ball.png"

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-top: 30px;
    margin-left: 40px;
    margin-right: 40px;
    width: calc(100% - 80px);
    max-width: 900px;
    text-align: center;
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

const PageLink = styled.a`
    margin-left: 20px;
    min-width: 125px;
    margin-right: 40px;
    height: 20px;
    border-radius: 20px;
    border: 2px solid blue;
    padding: 1px 10px;
    background: yellow;
    font-family: Arial;
    font-size: 15px;
    color: blue;
    font-weight: bold;
    cursor: pointer;
    text-decoration: ${props => props.active ? "underline" : "none"};
    box-shadow: ${props => props.active ? "1px 1px 10px" : "0"};
`;

const BallIcon = styled.img`
    width: 34px;
    cursor: pointer;
`;

const ballIcons = {
    "/gen1": pokeball,
    "/gen5": healball,
};

function Nav() {
    const navigate = useNavigate();
    let location = useLocation();

    return (
    <div>
        <Wrapper>
            {generations.map(gen => (
                <React.Fragment key={gen.path}>
                    <BallIcon
                        src={ballIcons[gen.path]}
                        onClick={() => navigate(gen.path)}
                    />
                    <PageLink
                        active={location.pathname === gen.path}
                        onClick={() => navigate(gen.path)}
                    >
                        {gen.name}
                    </PageLink>
                </React.Fragment>
            ))}
            <BallIcon src={master} onClick={() => navigate("/favourites")}/>
            <PageLink
                active={location.pathname === "/favourites"}
                onClick={() => navigate("/favourites")}
            >
                Favourites
            </PageLink>
        </Wrapper>
    </div>
    );
}

export default Nav;
