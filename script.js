let currentPokemon;
let infoAboutPokemon;
let stop = 20;
let allPokemon = [];

async function loadAllPokemon() {
  document.getElementById('show_pokemon').innerHTML = '';
  for (let i = 1; i < stop; i++) {

    let urlName = `https://pokeapi.co/api/v2/pokemon/`;
    let response = await fetch(urlName);
    currentPokemon = await response.json();
    //console.log("Loaded Pokemon:", currentPokemon);

    let urlInfo = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    let info = await fetch(urlInfo);
    infoAboutPokemon = await info.json();
    allPokemon.push(infoAboutPokemon);
    console.log("Loaded Infos:", infoAboutPokemon);

    generateHTMLAllIndex(i, infoAboutPokemon);
    checkType(i, infoAboutPokemon);

    document.getElementById(`pokeImage${i}`).src = infoAboutPokemon['sprites']['other']['official-artwork']['front_shiny'];
  }
}


function generateHTMLAllIndex(i, infoAboutPokemon) {
    document.getElementById('show_pokemon').innerHTML += `
        <div id="mini_card${i}" onclick="openPokemonCard(${i})" class="pokemon${i} pokemon"> <!-- Pokemonname --> 
            <div class="info">
                <span class="id">#${infoAboutPokemon['id']}</span>
                <h2 id="pokename">${currentPokemon['results'][i - 1][`name`]}</h2>
                <span class="" id="element1">${infoAboutPokemon['types']['0']['type']['name']}</span>
            </div>
            <div class="image_in_container">
                <img class="background_pokeball" src="img/pokeball.png">
                <img class="image_in_container" id="pokeImage${i}" alt="Pokemonbild">
            </div>
        </div>
        `;
}


async function generateOpenPokemonCardHTML(i) {
    const pokemonData = allPokemon[i - 1]; // Index i - 1, da die Schleife bei 1 beginnt
    document.getElementById("pokecard").innerHTML = `
    <div class="big_card${i}">
        <div id="header_container">
            <div class="pokemonname_container">
                <p class="id2_1" onclick="backToStart()">Back to start</p>
                <p id="pokemonname">${pokemonData["name"]}</p>
                <p class="big_card_element" id="element1">${pokemonData["types"][0]["type"]["name"]}</p>
            </div>
            <div class="big_card_id_container">
                <p class="id2">#${pokemonData["id"]}</p>
            </div>
            <div class="img_character">
                <img class="pokemon_img" id="pokemonimage${i}" alt="Bild von einem Pokemon">
            </div>
        </div>
        
        <div class="infocontainer" id="infos">
            <div class="more_infos">
                <h2 class="more">More information</h2>
            </div>

            <div class="more_infos id2">
                <p>Type: <b>${pokemonData["types"][0]["type"]["name"]}</b></p>
                <p>Abilities: <b>${pokemonData["abilities"][0]["ability"]["name"]}</b> & <b>${pokemonData["abilities"][1]["ability"]["name"]}</b></p>
            </div>

            <div class="more_infos id2">
                <p>Height: <b>${pokemonData["height"]}0 cm</b></p>
                <p>Weight: <b>${pokemonData["weight"]} Kg</b></p>
            </div>


        </div>
    </div>
    `;
}


async function openPokemonCard(i) {
    document.getElementById('show_pokemon').classList.add('d-none');
    window.scrollTo(0, 0); // Scrollen Sie zur oberen Seite (x: 0, y: 0)
    document.getElementById('pokecard').classList.remove('d-none');
    
    await generateOpenPokemonCardHTML(i);
    document.getElementById(`pokemonimage${i}`).src = allPokemon[i - 1]['sprites']['other']['official-artwork']['front_shiny'];
    SecondcheckPokemonType(i);
}


function backToStart() {
    i = 1;
    document.getElementById('pokecard').classList.add('d-none');
    loadAllPokemon();
}

function SecondcheckPokemonType(i) {
    switch (allPokemon[i]['types']['0']['type']['name']) {
        case "water":
            document.querySelector(`#header_container`).classList.add('background-blue');
            break;
        case "fire":
            document.querySelector(`#header_container`).classList.add('background-red');
            break;
        case "grass":
            document.querySelector(`#header_container`).classList.add('background-green');
            break;
        case "bug":
            document.querySelector(`#header_container`).classList.add('background-olive');
            break;
        case "normal":
            document.querySelector(`#header_container`).classList.add('background-grey');
            break;
        default:
            document.querySelector(`#header_container`).classList.add('undefined_type');
            break;
    }
    i = 1;
}


function checkType(i, infoAboutPokemon) {
    checkWaterType(i, infoAboutPokemon);
    checkFireType(i, infoAboutPokemon);
    checkGrassType(i, infoAboutPokemon);
    checkBugType(i, infoAboutPokemon);
    checkNormalType(i, infoAboutPokemon);
}


function checkWaterType(i, infoAboutPokemon) {
    // Wenn der Wert des Arrays der String 'water' ist, ändere die Hintergrundfarbe des Containers in blau
    if (infoAboutPokemon['types']['0']['type']['name'] === "water"){
        document.querySelector(`.pokemon${i}`).classList.add('background-blue');
    } 
}


function checkFireType(i, infoAboutPokemon) {
    if (infoAboutPokemon['types']['0']['type']['name'] === "fire"){
        document.querySelector(`.pokemon${i}`).classList.add('background-red');
    }
}


function checkGrassType(i, infoAboutPokemon) {
        if (infoAboutPokemon['types']['0']['type']['name'] === "grass"){
            document.querySelector(`.pokemon${i}`).classList.add('background-green');
        }
}


function checkBugType(i, infoAboutPokemon) {
    if (infoAboutPokemon['types']['0']['type']['name'] === "bug"){
        document.querySelector(`.pokemon${i}`).classList.add('background-olive');
    }
}


function checkNormalType(i, infoAboutPokemon) {
    if (infoAboutPokemon['types']['0']['type']['name'] === "normal"){
        document.querySelector(`.pokemon${i}`).classList.add('background-grey');
    }
}




