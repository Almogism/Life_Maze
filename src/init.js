//Runs as the window loads.
window.onload = function() {
    //Defining the map width and height.
    mapWidth = map[0].length;
    mapHeight = map.length;

    addKeys(); //Adding the hotkeys for controlling the game.
    initScreen(); //Initializing the screen.
    drawMap(); //Calling the draw map function to draw a minimap.
    gameCycle(); //Game cycle function.
    renderCycle(); //Rendering cycle function.
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

//Render cycle for the game, to update the game live.
function renderCycle() {

    updateMap(); //Update map every render for objects.
    castRays(); //Casting rays for the player.
    updateBackground(); //Change background.

    setTimeout(renderCycle, gameCycleDelay); //Call render cycle every gameCycleDelay.
}