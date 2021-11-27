"use strict"

//Agregar require para la handler de recetas
const Receta = require("../Receta/recipeHandler");

//Función para generar id´s
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
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

class RecipeProxy {
    constructor(rid) {
        this.rid = rid;
    }
}

const userTypes = {
    "User1": "Comun",
    "User2": "Admin"
};

//Falta ver lo del admin
class User {
    //Class constructor
    constructor(name, lastName, email, password, date, sex, status) {
        this._uid = generateUUID();
        this.name = name
        this.lastName = lastName
        this.email = email
        this.password = password
        this.registerDate = date
        this.sex = sex
        this.status = status;
        this._favouriteRecipes = [];
    }

    //Getter & Setters
    get favouriteRecipes() {
        return this._favouriteRecipes;
    }

    set favouriteRecipes(value) {
        throw new UserException("Unable to modify recipes directly, use corresponding method instead.");
    }

    get uid() {
        return this._uid;
    }

    set uid(value) {
        throw new UserException("User uuuid is auto-generated.");
    }

    get name() {
        return this._name;
    }

    set name(value) {
        if (typeof value !== "string" || value === "") {
            throw new UserException("User name cannot be empty");
        }
        this._name = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        if (typeof value !== "string" || value === "") {
            throw new UserException("User lastname cannot be empty");
        }
        this._lastName = value;
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

    get sex() {
        return this._sex;
    }

    set sex(value) {
        if (typeof value !== "string" || value === "") {
            throw new UserException("User sex cannot be empty")
        }
        this._sex = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        if (typeof value == "number" && (value < 1 || value > 2)) throw new UserException("the user's status must be a number between 1 and 2");
        else if (typeof value == "number") {
            let type = "User" + value;
            this._status = userTypes[type];
        } else {
            if (Object.values(userTypes).indexOf(value) == -1) throw new UserException("the users's status must be one of the valid strings");
            else this._status = value;
        }
    }

    //Methods for creation
    static createFromJSON(jsonValue) {
        let rec = JSON.parse(jsonValue);
        return User.createFromObject(rec);
    }

    static createFromObject(obj) {
        let newUser = {};

        Object.assign(newUser, obj);

        User.cleanObject(newUser);

        let user = new User(newUser._name, newUser._lastName, newUser._email, newUser._password, newUser._registerDate, newUser._sex, newUser._status);

        if (newUser._uid != undefined) user._uid = newUser._uid;
        return user;
    }

    static cleanObject(obj) {
        const userProps = ['_uid', '_name', '_lastName', '_email', '_password', '_registerDate', '_sex', '_status'];
        for (let prop in obj) {
            let flag = 0;
            for (let property in userProps) {
                if (prop == userProps[property]) flag = 1;
                if (prop == "_status") {
                    if (typeof obj[prop] == "number" && (obj[prop] > 2 || obj[prop] < 1)) flag = 0;
                    else if (Object.values(userTypes).indexOf(obj[prop]) == -1 && typeof obj[prop] == "string") flag = 0;
                }
            }
            if (!flag) delete obj[prop];
        }
    }

    //Methods for favourite recipes
    //Falta ver si lo hacemos como los proxies
    addItem(recipeId) {

        //find existing item and  create new 
        if (!this._favouriteRecipes.find(element => element.rid == recipeId) && Receta.getRecipeById(recipeId) != undefined) {
            this._favouriteRecipes.push(new RecipeProxy(recipeId));

        } else {
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
exports.User = User;
exports.userTypes = userTypes;