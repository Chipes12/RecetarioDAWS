"use strcit";

const Receta = require("./recipe");

const recipes = [];

function getRecipes(){
    return recipes;
}

function getRecipeById(rid){
    return recipes.find(recipe => recipe.rid == rid);
}

function createRecipe(recipe){
    let p = undefined;
    if(typeof recipe == "string") {
        p = Receta.createFromJSON(recipe);
    }
    else {
        p = Receta.createFromObject(recipe);
    }
    recipes.push(p);
   // let newRecipes = JSON.stringify(recipe)
    //fs.writeFileSync("./app/Data/products.json" , newProducts);
    return p;
}

let reci = `{
    "name": "Pollo",
    "estimatedTime": "1 hora",
    "ingredients": ["aguacates", "pollo"],
    "category": "platillo",
    "rating" : 5,
    "portions": 2,
    "imageUrl": "aaaaaa"
}`;
createRecipe(reci);
console.log(getRecipes());