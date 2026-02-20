import React, { useState } from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    padding-top: 30px;
    padding-bottom: 30px;
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

const InputBar = styled.input `
    min-width: 200px;
    width: 50%;
    margin-right: 30px;
    height: 30px;
    border-radius: 20px;
    border: 1px solid grey;
    padding: 1px 10px;
`;

function SearchFilter(props) {
    const [searchTerm, setSearchTerm] = useState("");

    const updateTextSearch = (e) => {
        setSearchTerm(e.target.value);
        props.onChange(e.target.value)
    }

    return (
        <div>
            <Wrapper>
                <InputBar placeholder={"Search by name"} type="text" value={searchTerm} onChange={updateTextSearch}/>
            </Wrapper>
        </div>
    );

}

SearchFilter.propTypes = {
    onChange: PropTypes.func,
};

export default SearchFilter;