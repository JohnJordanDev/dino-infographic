// Create Dino Constructor
const Dinosaur = function (species, weight, height, diet, where, when, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
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

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array
function getDinoInfoTile(dino) {
  const dinoTile = window.document.createElement("li");
  dinoTile.setAttribute("class", "dino-tile");
  dinoTile.innerHTML = `<div class="dino-tile_img-wrapper">
    <img src="${dino.imgUrl}" alt="${dino.species}" class="dino-tile_img"/>
  </div>
  <h4 class="dino-tile_species">${dino.species}</h4>
  <ul class="dino-tile_facts">
    <li>Weight: ${dino.weight}</li>
  </ul>`;
  return dinoTile;
}

// Add tiles to DOM
function getListOfDinosTiles() {
  let listOfTiles = window.document.createElement("ul");
  listOfTiles.setAttribute("id", "dino_tile_list");

  const docFragDinoList = new DocumentFragment();
  docFragDinoList.appendChild(listOfTiles);
  listOfTiles = docFragDinoList.getElementById("dino_tile_list");

  window.listOfConstructedDinos.forEach((dino) => {
    listOfTiles.appendChild(getDinoInfoTile(dino));
  });

  return docFragDinoList;
}

function removeForm() {
  window.document.getElementById("dino-compare").remove();
}

// On button click, prepare and display infographic
window.document.addEventListener("submit", (ev) => {
  ev.preventDefault();
  window.formHuman = getHumanFromFormData();
  removeForm();
  window.document.getElementById("grid").appendChild(getListOfDinosTiles());
});
