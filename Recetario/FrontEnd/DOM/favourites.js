"use strict"

let favContainer = document.getElementById("mainContainerFavs");

//Función para html
function recipeToHTML(recipe) {
    return `
        <div class="card mr-2" id="${recipe._id}">
            <img class="card-img-top" src="${recipe.imageUrl}" alt="${recipe.name}" style="	width: 230px;">
            <div class="card-body">
                <h4 class="card-title">${recipe.name}</h4>
                <p class="card-text">${Category[recipe.category]}</p>
            </div>
            <a class="btn btn-info mb-3" href="#" onclick="viewRecipe(event)">Seguir receta</a>
        </div>
    `
}

function recipesListToHTML(recipesList) {
    favContainer.innerHTML = `<div class="row mt-5">\n` + recipesList.map(recipeToHTML).join("\n") + `</div>`;
}

let page = 1;

function load() {

    loadFavouriteRecipes(getFavs).then(recipes => {
        console.log(recipes)
        recipesListToHTML(recipes.slice(4 * (page - 1), 4 * page));
    });
}

load();