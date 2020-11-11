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

// Use IIFE to get human data from form

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic
