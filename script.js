const P = new Pokedex.Pokedex()

/* Create Pokemon Cards */
function createPokemonCards(name, image, type, weight, height) {
  const card = document.createElement('div');
  card.className = 'pokemon-card';
  card.innerHTML = `
      <div class="card">
        <img src="${image}">
        <h2>${name}</h2>
        <p>Type: ${type}</p>
        <p>Weight: ${weight / 10} kg</p>
        <p>Height: ${height / 10} m</p>
      </div>
    `
  card.dataset.name = name
  card.dataset.type = type
  card.addEventListener("click", function () {
    window.location.href = `detail.html?pokemon=${card.dataset.name}`;
  });
  return card;
}

/* Load All Pokemon */
async function loadAllPokemon() {
  const list = await P.getPokemonsList({ limit: 151, offset: 0 })
  const pokemonContainer = document.getElementById("poke-container")
  for (const pokemon of list.results) {
    const details = await P.getPokemonByName(pokemon.name)
    const name = details.name
    const image = details.sprites.front_default
    const type = details.types[0].type.name
    const weight = details.weight
    const height = details.height
    const card = createPokemonCards(name, image, type, weight, height);
    pokemonContainer.appendChild(card)
  }
}

/* Type Filter */
function filterPokemon() {
  let filter = document.getElementById("search").value.toLowerCase();
  let filterType = document.getElementById("type-filter").value.toLowerCase();
  let cards = document.querySelectorAll(".pokemon-card")

  for (let i = 0; i < cards.length; i++) {
    const nameMatch = cards[i].dataset.name.toLowerCase().includes(filter)
    const typeMatch = filterType === "" || cards[i].dataset.type === filterType
    cards[i].style.display = nameMatch && typeMatch ? "block" : "none"
  }
}

document.getElementById("search").addEventListener("input", filterPokemon)
document.getElementById("type-filter").addEventListener("change", filterPokemon)

loadAllPokemon();