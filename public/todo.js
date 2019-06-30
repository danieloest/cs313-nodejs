/***************************************
 * Loads sign up form
 ***************************************/
function loadSignUp() {
    let holder = document.getElementById("loginHolder");
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../signUp.html', true);
    xhr.onreadystatechange= function() {
        if (this.readyState!==4) return;
        if (this.status!==200) return;
        holder.innerHTML= this.responseText;
    };
    xhr.send();
}
/***************************************
 * Loads log in form
 ***************************************/
function loadLogIn() {
    let holder = document.getElementById("loginHolder");
    // holder.innerHTML = "???";
    var xhr= new XMLHttpRequest();
    xhr.open('GET', '../logIn.html', true);
    xhr.onreadystatechange= function() {
        if (this.readyState!==4) return;
        if (this.status!==200) return;
        holder.innerHTML= this.responseText;
    };
    xhr.send();
}

/***************************************
 * Checks if the passwords are valid
 ***************************************/
function signUp() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var passwordConfirm = document.getElementById("confirm-password").value;
    // Confirm passwords are the same
    if (password != passwordConfirm) {
        var error = document.getElementsByClassName("error");
        for (var i = 0; i < error.length; i++) {
            error[i].innerHTML = "*";
        }
        document.getElementById("errorMessage").innerHTML = "Passwords did not match";
        return false;
    }
    // Confirm password has a number and is longer than 7 characters
    else if (/\d/.test(password) == false || password.length < 7) {
        var error = document.getElementsByClassName("error");
        for (var i = 0; i < error.length; i++) {
            error[i].innerHTML = "*";
        }
        document.getElementById("errorMessage").innerHTML = "Password must contain at least 7 charactes and a number";
        return false;
    }
    else {
        return true;
    }
}