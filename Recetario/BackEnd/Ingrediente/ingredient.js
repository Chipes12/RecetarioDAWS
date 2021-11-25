"use strict";
 
class IngredientException{
    constructor(errorMesage){
        this.errorMessage = errorMesage;
    }
}

class Ingredient {
    constructor(name,  imageUrl){
        this.name = name;
        this.imageUrl = imageUrl;
    }

    //Getters
    get name(){
        return this._name;
    }
    get imageUrl(){
        return this._imageUrl
    }

    //Setters
    set name(value){
        if(value == "" || typeof value != "string") throw new IngredientException("The ingredient's name must be a valid string");
        this._name = value;
    }
    set imageUrl(value){
        if(typeof value != "string" || value == "") throw new IngredientException("The ingredient's imageUrl must be a positive number");
        this._imageUrl = value;
    }

    //Methods
    static createFromJSON(jsonValue){
        let rec = JSON.parse(jsonValue);
        return Ingredient.createFromObject(rec);
    }
    
    static createFromObject(obj){
        let newIngredient = {};
        Object.assign(newIngredient, obj);
        Ingredient.cleanObject(newIngredient);
        let ingredient = new Ingredient(newIngredient._name, newIngredient._imageUrl);
        return ingredient;
     }
    
    static cleanObject(obj){
        const recipeProperties = ['_name',  '_imageUrl'];
        for (let prop in obj){
            let flag = 0;
            for(let property in recipeProperties){
                if(prop == recipeProperties[property])flag = 1;
            }
            if(!flag) delete obj[prop];
        }
    }
}
module.exports = Ingredient;