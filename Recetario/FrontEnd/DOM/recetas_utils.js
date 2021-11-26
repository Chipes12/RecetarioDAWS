"use strict";

let recipe = JSON.parse(sessionStorage.getItem("Recipe"));
let infoContainer = document.getElementById("infoContainer");
infoContainer.innerHTML = recipeToHTML(recipe);

function recipeToHTML(recipe){
    return `
<span class="container" id= "tituloReceta">
            <h1 id="recipeName" class="mt-5">${recipe._name}</h1>
        </span>
        <img id="recipeImg"
            src="${recipe._imageUrl}"
            alt="recipe-img" class="align-self-center img-fluid m-4" width="800px">
        <form class="form-inline">
            <div class="form-group">
                <h4 id="recipePortion" class="pr-5"><i class="fas fa-users"></i> Porciones: ${recipe._portions}</h4>
                <h4 id="recipeCategory" class="pr-5"><i class="far fa-list-alt"></i> Tipo: </h4>
                <h4 class="pr-5">Dificultad: <i id="recipeDificult" class="far fa-sad-tear"></i></h4>
                <h4 class="pr-5"><i class="far fa-clock"></i> Tiempo: </h4>
                <h4 class="pr-5"><i class="fas fa-star" style="color: rgba(255, 200, 0, 0.82);"></i> Calificación: </h4>
                <h4 id="recipeFav" class="pr-5"><i class="fas fa-heart fa-2x"></i></h4>
            </div>
        </form>
        <span id="recipeCalif" class="form-inline container m-5">
            <div class="form-group">
                <h4 class="mr-5">Calificación:</h4>
                <span><i class="1 fas fa-star fa-2x"></i></span>
                <span><i class="2 fas fa-star fa-2x"></i></span>
                <span><i class="3 fas fa-star fa-2x"></i></span>
                <span><i class="4 fas fa-star fa-2x"></i></span>
                <span><i class="5 fas fa-star fa-2x"></i></span>
                <button type="button" name="" id="btnCalif" class="btn btn-light ml-5">Calificar</button>
            </div>
        </span>
        <span class="container">
            <h3 class="mt-5">Descripción</h3>
            <p id="recipeDescription" class="pt-5">Richard McClintock, a Latin professor at Hampden-Sydney College in
                Virginia, looked up one of the more
                obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
                1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
                This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of
                Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
        </span>
        <span class="container">
            <h3 class="mt-5">Procedimiento</h3>
            <p id="recipeProcedure" class="pt-5">Richard McClintock, a Latin professor at Hampden-Sydney College in
                Virginia, looked up one of the more
                obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
                1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
                This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of
                Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
        </span>
        <div class="embed-responsive embed-responsive-16by9">
            <iframe id="recipeVideo" class="embed-responsive-item" src="https://www.youtube.com/embed/fH7_c_TR-rU"
                allowfullscreen></iframe>
        </div>`
}