// Create Dino Constructor
const Dinosaur = function (species, weight, height, diet, where, when, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.facts = [fact];
  if (arguments.length !== 7) {
    console.error("Dinosaur init with 'incorrect' argument number");
  }
  this.imgUrl = `images/${this.species.toLowerCase()}.png`;
};

// Create Dino Objects
fetch("/dino.json")
  .then((response) => response.json())
  .then((data) => {
    const listDinosDetails = data.Dinos;
    window.listOfConstructedDinos = listDinosDetails.map(
      (dinoDetails) => new Dinosaur(...Object.values(dinoDetails))
    );
  });

// Create Human Object
class Human {
  constructor(name, height, weight, diet) {
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.diet = diet;
    this.imgUrl = "images/human.png";
    this.species = "Human";
  }
}

// Function to get human data from form
function getHumanFromFormData() {
  const name = window.document.getElementById("name").value;
  const feet = window.document.getElementById("feet").value;
  const inches = window.document.getElementById("inches").value;
  const height = feet * 12 + inches;
  const weight = window.document.getElementById("weight").value;
  const diet = window.document.getElementById("diet").value;
  return new Human(name, height, weight, diet);
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
function getDietComparisonPhrase(human, dino) {
  const humanDiet = human.diet.toLowerCase();
  const preposition = humanDiet.toLowerCase === "omnivore" ? "an " : "a ";
  let phrase;
  if (humanDiet === dino.diet) {
    phrase = `You are ${preposition + humanDiet}, and so is ${dino.species}. `;
  } else {
    phrase = `While you are ${preposition + humanDiet}, ${dino.species} is ${
      preposition + dino.diet
    }. `;
  }
  return phrase;
}

function getDietComparisonPhraseExtra(human, dino) {
  let dietComparisonPhraseExtra = "";
  if (human.diet.toLowerCase() === "herbavor" && dino.diet === "herbavor") {
    dietComparisonPhraseExtra = `You and ${dino.species} are both herbavors, yay! 
    This means that you can have lunch together.`;
  } else if (dino.diet === "carnivor") {
    dietComparisonPhraseExtra = `Be careful! You might end up as lunch for ${dino.species}!`;
  }
  return dietComparisonPhraseExtra;
}

function getDietComparison(human, dino) {
  const dietComparisonBase = getDietComparisonPhrase(human, dino);
  const dietComparisonExtra = getDietComparisonPhraseExtra(human, dino);
  return dietComparisonBase + dietComparisonExtra;
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.


// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
function getRandomFactFromListOfFacts(listOfFacts) {
  const randomIndex = window.Math.floor(
    window.Math.random() * listOfFacts.length
  );
  return listOfFacts[randomIndex];
}

function addComparisonsToDinoFacts(human) {
  window.listOfConstructedDinos.forEach((dino) => {
    dino.facts.push(getDietComparison(human, dino));
  });
}

// Generate Tiles for each Dino in Array
function getAnimalInfoTile(animal) {
  const animalTile = window.document.createElement("li");
  const animalHeadlineContent = animal.name ? animal.name : animal.species;
  const isDino = animal.species !== "Human";
  let fact;
  if (isDino) {
    fact = getRandomFactFromListOfFacts(animal.facts);
  }
  animalTile.setAttribute("class", "animal-tile");
  animalTile.setAttribute("id", `animal_tile_${animal.species.toLowerCase()}`);
  animalTile.innerHTML = `<div class="animal-tile_img-wrapper">
    <img src="${animal.imgUrl}" alt="${animal.species}" class="animal-tile_img"/>
  </div>
  <header>
    <h4 class="animal-tile_species">${animalHeadlineContent}</h4>
  </header>`;
  if (isDino) {
    animalTile.innerHTML += `<ul class="animal-tile_facts">
    <li>${fact}</li>
  </ul>`;
  }
  return animalTile;
}

// Add tiles to DOM
function getListOfDinosTiles() {
  let listOfTiles = window.document.createElement("ul");
  listOfTiles.setAttribute("id", "animal_tile_list");

  const docFragDinoList = new DocumentFragment();
  docFragDinoList.appendChild(listOfTiles);
  listOfTiles = docFragDinoList.getElementById("animal_tile_list");

  window.listOfConstructedDinos.forEach((dino) => {
    listOfTiles.appendChild(getAnimalInfoTile(dino));
  });

  return docFragDinoList;
}

function addHumanAtPos(position) {
  window.document.querySelectorAll(".animal-tile").forEach((tile, index) => {
    if (index === position - 1) {
      tile.parentNode.insertBefore(getAnimalInfoTile(window.formHuman), tile);
    }
  });
}

function removeForm() {
  window.document.getElementById("dino-compare").remove();
}

// On button click, prepare and display infographic
window.document.addEventListener("submit", (ev) => {
  ev.preventDefault();
  window.formHuman = getHumanFromFormData();
  removeForm();
  addComparisonsToDinoFacts(window.formHuman);
  window.document.getElementById("grid").appendChild(getListOfDinosTiles());
  addHumanAtPos(5);
});
