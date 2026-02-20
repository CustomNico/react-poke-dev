// Generation 1: Pokemon 1-151 (Kanto)
export const getGen1Pokemons = () => {
    return fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
        .then(response => response.json());
};

// Generation 3: Pokemon 252-386 (Hoenn)
export const getGen3Pokemons = () => {
    return fetch('https://pokeapi.co/api/v2/pokemon?limit=135&offset=251')
        .then(response => response.json());
};

// Generic function (kept for compatibility)
export const getPokemons = (limit = 151, offset = 0) => {
    return fetch('https://pokeapi.co/api/v2/pokemon?limit=' + limit + '&offset=' + offset)
        .then(response => response.json());
};

export const getPokemon = (name = '') => {
    return fetch('https://pokeapi.co/api/v2/pokemon/' + name)
        .then(response => response.json());
};