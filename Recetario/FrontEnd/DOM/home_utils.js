"use strict";

let recipesContainer = document.getElementById("recipeContainer");

function recipeToHTML(recipe){
    return `
        <div class="card mr-2">
            <img class="card-img-top" src="${recipe._imageUrl}" alt="${recipe._name}" style="	width: 230px;">
            <div class="card-body">
                <h4 class="card-title">${recipe._name}</h4>
                <p class="card-text">${recipe._category}</p>
            </div>
            <a class="btn btn-info mb-3" href="#" data-toggle="modal" data-target="#addToCart">Seguir receta</a>
        </div>
    `
}

function recipesListToHTML(recipesList){
    recipesContainer.innerHTML =`<div class="row mt-5">\n` + recipesList.map(recipeToHTML).join("\n") + `</div>`;
}

var page = 1;
function load(){
        loadRecipes(recipeBookRoute).then(reciepes => {
        recipesListToHTML(reciepes.slice(4 * (page - 1), 4*page));
    });
}

function changePage(event){
    let cell = event.target.parentNode;
    if(cell.tagName == "A") cell =cell.parentNode;
    let pages = document.getElementById("paginationContainer").getElementsByTagName("li");
    if(cell == pages[0]){
        pages[page-1].setAttribute("class", "page-item active");
        page--;
    }
    else if(cell == pages[4]){
        pages[page + 1].setAttribute("class", "page-item active");
        page++;
    }
    else page = parseInt(cell.innerText);

    if(page == 1){
        pages[4].setAttribute("class", "page-item");
        pages[0].setAttribute("class", "page-item disabled");
    }
    if(page == 2){
        pages[0].setAttribute("class", "page-item");
        pages[4].setAttribute("class", "page-item");
    }
    if(page == 3){
        pages[0].setAttribute("class", "page-item");
        pages[4].setAttribute("class", "page-item disabled");
    }
    for(let i = 1; i < 4; i++){
        if(page[i] != pages[page]) pages[i].setAttribute("class", "page-item");
    }
    pages[page].setAttribute("class", "page-item active");
    load();
}

load();
