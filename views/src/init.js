//Runs as the window loads.
window.onload = function() {
    //Defining the map width and height.
    mapWidth = map[0].length;
    mapHeight = map.length;

    addKeys(); //Adding the hotkeys for controlling the game.
    initScreen(); //Initializing the screen.
    initSprites(1); //Initializing the first sprites.
    initEntities(); //Initializing the entities.
    drawMap(); //Calling the draw map function to draw a minimap.
    gameCycle(); //Game cycle function.
    renderCycle(); //Rendering cycle function.
    updateMoney();
}

//Simple getID function with the dollar sign "$".
var $ = function (id) {
    return document.getElementById(id);
};

//Variables for the rendering cycle.
var lastGameCycleTime = 0;
const gameCycleDelay = 1000 / 30;

//Game cycle for calculating the time delta between the current state and the next state.
function gameCycle() {
    
    var now = new Date().getTime(); //Current time using Date class.
    var timeDelta = now - lastGameCycleTime; //Time delta calculation.

    move(timeDelta); //Move player for time delta.

    var cycleDelay = gameCycleDelay; //constant gameCycleDelay

    //Function to change the cycleDelay according to the time delta.
    if (timeDelta > cycleDelay)
        cycleDelay = Math.max(1, cycleDelay - (timeDelta - cycleDelay))

    lastGameCycleTime = now; //First itteration of lastGameCycleTime.
    setTimeout(gameCycle, cycleDelay); //Call game cycle every cycleDelay.
}

function stats(){
    let statistics = document.getElementById("statis");
    var playerStats = document.createTextNode("<" + player.x.toFixed(2) + "," + player.y.toFixed(2) + ">\n(" + player.rotation.toFixed(2) + ")");
    statistics.appendChild(playerStats);
    setTimeout(function(){statistics.removeChild(playerStats)}, 100);
}

//setInterval(stats,200);


//Render cycle for the game, to update the game live.
async function renderCycle() {

    updateMap(); //Update map every render for objects.
    castRays(); //Casting rays for the player.
    renderSprites(); //Rendering sprites in the game.
    renderEntities(); //Rendering entites in the game.
    updateBackground(); //Change background.
    checkPlayerLocation(); //Test for player location every cycle, for events.
    setTimeout(renderCycle, gameCycleDelay); //Call render cycle every gameCycleDelay.
}