import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    fetchPokemon();
    window.scrollTo(0, 0); 
  }
};

  const fetchPokemon = async () => {
    if (pokemonName.trim() !== "") {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
        );
        setPokemonData(response.data);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
        setPokemonData(null);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    setPokemonData(null);
  }, [pokemonName]);

  return (
    <div className="Pokemon-App container">
      <img
        src="https://i.imgur.com/1Etib7y.png"
        alt="Pokemon Logo"
        className="pokemon-logo"
      />
      {/* <h1 className="text-center mt-5">Pokémon Pokédex</h1> */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter Pokémon ID"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-primary" onClick={fetchPokemon}>
          Search
        </button>
      </div>

      {pokemonData && (
        <motion.div key={pokemonData.id} className="total-data mt-5">
          {/* Image Animation */}
          <motion.h2
            className="name"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {capitalizeFirstLetter(pokemonData.name)}
          </motion.h2>

          <motion.img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            className="pokemon-image"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Delayed Data */}
          {!isLoading && (
            <motion.div
              className="details-container"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="grid-container">
                <motion.div
                  className="grid-item details"
                  variants={itemVariants}
                >
                  <h3>Details:</h3>
                  <p>Height: {pokemonData.height / 10} meters</p>
                  <p>Weight: {pokemonData.weight / 10} kg</p>
                </motion.div>

                <motion.div className="grid-item types" variants={itemVariants}>
                  <h3>Types:</h3>
                  {pokemonData.types.map((type) => (
                    <p key={type.type.name}>
                      {capitalizeFirstLetter(type.type.name)}
                    </p>
                  ))}
                </motion.div>

                <motion.div
                  className="grid-item abilities"
                  variants={itemVariants}
                >
                  <h3>Abilities:</h3>
                  {pokemonData.abilities.map((ability) => (
                    <p key={ability.ability.name}>
                      {capitalizeFirstLetter(ability.ability.name)}
                    </p>
                  ))}
                </motion.div>

                <motion.div className="grid-item stats" variants={itemVariants}>
                  <h3>Stats:</h3>
                  <div className="bulletpoints">
                    <div className="stats-columns">
                      <div className="stats-column">
                        {pokemonData.stats.slice(0, 3).map((stat) => (
                          <p key={stat.stat.name}>
                            {capitalizeFirstLetter(stat.stat.name)}:{" "}
                            {stat.base_stat}
                          </p>
                        ))}
                      </div>
                      <div className="stats-column">
                        {pokemonData.stats.slice(3, 6).map((stat) => (
                          <p key={stat.stat.name}>
                            {capitalizeFirstLetter(stat.stat.name)}:{" "}
                            {stat.base_stat}
                          </p>
                        ))}
                      </div>
                      <div className="stats-column">
                        {pokemonData.stats.slice(6).map((stat) => (
                          <p key={stat.stat.name}>
                            {capitalizeFirstLetter(stat.stat.name)}:{" "}
                            {stat.base_stat}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default App;
