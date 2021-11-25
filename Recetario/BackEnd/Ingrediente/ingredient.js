"use strict";

function generateIID() {
    return 'xxxx-4xxx-yxxx'.replace(/[xy]/g, c => {
    let r = Math.random() * 16 | 0;
    let v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
    });
}   

class IngredientException{
    constructor(errorMesage){
        this.errorMessage = errorMesage;
    }
}

class Ingredient {
    constructor(name,  imageUrl){
        this._iid = generateIID();
        this.name = name;
        this.imageUrl = imageUrl;
    }

    //Getters
    get iid(){
        return this._iid;
    }
    get name(){
        return this._name;
    }
    get imageUrl(){
        return this._imageUrl
    }

    //Setters
    set iid(value){
        throw new IngredientException("You can't add the ingredient id");
    }
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
        if(newIngredient._iid != undefined) ingredient._iid = newIngredient._iid;
        return ingredient;
     }
    
    static cleanObject(obj){
        const recipeProperties = ['_iid', '_name',  '_imageUrl'];
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