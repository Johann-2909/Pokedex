const P = new Pokedex.Pokedex()
const params = new URLSearchParams(window.location.search)
const name = params.get("pokemon")


function getDetailsPokemon(pokemonName, image, shinyImage, type, weight, height) {
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
    card.dataset.image = image
    card.dataset.shinyImage = shinyImage

    document.getElementById("shiny-toggle").addEventListener("click", function () {
        const currentImage = card.querySelector("img").src;
        const shinyImage = card.dataset.shinyImage;
        const defaultImage = card.dataset.image;
        card.querySelector("img").src = currentImage === defaultImage ? shinyImage : defaultImage;
    });

    return card;
}

async function loadPokemonDetails() {
    const details = await P.getPokemonByName(name)
    const pokemonName = details.name
    const image = details.sprites.other["official-artwork"].front_default
    const shinyImage = details.sprites.other["official-artwork"].front_shiny
    const type = details.types[0].type.name
    const weight = details.weight
    const height = details.height
    const stats = details.stats
    const abilities = details.abilities
    const card = getDetailsPokemon(pokemonName, image, shinyImage, type, weight, height);
    const statsCard = statsDetails(stats);
    const abilitiesCard = await abilitiesDetails(abilities);
    const containerTop = document.getElementById("details-top");
    const containerBottom = document.getElementById("details-bottom");
    containerTop.appendChild(card);
    containerTop.appendChild(statsCard);
    containerBottom.appendChild(abilitiesCard);
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
            <div class="bar" style="width: ${(stat.base_stat / 255) * 100}%"></div>
        `;

        statCard.appendChild(statItem);
    }

    return statCard;
}

async function abilitiesDetails(abilities) {
    const abilitiesCard = document.createElement('div');
    abilitiesCard.className = 'abilities-card';

    for (const ability of abilities) {
        const abilityData = await P.getAbilityByName(ability.ability.name)
        const description = abilityData.effect_entries.find(entry => entry.language.name === 'en').effect
        const abilityItem = document.createElement('div');
        abilityItem.className = 'ability-item';
        abilityItem.innerHTML = `
            <h3>${ability.ability.name}</h3>
            <p>${description || 'No description available.'}</p>
        `;
        abilitiesCard.appendChild(abilityItem);
    }

    return abilitiesCard;
}


loadPokemonDetails()