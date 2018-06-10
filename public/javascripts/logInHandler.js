var userLogInArea = document.getElementById("user-log-in-area");

var drawLogIn = function() {
    clearTimeout(displayTimer);
    clearInterval(loadingInterval);
    userLogInArea.innerHTML = `
    <label for="username">Username:</label><br/>
    <input type="text" id="username"/><br/>
    <label for="password">Password:</label><br/>
    <input type="password" id="password"/><br/>
    <span id="notification">Log-in error</span><br/>
    <button>Register</button>
    <button id="sign-in-button" onclick="window.socketFuncs.tryToSignIn();">Sign In</button>`;
};

var drawLogOut = function() {
    clearTimeout(displayTimer);
    clearInterval(loadingInterval);
    userLogInArea.innerHTML = `
    Username: ` + window.credentials.username + `<br/>
    <span id="notification">Log-in error</span><br/>
    <button id="sign-out-button" onclick="window.socketFuncs.tryToSignOut();">Sign Out</button><br/>`;
    startGame();
};

var displayTimer;
var notificationSpan;
var hideNotification = function() {
    clearTimeout(displayTimer);
    clearInterval(loadingInterval);
    notificationSpan.style.visibility = "hidden";
};

var displayError = function(result) {
    clearTimeout(displayTimer);
    notificationSpan = document.getElementById("notification");
    notificationSpan.innerHTML = result.error;
    notificationSpan.style.color = "red";
    notificationSpan.style.visibility = "visible";
    displayTimer = setTimeout(hideNotification, 3000);
};

var loadingDot = 0;
var loadingInterval;
var loadingStatus = function() {
    var note = notificationSpan.innerHTML.replace(/(\.|(\<b\>\.\<\/b\>)){3}$/,"");
    switch(loadingDot++) {
        case 0:
            note += "<b>.</b>..";
            break;
        case 1:
            note += ".<b>.</b>.";
            break;
        case 2:
            note += "..<b>.</b>";
    }
    if (loadingDot > 2)
        loadingDot = 0;
};

var doDisplayLoading = function() {
    notificationSpan.style.color = "black";
    notificationSpan.style.visibility = "visible";
    loadingInterval = setInterval(loadingStatus, 500);
};

var displayLoading = function(note) {
    notificationSpan = document.getElementById("notification");
    notificationSpan.innerHTML = note + "...";
    displayTimer = setTimeout(doDisplayLoading, 750);
};
