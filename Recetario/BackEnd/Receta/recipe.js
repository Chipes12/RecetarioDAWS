"use strict";

function generateUUID() {
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
	PLATILLO: "Platillo",
	BEBIDA: "Bebida",
	POSTRE: "Postre",
	ACOMPAÑAMIENTO: "Acompañamiento",
};

class Recipe{
    constructor(name, estimatedTime, ingredients, category, rating, portions, imageUrl){
        this._rid = generateUUID();
        this.name = name;
        this.estimatedTime=  estimatedTime;
        this.ingredients = ingredients;
        this.category = category;
        this.rating = rating;
        this.portions =  portions
        this.imageUrl = imageUrl;
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
        return this._estimatedTime;
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
    //Setters
    set rid(value){
        throw new RecipeException("You can't add the recipe id");
    }
    set name(value){
        if(value == "" || typeof value != "string") throw new RecipeException("The recipe's name must be a valid string");
        this._name = value;
    }
    set estimatedTime(value){
        if(value == "" || typeof value != "string") throw new RecipeException("The recipe's estimated time must be a valid string");
        this._estimatedTime = value;
    }
    set ingredients(value){
        if(!Array.isArray(value)) throw new RecipeException("The recipe's ingredients mut be an ingredient array");
        this._ingredients;
    }
    set category(value){
        if(value == "" || typeof value != "string") throw new RecipeException("The recipe's category must be a valid string");
        if(Object.values(Category).indexOf(value) < 0) throw new RecipeException("the recipe's category muy be in one of the 4 valid options");
        this._catogory = value;
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
        let recipe = new Recipe(newRecipe._name, newRecipe._estimatedTime, newRecipe._ingredients, newRecipe._category, newRecipe._rating, newRecipe._portions, newRecipe._imageUrl);
        if(newProduct._rid != undefined) product._rid = newProduct._rid;
        return product;
    }

    static cleanObject(obj){
        const productProperties = ['_rid', '_name', '_estimatedTime', '_imageUrl', '_ingredients', '_category', '_rating', '_portions'];
        for (let prop in obj){
            let flag = 0;
            for(let property in productProperties){
                if(prop == productProperties[property])flag = 1;
            }
            if(!flag) delete obj[prop];
        }
    }
}
module.exports = Recipe;