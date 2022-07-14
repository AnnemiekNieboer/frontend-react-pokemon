import React, {useEffect, useState} from 'react';
import axios from "axios";

function PokemonCard({url}) {
    const [pokemonName, setPokemonName] = useState("");
    const [pokemonMoves, setPokemonMoves] = useState(0);
    const [pokemonWeight, setPokemonWeight] = useState(0);
    const [pokemonAbilities, setPokemonAbilities] = useState([])
    const [pokemonPicture, setPokemonPicture] = useState("no photo found");

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(url);
                setPokemonName(result.data.name);
                setPokemonMoves(result.data.moves);
                setPokemonWeight(result.data.weight);
                setPokemonAbilities(result.data.abilities)
                setPokemonPicture(result.data.sprites.front_default)
            } catch (e) {
                console.error(e)
            }
        }
        fetchData();
    }, [url]);


    return (
        <article className="pokemon-card" key={pokemonName}>
            <h2>{pokemonName}</h2>
            <img className="pokemon-image" src={pokemonPicture} alt={pokemonName}/>
            <p>Moves: {pokemonMoves.length} </p>
            <p>Weight: {pokemonWeight}</p>
            <p>Abilities:</p>
            {pokemonAbilities.map((ability) => {
                return (
                    <div className="pokemon-ability">{ability.ability.name}</div>
                )
            })}
        </article>
    );
}

export default PokemonCard;