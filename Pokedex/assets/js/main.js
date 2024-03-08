
const pokemonList = document.getElementById('pokemonList')
const loadMoreBtn = document.getElementById('loadMoreBtn')
const maxRecorder = 1025
let offset = 0
const limit = 12





function convertPokemonToLi(pokemon){
    return`  
        <li class="pokemon ${pokemon.type}">
            <img class="background_type" src="/images/types/${pokemon.type}.png" alt="${pokemon.type}" />
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <ol class="abilities">
                    ${pokemon.abilities.map((ability) => `<li class="ability ${ability}">${ability}</li>`).join('')}
                </ol>

                <span class="hp">HP: ${pokemon.hp}/${pokemon.hp}</span>

                <span class= "weight">Weight: ${pokemon.weight/10} kg </span>
                <span class="height">Height: ${pokemon.height/10} m </span>

            </div>
            <img class="pokemon_img" src="${pokemon.photo}" alt="${pokemon.name}">

            
    
        </li>
    `
}

function LoadPokemonItens (offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = {}) =>{
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

LoadPokemonItens(offset,limit)

// Evento de clique no botão "Carregar mais"

loadMoreBtn.addEventListener('click', ()=>{
    offset += limit
    const PokedexMaximo = offset + limit

    if (PokedexMaximo >= maxRecorder){
        const newLimit = maxRecorder - offset
        LoadPokemonItens(offset, newLimit) 

        loadMoreBtn.parentElement.removeChild(loadMoreBtn)
    }else{
        LoadPokemonItens(offset, limit)
    }

})
