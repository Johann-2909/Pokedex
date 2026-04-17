const P = new Pokedex.Pokedex()
const params = new URLSearchParams(window.location.search)
const name = params.get("pokemon")


async function detailsPokemon() {
    const details = await P.getPokemonByName(name)
    const pokemonName = details.name
    const image = details.sprites.other["official-artwork"].front_default
    const type = details.types[0].type.name
    const weight = details.weight
    const height = details.height
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.innerHTML = `
      <div class="card-details">
        <img src="${image}">
        <h2>${pokemonName}</h2>
        <p>Type: ${type}</p>
        <p>Weight: ${weight / 10} kg</p>
        <p>Height: ${height / 10} m</p>
      </div>
    `
    card.dataset.name = name
    card.dataset.type = type
    document.getElementById("details").appendChild(card)
}


detailsPokemon()