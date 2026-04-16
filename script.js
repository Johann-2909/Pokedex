const P = new Pokedex.Pokedex()

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
    window.location.href = `details.html?pokemon=${card.dataset.name}`;
  });
  return card;
}

async function loadAllPokemon() {
  const list = await P.getPokemonsList({ limit: 151, offset: 0 })

  for (const pokemon of list.results) {
    const details = await P.getPokemonByName(pokemon.name)
    const name = details.name
    const image = details.sprites.front_default
    const type = details.types[0].type.name
    const weight = details.weight
    const height = details.height
    const card = createPokemonCards(name, image, type, weight, height);
    document.getElementById("poke-container").appendChild(card)

  }
}

function filterPokemon() {
  let input = document.getElementById("search");
  let filter = input.value.toLowerCase();
  let cards = document.querySelectorAll(".pokemon-card")

  for (let i = 0; i < cards.length; i++) {
    if (cards[i].dataset.name.toLowerCase().includes(filter)) {
      cards[i].style.display = "block"
    } else if (cards[i].dataset.type.includes(filter)) { cards[i].style.display = "block" }
    else { cards[i].style.display = "none" };

  }

}

document.getElementById("search").addEventListener("input", filterPokemon)

loadAllPokemon();