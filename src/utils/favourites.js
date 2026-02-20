export const addFavourite = (pokemon_name) => {
    localStorage.setItem(pokemon_name, true);
};


export const isFavourite = (pokemon_name) => {
    let fav = localStorage.getItem(pokemon_name);
    return fav === "true";
};

export const removeFavourite = (pokemon_name) => {
    localStorage.setItem(pokemon_name, false);
};