// ## **Further Study**

// 1. Figure out how to make a single request to the [Pokemon API](https://pokeapi.co/) to get names and URLs for every pokemon in the database.
const baseURL = "https://pokeapi.co/api/v2/pokemon?limit=10000";

async function getAllPokemon() {
  let data = await $.getJSON(baseURL);
  let pokemon = data.results;
  console.log(pokemon);
}

getAllPokemon();

// 2. Once you have names and URLs of all the pokemon, pick three at random and make requests to their URLs. Once those requests are complete, ***console.log*** the data for each pokemon.
async function get3Pokemon() {
  let data = await $.getJSON(baseURL);
  let pokemon = data.results;
  let count = data.count;

  for (let i = 0; i < 3; i++) {
    let randomIdx = Math.floor(Math.random() * count);
    let randomPokemon = pokemon[randomIdx];

    let pokemonData = await $.getJSON(randomPokemon.url);
    console.log(pokemonData);
  }
}

get3Pokemon();

// 3. Start with your code from 2, but instead of logging the data on each random pokemon, store the name of the pokemon in a variable and then make another request, this time to that pokemon’s ***species*** URL (you should see a key of ***species*** in the data). Once *that* request comes back, look in the ***flavor_text_entries*** key of the response data for a description of the species written in English. If you find one, ***console.log*** the name of the pokemon along with the description you found.

//     Example: “ducklett: They are better at swimming than flying, and they happily eat their favorite food, peat moss, as they dive underwater.”
async function getPokeInfo() {
  let data = await $.getJSON(baseURL);
  let pokemon = data.results;
  let count = data.count;

  for (let i = 0; i < 3; i++) {
    let randomIdx = Math.floor(Math.random() * count);
    let randomPokemon = pokemon[randomIdx];

    let pokemonData = await $.getJSON(randomPokemon.url);
    let pokemonName = pokemonData.name;

    let speciesData = await $.getJSON(pokemonData.species.url);
    let englishFlavorText = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );

    if (englishFlavorText) {
      console.log(`${pokemonName}: ${englishFlavorText.flavor_text}`);
    } else {
      console.log(`${pokemonName}: No English description found.`);
    }
  }
}

getPokeInfo();
