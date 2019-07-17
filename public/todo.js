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


/**************************************************************
* Loads the to do list
**************************************************************/
function loadTodoList() {
    $.get('/loadTodoList', function(result) {

    });
}


/**************************************************************
* Check whether or not the user is logged in
**************************************************************/
function checkLoggedIn() {
    $.get('/isLoggedIn', function(result) {
        console.log(result.success);
        let jumbotron = document.getElementById("jumbotron");
        // User logged in
        if (result.success) {
            // Display Log out button
            jumbotron.innerHTML = '<ul class="nav justify-content-center"><li class="nav-item"><a class="nav-link" href="#" onclick="logOut()">Log Out</a></li></ul>';
            loadTodoList();
        }
        else {
            // Display "Log In" and "Sign Up" button
            jumbotron.innerHTML = '<ul class="nav justify-content-center"><li class="nav-item"><a class="nav-link" href="#" onclick="loadLogIn()">Log In</a></li><li class="nav-item"><a class="nav-link" href="#" onclick="loadSignUp()">Sign Up</a></li></ul>';
        }
    })
}

/**************************************************************
* Communicates with the server to log out the user
**************************************************************/
function logOut() {
    console.log("In logout()");
    $.post('/logOut', function(data) {
        console.log("logging out");
        console.log(data);
        if (data.success) {
            window.location.href = "/todo";
        }
    });
}