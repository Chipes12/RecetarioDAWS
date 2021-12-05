"use strict";

function verifyUser() {
    if(JSON.parse(localStorage.getItem("User")) == "Wrong email or password"){
        document.getElementById("signupInBar").setAttribute("class", "");
        document.getElementById("loginInBar").setAttribute("class", "");
        document.getElementById("adminBar").setAttribute("class", "d-none");
        document.getElementById("myAccount").setAttribute("class", "d-none");
    }
    else if (JSON.parse(JSON.parse(localStorage.getItem("User"))) == "undefined") {
        document.getElementById("signupInBar").setAttribute("class", "");
        document.getElementById("loginInBar").setAttribute("class", "");
        document.getElementById("adminBar").setAttribute("class", "d-none");
        document.getElementById("myAccount").setAttribute("class", "d-none");
    } else {
        let uid = JSON.parse(JSON.parse(localStorage.getItem("User"))).idUser;
        let url = 'http://recetarioweb.herokuapp.com/user' + "/" + uid;
        let response = fetch(url, {headers : {autorizathion: JSON.parse(JSON.parse(localStorage.getItem("User"))).token}});
        if (response.status != 200) {
            document.getElementById("signupInBar").setAttribute("class", "d-none");
            document.getElementById("loginInBar").setAttribute("class", "d-none");
            document.getElementById("myAccount").setAttribute("class", "");
            if(JSON.parse(JSON.parse(localStorage.getItem("User"))).role == "User2"){
                document.getElementById("adminBar").setAttribute("class", "");
            } else document.getElementById("adminBar").setAttribute("class", "d-none");
        } else {
            document.getElementById("signupInBar").setAttribute("class", "");
            document.getElementById("loginInBar").setAttribute("class", "");
            document.getElementById("adminBar").setAttribute("class", "d-none");
            document.getElementById("myAccount").setAttribute("class", "d-none");
        }
    }
}

verifyUser();