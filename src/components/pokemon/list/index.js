import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { SearchFilter } from '../../utils/searchFilter'
import { Nav } from '../../utils/nav'
import { FavouriteToggler } from '../../utils/favouriteToggler'
import { Loader } from '../../loader'

import { getPokemons } from '../../../utils/pokemonAPI'
import { isFavourite } from '../../../utils/favourites'

import logo from '../../../assets/pokemon-logo.png'

import './styles.scss'
const POKEMON_CON_MEGA = [
  'venusaur', 'charizard', 'blastoise', 'alakazam', 'gengar',
  'kangaskhan', 'pinsir', 'gyarados', 'aerodactyl', 'mewtwo',
  'ampharos', 'scizor', 'heracross', 'houndoom', 'tyranitar',
  'blaziken', 'gardevoir', 'mawile', 'aggron', 'medicham',
  'manectric', 'sharpedo', 'camerupt', 'altaria', 'banette',
  'absol', 'glalie', 'salamence', 'metagross', 'latias',
  'latios', 'rayquaza', 'lopunny', 'garchomp', 'lucario',
  'abomasnow', 'gallade', 'audino', 'diancie', 'sceptile',
  'swampert', 'sableye', 'pidgeot', 'beedrill', 'slowbro', 'steelix'
]

export const PokemonList = ({ favs }) => {
  const [pokemons, setPokemons] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedTypes, setSelectedTypes] = useState([])

  const navigate = useNavigate()

  async function getData() {
    const data = await getPokemons(151)

    const detailedPokemons = await Promise.all(
      data.results.map(async (poke) => {
        const res = await fetch(poke.url)
        const details = await res.json()

        return {
          name: poke.name,
          types: details.types.map((t) => t.type.name)
        }
      })
    )

    setPokemons(detailedPokemons)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      {pokemons.length === 0 ? (
        <Loader />
      ) : (
        <div>
          <img
            src={logo}
            className="pokemon-logo"
            onClick={() => navigate('/pokemon')}
            alt="Pokemon Logo"
          />
          <Nav />
          <SearchFilter
            onNameChange={(value) => setFilter(value)}
            onTypesChange={(types) => setSelectedTypes(types)}
            types={[...new Set(pokemons.flatMap((element) => element.types))]}
          />

          <div className="pokemon-wrapper">
            {pokemons
              .filter((poke) => {
                const matchesName = filter === '' || poke.name.includes(filter)
                const matchesFavs = isFavourite(poke.name) || !favs
                const matchesTypes =
                  selectedTypes.length === 0 ||
                  selectedTypes.some((t) => poke.types.includes(t))
                return matchesName && matchesFavs && matchesTypes
              })
              .map((poke) => {
                const img_url =
                  'https://img.pokemondb.net/sprites/black-white/anim/' +
                  (favs ? 'shiny' : 'normal') +
                  '/' +
                  poke.name +
                  '.gif'

                const link_path = '/pokemon/' + poke.name

                return (
                  <div
                    key={poke.name}
                    className="pokemon-card"
                    onClick={() => navigate(link_path)}
                  >
                    {!favs && <FavouriteToggler element={poke.name} />}
                    <img src={img_url} alt={poke.name} />
                    <div className="poke-name">{poke.name}</div>
                    {POKEMON_CON_MEGA.includes(poke.name) && (
                      <button
                        className="mega-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          alert('¡' + poke.name + ' tiene Mega Evolución! 🦙')
                        }}
                        title="Tiene Mega Evolución"
                      >
                        🦙
                      </button>
                    )}
                  </div>
                )
              })}
          </div>
        </div>
      )}
    </div>
  )
}
