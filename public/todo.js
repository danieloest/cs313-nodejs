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
    console.log("In signup");
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
        console.log("Before post request");
        $.post('/addUser', {username: username, password: password},function() {
            location.reload();
            return true;
        })
    }
}


function removeTask(id) {
    $.post('/removeTask', {taskId: id},function() {
        location.reload();
    })
}


function displayAddBar(taskList) {
    console.log("Addingg the add bar");
    taskList.innerHTML += "<div class=\"input-group\"><input type=\"text\" class=\"form-control\" id=\"addTask\" aria-describedby=\"helpId\" placeholder=\"Add a task\"><button onclick=\"addItem()\" class=\"btn btn-info\"><b>+</b> Add </button></div>"

}

function addX(taskIds) {
    console.log("Adding the x thing");
    var taskList = document.getElementsByClassName("task");
    for (let  i = 0; i < taskList.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        $(span).click(function(event) {
            let id = jQuery(this).attr("id");
            removeTask(id);
        })
        span.id = taskIds[i];
        span.appendChild(txt);
        taskList[i].appendChild(span);
}
}

/**************************************************************
* Loads the to do list
**************************************************************/
function loadTodoList() {
    $.get('/loadTodoList', function(results) {
        // console.log(results);
        let tasks = JSON.parse(results);
        console.log(tasks);
        let taskIds = [];
        let taskHolder = document.getElementById("taskHolder");
        let taskList = document.createElement("ul");
        taskList.id = "tasks";
        taskList.className = "list-group";
        taskHolder.appendChild(taskList);
        tasks.forEach(task => {
            // Add the checkbox
            // taskList.inerrHTML += `<input type="checkbox" id="${task.itemid}">`;
            // Add the task
            let isCompleted = task.iscompleted;
            console.log("Is checked: " + isCompleted);
            if (isCompleted) {
                taskList.innerHTML += `<li class=\"task list-group-item\" id=\"${task.itemid}\"><input type="checkbox" checked class="abc-checkbox-primar" id="check-${task.itemid}" onchange="markComplete(${task.itemid}, 'check-${task.itemid}')">${task.task}</li>`;
            }
            else {
                taskList.innerHTML += `<li class=\"task list-group-item\" id=\"${task.itemid}\"><input type="checkbox" class="abc-checkbox-primar" id="check-${task.itemid}" onchange="markComplete(${task.itemid}, 'check-${task.itemid}')">${task.task}</li>`;
            }
            // Add the ID to an array
            taskIds.push(task.itemid);
        });
        // Add the option to add items
        displayAddBar(taskList);
        // Add the remove button
        addX(taskIds);
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

function addItem() {
    let task = document.getElementById("addTask").value;
    $.post('/addTask', {task: task},function() {
        location.reload();
    })
}

function markComplete(taskID, checkID) {
    console.log("taskID: " + taskID);
    console.log("checkID: " + checkID);
    let task = document.getElementById(checkID);
    let isChecked = task.checked;
    console.log("Task checked: " + isChecked);
    $.post('/markCompletion', {taskID: taskID, isChecked: isChecked},function() {
        location.reload();
    })
}