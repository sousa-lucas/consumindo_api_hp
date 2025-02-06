const characterSelect = document.getElementById('characterSelect');
const characterInfo = document.getElementById('characterInfo');
const characterImage = document.getElementById('characterImage');
const characterName = document.getElementById('characterName');
const characterHouse = document.getElementById('characterHouse');
const characterBirth = document.getElementById('characterBirth');
const characterActor = document.getElementById('characterActor');
const houseCrest = document.getElementById('houseCrest');

const houseCrests = {
    "Gryffindor": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Blason_Gryffondor.svg/640px-Blason_Gryffondor.svg.png",
    "Hufflepuff": "https://static.wikia.nocookie.net/harrypotter/images/0/06/Hufflepuff_ClearBG.png/revision/latest?cb=20200612012838&path-prefix=pt-br",
    "Ravenclaw": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Blason_Serdaigle.svg/640px-Blason_Serdaigle.svg.png",
    "Slytherin": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Blason_Serpentard.svg/640px-Blason_Serpentard.svg.png"
};

async function fetchCharacters() {
    const response = await fetch('https://hp-api.onrender.com/api/characters');
    const characters = await response.json();
    characters.forEach(character => {
        const option = document.createElement('option');
        option.value = character.name;
        option.textContent = character.name;
        characterSelect.appendChild(option);
    });
}

function displayCharacterInfo(character) {
    characterImage.src = character.image;
    characterName.textContent = character.name;
    characterHouse.textContent = `Casa: ${character.house || 'Desconhecida'}`;
    characterBirth.textContent = `Data de Nascimento: ${character.dateOfBirth || 'Desconhecida'}`;
    characterActor.textContent = `Ator:  ${character.actor}`;
    
    // Atualiza o brasão da casa
    houseCrest.src = houseCrests[character.house] || '';
}

characterSelect.addEventListener('change', () => {
    const selectedCharacter = characterSelect.value;
    fetch('https://hp-api.onrender.com/api/characters')
        .then(response => response.json())
        .then(characters => {
            const character = characters.find(c => c.name === selectedCharacter);
            if (character) {
                displayCharacterInfo(character);
            }
        });
});

// Inicializa a lista de personagens
fetchCharacters();