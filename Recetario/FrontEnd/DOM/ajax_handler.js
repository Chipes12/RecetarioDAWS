"use strict";



const recipeBookRoute = `http://localhost:3000/recipebook/recipes/`;
const userPost = 'http://localhost:3000/recipebook/user';
const logInPost = 'http://localhost:3000/recipebook/user/login';
const getIngr = 'http://localhost:3000/recipebook/ingredients';
const getFavs = `http://localhost:3000/recipebook/user/${JSON.parse(JSON.parse(localStorage.getItem("User"))).idUser}/favourites/`;

console.log(getFavs);
console.log(JSON.parse(JSON.parse(localStorage.getItem("User"))));

//getFavs.replace("USERID", JSON.parse(JSON.parse(localStorage.getItem("User"))).idUser)

const Category = {
    "type1": "Platillo",
    "type2": "Bebida",
    "type3": "Postre",
    "type4": "Aperitivo",
    "type5": "Entrada",
};

const Times = {
    "Time1": "5 - 20 min",
    "Time2": "20 - 60 min",
    "Time3": "60+ min",
};

async function loadRecipes(url) {
    let response = await fetch(url);
    if (response.status != 200) return [];
    return await response.json();
}

async function loadRecipeData(url, rid) {
    let response = await fetch(url + rid);
    if (response.status != 200) return [];
    return await response.json();
}

//Load ingredients
async function loadIngredients(url) {
    let response = await fetch(url);
    if (response.status != 200) return [];
    return await response.json();
}

//Puede que se necesite mandar el id
async function loadFavouriteRecipes(url) {
    let response = await fetch(url, {
        headers: {
            authorization: JSON.parse(JSON.parse(localStorage.getItem("User"))).token
        }
    });
    if (response.status != 200) return [];
    return await response.json();
}

async function deleteFavRecipe(url) {

    let response = await fetch(url, {
        method: "DELETE",
        headers: {
            authorization: JSON.parse(JSON.parse(localStorage.getItem("User"))).token
        }
    })

    return response.status;
}

async function addFavRecipe(url, body) {
    console.log(body);
    let response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(
            body
        ),
        headers: {
            'Content-Type': 'application/json',
            authorization: JSON.parse(JSON.parse(localStorage.getItem("User"))).token
        }
    })
    if (response.status != 200) return [];
    return await response.json();
}

async function checkFav(url) {
    let response = await fetch(url, {
        headers: {
            authorization: JSON.parse(JSON.parse(localStorage.getItem("User"))).token
        }
    })


    return response.status;
}

async function createRec(url) {
    let obj = {
        name: document.getElementById('nameRecipe').value,
        description: document.getElementById('descrRecipe').value,
        portions: document.getElementById('portionsRecipe').value,
        category: document.getElementById('recipeType').value,
        estimatedTime: document.getElementById('recipeTiming').value,
        preparation: document.getElementById('recipeProcedure').value,
        imageUrl: document.getElementById('urlImg').value,
        video: document.getElementById('urlVid').value,
        ingredients: ingrArr
    };
    console.log(obj)
    let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (response.status != 200) return [];
    return await response.json();
}

async function updateRec(url) {
    let obj = {
        name: document.getElementById('nameRecipe').value,
        description: document.getElementById('descrRecipe').value,
        portions: document.getElementById('portionsRecipe').value,
        category: document.getElementById('recipeType').value,
        estimatedTime: document.getElementById('recipeTiming').value,
        preparation: document.getElementById('recipeProcedure').value,
        imageUrl: document.getElementById('urlImg').value,
        video: document.getElementById('urlVid').value,
        ingredients: ingrArr
    };
    console.log(obj)
    let response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    console.log(response.status)
    if (response.status != 200) return [];
    return await response.json();
}

function signUp() {
    let xhr = new XMLHttpRequest();
    let obj = {
        name: document.getElementById('name').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('mail').value,
        password: document.getElementById('password').value,
        registerDate: document.getElementById('regDate').value,
        sex: document.querySelector('input[name="sexo"]:checked').value,
        status: 'User1',
        favouriteRecipes: [],
    };
    xhr.open('POST', userPost);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(obj));
    xhr.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            document.getElementById('close').click();
        }
    }
    return false;
}

function logIn() {
    let xhr = new XMLHttpRequest();
    let obj = {
        email: document.getElementById('logInEmail').value,
        password: document.getElementById('logInPassword').value
    };
    xhr.open('POST', logInPost);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(obj));
    xhr.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            document.getElementById('close').click();
        }
    }
    xhr.onload = () => {
        writeUserStorage(xhr.response);
        window.location.reload();
    }
    return false;
}