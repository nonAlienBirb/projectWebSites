var screenheight = window.innerHeight;
var screenwidth = window.innerWidth;

var divScreen = document.getElementById("screen");

var divP1 = document.getElementsByClassName("p1")[0];
var p1Height = divP1.offsetHeight;
var p1Width = divP1.offsetWidth;

var divP2 = document.getElementsByClassName("p2")[0];
var p2Height = divP2.offsetHeight;
var p2Width = divP2.offsetWidth;;

var step = 10;
var gameIsRunning = false;

var divB = document.getElementsByClassName('b')[0];
var bHeight = divB.offsetHeight;
var bWidth = divB.offsetWidth;

var ballXspeed = 0;
var ballYspeed = 0;


function rand(min , max){
    return ~~(Math.random()*(max-min +1)) + min;
}

function map(x, min1, max1, min2, max2){
    return ((x-min1)*(max2-min2)/(max1-min1))+min2;
}

function reposPlayers(W,H) {

    var divScreenWidth = divScreen.offsetWidth;
    var divScreenHeight = divScreen.offsetHeight;

    if (gameIsRunning){

        divP1.style.top = map(parseInt(divP1.style.top), 0, screenheight, 0, divScreenHeight) + "px";
        divP1.style.left = 30 + "px";
    
        divP2.style.top = map(parseInt(divP2.style.top), 0, screenheight, 0, divScreenHeight) + "px";
        divP2.style.left = divScreenWidth - p2Width - 30 + "px";
    
        divB.style.top = map(parseInt(divB.style.top), 0, screenheight, 0, divScreenHeight) + "px";
        divB.style.left = map(parseInt(divB.style.left), 0, screenwidth, 0, divScreenWidth) + "px";
    } 
    else{
    

    divP1.style.top = (divScreenHeight - p1Height) / 2 + "px";
    divP1.style.left = 30 + "px";

    divP2.style.top = (divScreenHeight - p2Height) / 2 + "px";
    divP2.style.left = divScreenWidth - p2Width - 30 + "px";

    divB.style.top = (divScreenHeight - bHeight) / 2 + "px";
    divB.style.left = (divScreenWidth - bWidth) / 2 + "px";
    }
};


var p1MovingUp = false;
var p1MovingDown = false;
var p2MovingUp = false;
var p2MovingDown = false;

function movePlayer() {
    document.addEventListener('keydown', function (event) {
        //-------------------------------
        // switch (event.code) {
        //     case 'ArrowUp':
        //         p2MovingUp = true;
        //         break;
        //     case 'ArrowDown':
        //         p2MovingDown = true;
        //         break;
        //     case 'KeyW':
        //         p1MovingUp = true;
        //         break;
        //     case 'KeyS':
        //         p1MovingDown = true;
        //         break;
        // }
        //-------------------------------
        // Bardia:
        switch (event.code) {
            case 'ArrowUp':
                p2MovingUp = true;
                break;
            case 'ArrowDown':
                p2MovingDown = true;
                break;
        }
        switch (event.code) {
            case 'KeyW':
                p1MovingUp = true;
                break;
            case 'KeyS':
                p1MovingDown = true;
                break;
        }
        //-------------------------------

    });

    document.addEventListener('keyup', function (event) {
        //-------------------------------
        // switch (event.code) {
        //     case 'ArrowUp':
        //         p2MovingUp = false;
        //         break;
        //     case 'ArrowDown':
        //         p2MovingDown = false;
        //         break;
        //     case 'KeyW':
        //         p1MovingUp = false;
        //         break;
        //     case 'KeyS':
        //         p1MovingDown = false;
        //         break;
        // }
        //-------------------------------
        // Bardia:
        switch (event.code) {
            case 'ArrowUp':
                p2MovingUp = false;
                break;
            case 'ArrowDown':
                p2MovingDown = false;
                break;
        }
        switch (event.code) {
            case 'KeyW':
                p1MovingUp = false;
                break;
            case 'KeyS':
                p1MovingDown = false;
                break;
        }
        //-------------------------------

    });

    function updatePositions() {
        if (p2MovingUp) {
            divP2.style.top = (parseInt(divP2.style.top) - step) + 'px';
        }
        if (p2MovingDown) {
            divP2.style.top = (parseInt(divP2.style.top) + step) + 'px';
        }
        if (p1MovingUp) {
            divP1.style.top = (parseInt(divP1.style.top) - step) + 'px';
        }
        if (p1MovingDown) {
            divP1.style.top = (parseInt(divP1.style.top) + step) + 'px';
        }
        requestAnimationFrame(updatePositions);
    }

    updatePositions();
}


function startGame() {
    document.addEventListener('keypress', function (event) {

        if (event.code == 'Space' && !gameIsRunning) {
            gameIsRunning = true;
            setBallStep();
            moveBall();
        }
        if (event.code == 'KeyP') {
            gameIsRunning = false;
            reposPlayers(0,0);
        }
    });
    function setBallStep(){
        let signX = rand(0,1) === 0 ? -1 : 1 ;
        let signY = rand(0,1) === 0 ? -1 : 1 ;
        while(ballXspeed != 5 && ballYspeed != 5) {
            ballXspeed = rand(1,5);
            ballYspeed = rand(2,5);
        }
        ballXspeed *= signX;
        ballYspeed *= signY;
    }
}

function moveBall() {
    if (gameIsRunning) {
        divB.style.top = (parseInt(divB.style.top) + ballYspeed) + 'px';
        divB.style.left = (parseInt(divB.style.left) + ballXspeed) + 'px';
        if (parseInt(divB.style.top) <= 0 || parseInt(divB.style.top)  >= divScreen.offsetHeight) {
             ballYspeed *= -1; }

        if (parseInt(divB.style.left) <=0 || parseInt(divB.style.left) >= divScreen.offsetWidth) {
            reposPlayers(0,0);
            gameIsRunning = false;
        }
        
        let p1Rect = divP1.getBoundingClientRect();
        let p2Rect = divP2.getBoundingClientRect();
        let ballRect = divB.getBoundingClientRect();

        if((ballRect.left <= p1Rect.right &&
           ballRect.right >= p1Rect.left &&
           ballRect.top <= p1Rect.bottom &&
           ballRect.bottom >= p1Rect.top) ||
           (ballRect.left <= p2Rect.right &&
            ballRect.right >= p2Rect.left &&
            ballRect.top <= p2Rect.bottom &&
            ballRect.bottom >= p2Rect.top)) {ballXspeed *= -1 ;}
        

        requestAnimationFrame(moveBall);
    }
}

window.onload = () => {

    reposPlayers();
    movePlayer();
    startGame();

    var w = divScreen.offsetWidth;
    var h = divScreen.offsetHeight;
    window.onresize = () => reposPlayers(w,h);

};

alert("welcome to web pong\nhope you enjoy this game");
alert(Math.random()*10);
