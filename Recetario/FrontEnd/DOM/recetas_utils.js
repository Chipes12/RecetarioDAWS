"use strict";

let recipe = JSON.parse(sessionStorage.getItem("Recipe"));
let infoContainer = document.getElementById("infoContainer");
infoContainer.innerHTML = recipeToHTML(recipe);

function recipeToHTML(recipe){
    return `
<span class="container" id= "tituloReceta">
            <h1 id="recipeName" class="mt-5">${recipe._name}</h1>
        </span>
        <div class="d-flex justify-content-center">
        <img id="recipeImg"
            src="${recipe.imageUrl}"
            alt="recipe-img" class="imgRounded" width="600px">
        </div>
        <form class="form-inline">
            <div class="form-group">
                <h4 id="recipePortion" class="pr-5"><i class="fas fa-users"></i> Porciones: ${recipe.portions}</h4>
                <h4 id="recipeCategory" class="pr-5"><i class="far fa-list-alt"></i> Tipo: ${recipe.category}</h4>
                <h4 class="pr-5"><i class="far fa-clock"></i> Tiempo: ${recipe.estimatedTime}</h4>
                <h4 class="pr-5"><i class="fas fa-star" style="color: rgba(255, 200, 0, 0.82);"></i> Calificación: ${recipe.rating}</h4>
                <h4 id="recipeFav" class="pr-5"><i class="fas fa-heart fa-2x"></i></h4>
            </div>
        </form>
        <span id="recipeCalif" class="form-inline container m-5">
            <div class="form-group">
                <h4 class="mr-5">Calificación:</h4>
                <span><i class="1 fas fa-star fa-2x" onclick="updateStars(event)"></i></span>
                <span><i class="2 fas fa-star fa-2x" onclick="updateStars(event)"></i></span>
                <span><i class="3 fas fa-star fa-2x" onclick="updateStars(event)"></i></span>
                <span><i class="4 fas fa-star fa-2x" onclick="updateStars(event)"></i></span>
                <span><i class="5 fas fa-star fa-2x" onclick="updateStars(event)"></i></span>
                <button type="button" name="" id="btnCalif" class="btn btn-light ml-5">Calificar</button>
            </div>
        </span>
        <span class="container">
            <h3 class="mt-5">Descripción:</h3>
            <p id="recipeDescription" class="pt-5">${recipe.description}</p>
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

function updateStars(event){
    let starsContainer = infoContainer.getElementsByTagName("span");
    let clickedStar = event.target.parentNode;  
    let found = false;
    let  starsArray = [starsContainer[2], starsContainer[3], starsContainer[4], starsContainer[5], starsContainer[6]];
    for(let i = 0; i < 5; i++){
        if(!found) starsArray[i].setAttribute("style", "color: rgba(255, 200, 0, 0.82);");
        else  starsArray[i].setAttribute("style", "color: rgba(38, 37, 44, 1);");
        if(starsArray[i] == clickedStar) found = true;
    }
}