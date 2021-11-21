"use strict"

//Agregar requiere para la handler de recetas

//Función para generar id´s
function generateUUID() {
    return 'xxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16 | 0;
        let v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

class UserException {
    constructor(errorMesage) {
        this.errorMessage = errorMesage;
    }
}

//Falta ver lo del admin
class User {
    //Class constructor
    constructor(name, lastName, email, password, date, telephone) {
        this.uid = User.generateUUID();
        this.name = name
        this.lastName = lastName
        this.email = email
        this.password = password
        this.registerDate = date
        this.telephone = telephone
        this.favouriteRecipes = [];
    }

    //Getter & Setters
    get favouriteRecipes() {
        return this._favouriteRecipes;
    }

    set favouriteRecipes(value) {
        throw new UserException("Unable to modify recipes directly, use corresponding method instead.");
    }

    get uuid() {
        return this._uid;
    }

    set uuid(value) {
        throw new UserException("User uuuid is auto-generated.");
    }

    get name() {
        return this._name;
    }

    set name(value) {
        if (typeof value !== "string" || value === "") {
            throw new UserException("User name cannot be empty")
        }
        this._name = value;
    }

    get lastName() {
        return this._lastname;
    }

    set lastName(value) {
        if (typeof value !== "string" || value === "") {
            throw new UserException("User lastname cannot be empty")
        }
        this._lastname = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        if (typeof value !== "string" || value === "") {
            throw new UserException("User email cannot be empty")
        }
        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        if (typeof value !== "string" || value === "") {
            throw new UserException("User password cannot be empty")
        }
        this._password = value;
    }

    get registerDate() {
        return this._registerDate;
    }

    set registerDate(value) {
        if (typeof value !== "string" || value === "") {
            throw new UserException("User date cannot be empty")
        }
        this._registerDate = value;
    }

    get telephone() {
        return this._telephone;
    }

    set telephone(value) {
        if (typeof value !== "string" || value === "") {
            throw new UserException("User telephone cannot be empty")
        }
        this._telephone = value;
    }

    //Methods for creation
    static createFromJSON(jsonValue) {
        let rec = JSON.parse(jsonValue);
        return Recipe.createFromObject(rec);
    }

    static createFromObject(obj) {
        let newUser = {};

        Object.assign(newUser, obj);

        User.cleanObject(newUser);

        let user = new User(newUser._name, newUser._lastname, newUser._email, newUser._password, newUser._registerDate, newUser._telephone);

        if (newUser._uid != undefined) user._uid = newUser._uid;
        return user;
    }

    static cleanObject(obj) {
        const userProps = ['_uid', '_name', '_lastname', '_email', '_password', '_registerDate', '_telephone'];
        for (let prop in obj) {
            let flag = 0;
            for (let property in userProps) {
                if (prop == userProps[property]) flag = 1;
            }
            if (!flag) delete obj[prop];
        }
    }

    //Methods for favourite recipes
    addItem(recipeId, name, estimatedTime, ingredients, category, rating, portions, imageUrl) {

        //find existing item and update or create new 
        if (!this._favouriteRecipes.find(element => element.rid == recipeId) && getRecipeById(productUuid) != undefined) {
            this._favouriteRecipes.push(new Recipe(name, estimatedTime, ingredients, category, rating, portions, imageUrl));

        } else if (getRecipeById(recipeId) != undefined) {
            throw new UserException("Recipe already exist in favourites")
        }
    }


    removeItem(recipeId) {
        //find and elimitae item
        let index = this._favouriteRecipes.findIndex(p => p.rid === recipeId);
        if (index < 0) throw new UserException("Id no valido.");
        this._favouriteRecipes.splice(index, 1);
    }



}
module.exports = User;