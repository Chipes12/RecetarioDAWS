"use strict";

let recipesContainer = document.getElementById("recipeContainer");

function recipeToHTML(recipe){
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

function recipesListToHTML(recipesList){
    recipesContainer.innerHTML =`<div class="row mt-5">\n` + recipesList.map(recipeToHTML).join("\n") + `</div>`;
}

var page = 1;
function load(){
        loadRecipes(recipeBookRoute).then(recipes => {
        recipesListToHTML(recipes.slice(4 * (page - 1), 4*page));
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

function viewRecipe(event){
    let recipeButton = event.target.parentNode;
     let recipe = loadRecipeData(recipeBookRoute, recipeButton.getAttribute("id"));
     recipe.then(element => {
        writeRecipeStorage(element);
        window.location.href = 'recetas.html';
     }); 
}

function searchRecipe(){
    let recipeToSearch = document.getElementById("inputSearch").value;
    if(recipeToSearch == "") load();
    else{
        let array = [];
        loadRecipes(recipeBookRoute).then(recipes => {
            recipes.forEach(r =>{
                console.log(r.name);
                if(r.name.trim() == recipeToSearch.trim()) array.push(r);
            });
            recipesListToHTML(array);
        });
    }
}
load();