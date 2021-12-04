"use strict";

let recipe = JSON.parse(sessionStorage.getItem("Recipe"))[0];
let infoContainer = document.getElementById("infoContainer");
infoContainer.innerHTML = recipeToHTML(recipe);
let corazon = document.getElementById("heart");

function recipeToHTML(recipe) {
    return `
<span class="container" id= "tituloReceta">
            <h1 id="recipeName" class="mt-5">${recipe.name}</h1>
        </span>
        <div class="d-flex justify-content-center">
        <img id="recipeImg"
            src="${recipe.imageUrl}"
            alt="recipe-img" class="imgRounded" width="600px">
        </div>
        <form class="form-inline">
            <div class="form-group">
                <h4 id="recipePortion" class="pr-5"><i class="fas fa-users"></i> Porciones: ${recipe.portions}</h4>
                <h4 id="recipeCategory" class="pr-5"><i class="far fa-list-alt"></i> Tipo: ${Category[recipe.category]}</h4>
                <h4 class="pr-5"><i class="far fa-clock"></i> Tiempo: ${Times[recipe.estimatedTime]}</h4>
                <a href = "../views/admin/editar_receta.html" class = "btn btn-outline-info w-100"> Actualizar </a> </div> <br>
                <h4 id="recipeFav" class="pr-5"><i onclick = "isInFavs()" id= "heart" class="fas fa-heart fa-2x"></i></h4>
            </div>
        </form>
        <span class="container">
            <h3 class="mt-5">Descripción:</h3>
            <p id="recipeDescription" class="pt-5">${recipe.description}</p>
        </span>
        <span class="container">
            <h3 class="mt-5">Ingredientes:</h3>
            <div id = "ingredients">
            </div>
        </span>
        <span class="container">
            <h3 class="mt-5">Procedimiento</h3>
            <p id="recipeProcedure" class="pt-5">${recipe.preparation}</p>
        </span>
        <div class="embed-responsive embed-responsive-16by9">
            <iframe id="recipeVideo" class="embed-responsive-item" src="${recipe.video}"
                allowfullscreen></iframe>
        </div>`
}

/*
function updateStars(event) {
    let starsContainer = infoContainer.getElementsByTagName("span");
    let clickedStar = event.target.parentNode;
    let found = false;
    let starsArray = [starsContainer[2], starsContainer[3], starsContainer[4], starsContainer[5], starsContainer[6]];
    for (let i = 0; i < 5; i++) {
        if (!found) starsArray[i].setAttribute("style", "color: rgba(255, 200, 0, 0.82);");
        else starsArray[i].setAttribute("style", "color: rgba(38, 37, 44, 1);");
        if (starsArray[i] == clickedStar) found = true;
    }
}*/

async function updateHeart() {
    if (JSON.parse(JSON.parse(localStorage.getItem("User"))) == "undefined") return;
    let uid = JSON.parse(JSON.parse(localStorage.getItem("User"))).idUser;
    let urlverify = 'http://localhost:3000/recipebook/user/login' + "/" + uid;
    let response = fetch(urlverify);
    if (response.status == 200) return;

    let idReceta = recipe._id;
    let url = getFavs + idReceta;
    let chequeo = await checkFav(url);
    console.log(chequeo);
    if (chequeo == 200) {
        corazon.style.color = "red";
    }
}

async function addFavorites() {
    if (JSON.parse(JSON.parse(localStorage.getItem("User"))) == "undefined") return;
    let uid = JSON.parse(JSON.parse(localStorage.getItem("User"))).idUser;
    let url = 'http://localhost:3000/recipebook/user/login' + "/" + uid;
    let response = fetch(url);
    if (response.status == 200) return;

    let id = []
    id.push({
        rid: recipe._id
    });
    addFavRecipe(getFavs, id);
    corazon.style.color = "red";
}

async function deleteRecipe(id) {
    if (JSON.parse(JSON.parse(localStorage.getItem("User"))) == "undefined") return;
    let uid = JSON.parse(JSON.parse(localStorage.getItem("User"))).idUser;
    let url = 'http://localhost:3000/recipebook/user/login' + "/" + uid;
    let response = fetch(url);
    if (response.status == 200) return;

    let urlDelete = getFavs + id;
    await deleteFavRecipe(urlDelete);
    corazon.style.color = "white";
}

async function isInFavs() {
    if (JSON.parse(JSON.parse(localStorage.getItem("User"))) == "undefined") return;
    let uid = JSON.parse(JSON.parse(localStorage.getItem("User"))).idUser;
    let urlverify = 'http://localhost:3000/recipebook/user/login' + "/" + uid;
    let response = fetch(urlverify);
    if (response.status == 200) return;

    let idReceta = recipe._id;
    let url = getFavs + idReceta;
    let chequeo = await checkFav(url);
    if (chequeo == 200) {
        deleteRecipe(idReceta);
    } else {
        addFavorites();
    }
}

function ingToHTML(ing){
    return  `<li>${ing['name']} &nbsp;&nbsp;&nbsp;&nbsp; Cantidad: ${ing['cantidad']}</li>`;
}
function addIngredients(){
    document.getElementById("ingredients").innerHTML = `<ul>`;
    document.getElementById("ingredients").innerHTML += recipe.ingredients.map(ingToHTML).join("\n");
    document.getElementById("ingredients").innerHTML += `</ul>`;
}

addIngredients();
updateHeart();