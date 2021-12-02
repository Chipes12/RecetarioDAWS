"use strict"

let favContainer = document.getElementById("mainContainerFavs");

//Función para html
function recipeToHTML(recipe) {
    return `
    <div class="media mt-5 mb-5 p-3 border" id=${recipe._id}">
    <div class="media-left align-self-center">
        <img class="align-self-center" width="230px"
            src="${recipe.imageUrl}" alt="">
    </div>
    <div class="media-body">
        <div class="container mb-2">
            <h4>${recipe.name}</h4>
            <button id="deleteFav" onclick="deleteRecipe('${recipe._id}')" type="button" class="btn btn-danger"><i
                    class="fa fa-trash"></i></button>
            <span id="recipeUuid" class="d-none"></span>
        </div>
        <div class="container mt-4">
            <div class="container">
                <h6>Descripción:</h6>
                <p>${recipe.description}</p>
            </div>
            <div class="container">
                <h6 class="h6"><i class="fas fa-users"></i> Porciones: ${recipe.portions}</h6>
                <h6><i class="far fa-list-alt"></i> Tipo: ${Category[recipe.category]}</h6>
                <h6><i class="far fa-clock"></i> Tiempo: ${Times[recipe.estimatedTime]}</h6>
            </div>
        </div>
    </div>
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

async function deleteRecipe(id) {

    console.log(id)
    let urlDelete = getFavs + id;

    console.log(urlDelete);
    let recetaBorrada = await deleteFavRecipe(urlDelete);
    console.log(recetaBorrada);
    load();

}

load();