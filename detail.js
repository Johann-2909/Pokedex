const P = new Pokedex.Pokedex()
const params = new URLSearchParams(window.location.search)
const name = params.get("pokemon")


function getDetailsPokemon(pokemonName, image, type, weight, height) {
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
    card.dataset.pokemonName = name
    card.dataset.type = type
    return card;
}

async function loadPokemonDetails() {
    const details = await P.getPokemonByName(name)
    const pokemonName = details.name
    const image = details.sprites.other["official-artwork"].front_default
    const type = details.types[0].type.name
    const weight = details.weight
    const height = details.height
    const stats = details.stats
    const card = getDetailsPokemon(name, image, type, weight, height);
    const statsCard = statsDetails(stats);
    const container = document.getElementById("details");
    container.appendChild(card);
    container.appendChild(statsCard);
}

function statsDetails(stats) {
    const statCard = document.createElement('div');
    statCard.className = 'stat-card';

    for (const stat of stats) {
        const statItem = document.createElement('div');
        statItem.className = 'stat-details';

        statItem.innerHTML = `
            <h3>${stat.stat.name}</h3>
            <p>Base Stat: ${stat.base_stat}</p>
        `;

        statCard.appendChild(statItem);
    }

    return statCard;
}

loadPokemonDetails()