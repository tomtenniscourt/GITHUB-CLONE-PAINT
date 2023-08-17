# Pokémon Pokédex App

This is a simple React-based web application that allows users to search for and view information about Pokémon using the Pokémon API. The app features interactive input, data fetching, and animations to enhance the user experience. To use this app, enter a Pokémon's ID or name to the search bar, and click **Search**.

## Code Overview

The main code file for this app is `App.js`, responsible for rendering UI components and managing the logic for fetching and displaying Pokémon data. The `App.css` file is responsible for the styling, which I have kept to a minimum. 

## Dependencies

The app relies on the following external libraries:

- **React:** A JavaScript library for building user interfaces.
- **Axios:** A promise-based HTTP client used for making API requests.
- **Framer Motion:** A library for adding animations to React components.

## Features
- Search for Pokémon by name or ID.
- Display detailed information about the Pokémon.
- Animation effects using framer-motion.
- Dynamically fetch and display Pokémon data from the PokeAPI.
- Error handling for failed API requests.

## Code Explanation

### State Management
The app uses React's state management to handle the user's input for the Pokémon name, the retrieved Pokémon data, and a loading indicator.

### Fetching Pokémon Data
The `fetchPokemon` function is responsible for making an asynchronous HTTP request to the PokeAPI using axios. It fetches the data for the entered Pokémon name/ID and updates the state accordingly. If an error occurs, it handles the error and sets the Pokémon data to null.

### Animation Effects
The app utilizes the `framer-motion` library to add a simple animation to the components. Animation variants are defined using `containerVariants` and `itemVariants`, which determine the animations for the container and individual items respectively.

### Rendering Pokémon Details
The fetched Pokémon details are conditionally displayed within a `<motion.div>`. The Pokémon's image, types, abilities, and stats are also displayed, along with animation effects from framer-motion. I also added the `capitalizeFirstLetter` function as the default data fetched from the API was all lowercase.

## Contributing
Contributions to the project are welcome! If you find any issues or have suggestions for improvements, feel free to submit a pull request or open an issue:

1. Fork the repository.
2. Create a new branch for your new feature or bug fix:
3. Make your changes and commit them with a descriptive message (e.g. git commit -m "Added feature: your name/username"):
4. Push your changes to your forked repository:
5. Open a pull request to the main repository.

#Enjoy :) 