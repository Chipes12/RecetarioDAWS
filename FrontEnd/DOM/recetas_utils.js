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
                <a href = "../views/admin/editar_receta.html" class = "btn btn-outline-info w-100 " id="editThisRecipe"> <button   type="button" class="btn btn-outline-light">Actualizar</button> </a><br>
                
                <h4 id="recipeFav" class="pr-5 ml-5"><i onclick = "isInFavs()" id= "heart" class="fas fa-heart fa-2x"></i></h4>
            </div>
        </form>
        <span class="container">
            <h3 class="mt-5">Descripción:</h3>
            <p id="recipeDescription" class="pt-5">${recipe.description}</p>
        </span>
        <span class="container">
            <h3 class="mt-5">Ingredientes:</h3>
            <div id = "ingredients">
                ${addIngredients()}
            </div>
        </span>
        <span class="container">
            <h3 class="mt-5">Procedimiento</h3>
            <p id="recipeProcedure" class="pt-5"></p>
        </span>
        <div class="embed-responsive embed-responsive-16by9">
            <iframe id="recipeVideo" class="embed-responsive-item" src="${recipe.video}"
                allowfullscreen></iframe>
        </div>`
}

async function updateHeart() {
    if (JSON.parse(JSON.parse(localStorage.getItem("User"))) == "undefined") return;
    let uid = JSON.parse(JSON.parse(localStorage.getItem("User"))).idUser;
    let urlverify = 'https://recetarioweb.herokuapp.com/user' + "/" + uid;
    let response = fetch(urlverify);
    if (response.status == 200) return;

    let idReceta = recipe._id;
    let url = getFavs + idReceta;
    let chequeo = await checkFav(url);
    if (chequeo == 200) {
        corazon.style.color = "red";
    }
}

async function addFavorites() {
    if (JSON.parse(JSON.parse(localStorage.getItem("User"))) == "undefined") return;
    let uid = JSON.parse(JSON.parse(localStorage.getItem("User"))).idUser;
    let url = 'https://recetarioweb.herokuapp.com/user' + "/" + uid;
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
    let url = 'https://recetarioweb.herokuapp.com/user' + "/" + uid;
    let response = fetch(url);
    if (response.status == 200) return;

    let urlDelete = getFavs + id;
    await deleteFavRecipe(urlDelete);
    corazon.style.color = "white";
}

async function isInFavs() {
    if (JSON.parse(JSON.parse(localStorage.getItem("User"))) == "undefined") return;
    let uid = JSON.parse(JSON.parse(localStorage.getItem("User"))).idUser;
    let urlverify = 'https://recetarioweb.herokuapp.com/user' + "/" + uid;
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

function ingToHTML(ing) {
    return `<li>${ing['name']}&nbsp;&nbsp;&nbsp;&nbsp;Cantidad: ${ing['cantidad']}</li>`;
}

function addIngredients() {
    document.getElementById("ingredients").innerHTML = `<ul>`;
    document.getElementById("ingredients").innerHTML += recipe.ingredients.map(ingToHTML).join("\n");
    document.getElementById("ingredients").innerHTML += `</ul>`;
}

function isAdmin() {
    if (JSON.parse(JSON.parse(localStorage.getItem("User"))).role == "User2") {
        document.getElementById("editThisRecipe").setAttribute("class", "");
    } else document.getElementById("editThisRecipe").setAttribute("class", "d-none");
}

function formatProcedure() {
    let procedimiento = recipe.preparation;
    let contenido = procedimiento.split(".");

    for (let oracion of contenido) {
        document.getElementById("recipeProcedure").innerHTML += `<p> ${oracion}</p>`
    }
}

recipeToHTML(recipe);
verifyUser();
isAdmin();
addIngredients();
formatProcedure();
updateHeart();