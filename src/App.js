import React, {useEffect, useState} from 'react';
import './App.css';
import logo from './assets/pokemon-logo.png';
import errorImage from './assets/pokemon-error.webp';
import waitingImage from './assets/waiting-pokemon.gif';
import axios from "axios";
import PokemonCard from "./components/Pokemon-card";

function App() {
    const [pokemonURIs, fetchPokemonURIs] = useState([]);
    const [previousPokemonPage, fetchPreviousPokemonPage] = useState("");
    const [nextPokemonPage, fetchNextPokemonPage] = useState("");
    const [endpoint, setEndpoint] = useState("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        async function fetchPokemons() {
            toggleError(false);
            toggleLoading(true);
            try {
                const result = await axios.get(endpoint);
                fetchPokemonURIs(result.data.results);
                fetchPreviousPokemonPage(result.data.previous);
                fetchNextPokemonPage(result.data.next);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
            toggleLoading(false)
        }

        fetchPokemons();
    }, [endpoint]);

    function switchPage(pageSelector) {
        setEndpoint(pageSelector);
    }

    return (
        <>
            <header>
                <img className="logo" src={logo} alt="pokemon logo"/>
                <nav>
                    <button
                        disabled={!previousPokemonPage}
                        onClick={() => switchPage(previousPokemonPage)}
                        type="button">
                        Vorige
                    </button>
                    <button
                        disabled={!nextPokemonPage}
                        onClick={() => switchPage(nextPokemonPage)}
                        type="button">
                        Volgende
                    </button>
                </nav>
            </header>
            <main>
                {error &&
                    <div className="pokemon-card error-loading-message">
                        <img src={errorImage} alt="sad-pokemon"/>
                        <p>Gotta catch em all? Unfortunately not, sorry something went wrong. Please try again later</p>
                    </div>
                }
                {loading &&
                    <div className="pokemon-card error-loading-message">
                        <img src={waitingImage} alt="bored-pokemon"/>
                        <p>Loading Pokemons to gotta catch em all...</p>
                    </div>
                }
                <div className="pokemon-cards__outer-container">
                    {pokemonURIs.map((pokemonURI) => {
                        return (
                            <PokemonCard
                                url={pokemonURI.url}
                            />
                        )
                    })}
                </div>
            </main>
        </>
    );
}

export default App;
