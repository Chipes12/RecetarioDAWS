"use strict";

function generateRID() {
    return 'xxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, c => {
    let r = Math.random() * 16 | 0;
    let v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
    });
}   

class RecipeException{
    constructor(errorMesage){
        this.errorMessage = errorMesage;
    }
}
const Category = {
	"type1": "Platillo",
	"type2": "Bebida",
	"type3": "Postre",
	"type4": "Aperitivo",
    "type5": "Entrada",
};

const Times = {
    "Time1" : "5 - 20 min",
    "Time2": "20 - 60 min",
    "Time3": "60+ min",
};

class Recipe{
    constructor(name, estimatedTime, ingredients, category, rating, portions, imageUrl, preparation){
        this._rid = generateRID();
        this.name = name;
        this.estimatedTime=  estimatedTime;
        this.ingredients = ingredients;
        this.category = category;
        this.rating = rating;
        this.portions =  portions
        this.imageUrl = imageUrl;
        this.preparation = preparation;
    }
    //Getters
    get rid(){
        return this._rid;
    }
    get name(){
        return this._name;
    }
    get estimatedTime(){
        return this._estimatedTime;
    }
    get ingredients(){
        return this._ingredients;
    }
    get category(){
        return this._category;
    }
    get rating(){
        return this._rating;
    }
    get portions(){
        return this._portions;
    }
    get imageUrl(){
        return this._imageUrl;
    }
    get preparation(){
        return this._preparation;
    }
    //Setters
    set rid(value){
        throw new RecipeException("You can't add the recipe id");
    }
    set name(value){
        if(value == "" || typeof value != "string") throw new RecipeException("The recipe's name must be a valid string");
        this._name = value;
    }
    set estimatedTime(value){
        if((typeof value == "number" && (value > 3 || value < 1)) || (Object.values(Times).indexOf(value) == -1 && typeof value =="string")) throw new RecipeException("The recipe's estimated time must be a number between 1 y 3");
        let time = "Time" + value;
        this._estimatedTime = Times[time];
    }
    set ingredients(value){
        if(!Array.isArray(value)) throw new RecipeException("The recipe's ingredients mut be an ingredient array");
        this._ingredients = value;
    }
    set category(value){
        if((typeof calue == "number" && (value < 1 || value > 5)) ||(Object.values(Category).indexOf(value) == -1 && typeof value == "string")) throw new RecipeException("the recipe's category must be a number between 1 and 5");
        let type = "type" + value;
        this._category = Category[type];
    }
    set rating(value){
        if(typeof value != "number" || value < 0 || value > 5) throw new RecipeException("The recipe's rating must be a number between 0 and 5");
        this._rating = value;
    }
    set portions(value){
        if(typeof value != "number" || value < 0) throw new RecipeException("The recipe's portions must be a positive number");
        this._portions = value;
    }
    set imageUrl(value){
        if(typeof value != "string" || value == "") throw new RecipeException("The recipe's portions must be a positive number");
        this._imageUrl = value;
    }
    set preparation(value){
        if(typeof value != "string" || value ==="") throw new RecipeException("The recipe's preparation indications but be a string");
        this._preparation = value;
    }

    //Methods
    static createFromJSON(jsonValue){
        let rec = JSON.parse(jsonValue);
        return Recipe.createFromObject(rec);
    }

    static createFromObject(obj){
        let newRecipe = {};
        Object.assign(newRecipe, obj);
        Recipe.cleanObject(newRecipe);
        let recipe = new Recipe(newRecipe._name, newRecipe._estimatedTime, newRecipe._ingredients, newRecipe._category, newRecipe._rating, newRecipe._portions, newRecipe._imageUrl, newRecipe._preparation);
        if(newRecipe._rid != undefined) recipe._rid = newRecipe._rid;
        return recipe;
    }

    static cleanObject(obj){
        const recipeProperties = ['_rid', '_name', '_estimatedTime', '_imageUrl', '_ingredients', '_category', '_rating', '_portions', '_preparation'];
        for (let prop in obj){
            let flag = 0;
            for(let property in recipeProperties){
                if(prop == recipeProperties[property])flag = 1;
                if(prop = "_estimatedTime"){
                    if(obj[prop] < 1 || obj[prop] > 3) flag = 0;
                }
                else if(prop = "_category"){
                    if(obj[prop] < 1 || obj[prop] > 5) flag = 0;
                }
            }
            if(!flag) delete obj[prop];
        }
    }
}
exports.Recipe = Recipe;
exports.Times = Times;
exports.Category = Category;