/* eslint-disable max-classes-per-file */
// Create Dino Constructor
class Dinosaur {
  constructor(species, weight, height, diet, where, when, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.facts = [fact];
    this.imgUrl = `images/${this.species.toLowerCase()}.png`;
  }

  getDietComparisonPhrase(human) {
    const humanDiet = human.diet.toLowerCase();
    const preposition = humanDiet.toLowerCase() === "omnivore" ? "an " : "a ";
    let phrase;
    if (humanDiet === this.diet) {
      phrase = `You are ${preposition + humanDiet}, and so is ${
        this.species
      }. `;
    } else {
      phrase = `While you are ${preposition + humanDiet}, ${this.species} is ${
        preposition + this.diet
      }. `;
    }
    return phrase;
  }

  getDietComparisonPhraseExtra(human) {
    let dietComparisonPhraseExtra = "";
    if (human.diet.toLowerCase() === "herbavor" && this.diet === "herbavor") {
      dietComparisonPhraseExtra = `Yay! You and ${this.species} can have lunch together, safely.`;
    } else if (this.diet === "carnivor") {
      dietComparisonPhraseExtra = `Be careful – you might end up as lunch for ${this.species}!`;
    }
    return dietComparisonPhraseExtra;
  }

  getDietComparison(human) {
    const dietComparisonBase = this.getDietComparisonPhrase(human);
    const dietComparisonExtra = this.getDietComparisonPhraseExtra(human);
    return dietComparisonBase + dietComparisonExtra;
  }

  // Create Dino Compare Method 2
  // NOTE: Weight in JSON file is in lbs, height in inches.
  getWeightComparison(human) {
    const humanWeight = human.weight;
    const dinoWeight = this.weight;
    let weightPhrase = "";
    const baseComparison = `You weigh ${humanWeight.toLocaleString()} lbs, while ${
      this.species
    } weighs about ${dinoWeight.toLocaleString()} lbs. `;
    if (dinoWeight > humanWeight) {
      weightPhrase = `${this.species} is heavier than you are.`;
    } else if (dinoWeight === humanWeight) {
      weightPhrase = `You and ${this.species} are the same weight – what a co-incidence!`;
    } else if (dinoWeight < humanWeight) {
      weightPhrase = "You are actually heavier than a dinosaur – good for you!";
    }

    return baseComparison + weightPhrase;
  }

  // Create Dino Compare Method 3
  // eslint-disable-next-line class-methods-use-this
  getHeightPhrase(heightInches) {
    let phrase = "";
    const diffFeet = window.Math.floor(heightInches / 12);
    const remainingInches = heightInches % 12;
    if (remainingInches) {
      phrase += `${diffFeet} feet and ${remainingInches} inches`;
    } else {
      phrase += `${diffFeet} feet`;
    }
    return phrase;
  }

  // NOTE: Weight in JSON file is in lbs, height in inches.
  getHeightComparison(human) {
    const humanHeightInches = window.parseInt(human.height);
    const dinoHeightInches = window.parseInt(this.height);
    const diffInches = dinoHeightInches - humanHeightInches;
    let heightPhrase = `${this.species} is ${this.getHeightPhrase(
      dinoHeightInches
    )} in height. `;
    if (dinoHeightInches > humanHeightInches) {
      heightPhrase += `${
        this.species
      } is taller than you are  – by ${this.getHeightPhrase(diffInches)}.`;
    } else if (dinoHeightInches === humanHeightInches) {
      heightPhrase += `You and ${this.species} are the same height – what a co-incidence!`;
    } else if (dinoHeightInches < humanHeightInches) {
      heightPhrase += "You are actually taller than a dinosaur – good for you!";
    }
    return heightPhrase;
  }
}

// Create Dino Objects
function addErrorMessage() {
  const alertMsg = window.document.createElement("section");
  const body = window.document.querySelector("body");
  body.classList.add("error-msg-visible");
  alertMsg.classList.add("error-alert");
  alertMsg.innerHTML = `<h1>Error!</h1>
  <h2>Could not load the <code>dino.json</code> file.</h2>
  <p>If you are testing this
  page locally, you need to run a local web server.</p>`;
  body.innerHTML = "";
  body.appendChild(alertMsg);
}

window
  .fetch("/dino.json")
  .then((response) => response.json())
  .then((data) => {
    const listDinosDetails = data.Dinos;
    window.listOfConstructedDinos = listDinosDetails.map(
      (dinoDetails) => new Dinosaur(...Object.values(dinoDetails))
    );
  })
  .catch(() => {
    addErrorMessage();
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
  const height = feet * 12 + window.parseInt(inches);
  const weight = window.document.getElementById("weight").value;
  const diet = window.document.getElementById("diet").value;
  return new Human(name, height, weight, diet);
}

function getRandomFactFromListOfFacts(listOfFacts) {
  const randomIndex = window.Math.floor(
    window.Math.random() * listOfFacts.length
  );
  return listOfFacts[randomIndex];
}

function addComparisonsToDinoFacts(human) {
  window.listOfConstructedDinos.forEach((dino) => {
    if (dino.species !== "Pigeon") {
      dino.facts.push(
        dino.getDietComparison(human),
        dino.getWeightComparison(human),
        dino.getHeightComparison(human)
      );
    }
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
  animalTile.setAttribute("class", "grid-item animal-tile");
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
