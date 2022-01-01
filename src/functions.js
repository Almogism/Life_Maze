//Freeze player for transitions and events.
function freezePlayer(){
    player.moveSpeed = 0;
    player.rotationSpeed=0;
    player.direction=0;
    player.vertical=0;
}

//Reset player movement to continue the game.
function resetPlayer(){
    player.moveSpeed = 0.2;
    player.rotationSpeed=5;
    player.direction=0;
    player.vertical=0;
}

//Function to relocate the player.
function relocatePlayer(newX,newY,newRotation=0){
    player.x = newX;
    player.y = newY;
    player.rotation=newRotation;
}

//Screen dimming function for the loading screen.
function dimScreen(){
    //Get loading screen ID.
    const loading = $("loading");;
    let i = 0.1;
    //Interval for dimming, running every 100ms.
    var dimmingInterval = setInterval(() => {
        loading.style.opacity = i;
        i+=0.05;
        if (i>1.01){
            //When approaching 1, clear interval and blacken screen entirely.
            clearInterval(dimmingInterval);
            loading.style.opacity=1;
        }
    }, 50);
}

//Screen de-dimming function for the loading screen.
function dedimScreen(){
    //Get loading screen ID.
    const loading = $("loading");
    let i = 1;
    //Interval for de-dimming, running every 100ms.
    var dedimmingInterval = setInterval(() => {
        loading.style.opacity = i;
        i-=0.05;
        if (i<0.01){
            //When approaching zero, clear interval and clear screen entirely.
            clearInterval(dedimmingInterval);
            loading.style.opacity=0;
        }
    }, 50);
}

//Function to simulate looking around the room.
function slowPanning(){
    let i=0; //To count interations.
    let flag=false; //Flag to mark the ending of the right panning.
    let rightRotationInterval = setInterval(() => { //Set interval for panning right.
        player.rotation += 0.005; //Rotating the player right.
        i++;
        if (i==100){
            clearInterval(rightRotationInterval); //Stop the interval.
            flag = true; //Right panning is over, left panning can commence.
        }
        if (flag){ //Start left panning if right one is over.
            setTimeout(() => { //Delay of 1 second to start panning left.
                i=0;
                var leftRotationInterval = setInterval(() => { //Left panning interval.
                    player.rotation -= 0.01; //Rotate the player left.
                    i++;
                    if (i==90)
                        clearInterval(leftRotationInterval); //End the left panning.
                }, 5);
            }, 1000);
        }
    }, 5);
}

//Function to simulate walking forward through a room.
function slowWalking(){
    var i=0;
    var walkingInterval = setInterval(() => {
        player.x += 0.05;
        i++;
        if (i>250)
            clearInterval(walkingInterval);
    }, 5);
}

//Boolean variables to mark finishing missions.
let mission1= false;
let mission21 = false;
let mission22 = false;
let mission23 = false;
let mission24 = false;
let mission3 = false;
let mission4 = false;
//let mission = false;
//let mission = false;
//let mission = false;
//let mission = false;
//let mission = false;
//let mission = false;
//let mission = false;
//let mission = false;
//let mission = false;


//Check player location to commence events.
function checkPlayerLocation(){
    let playerChoice;
}

function switchLevels(level){
    switch (level) {
        case 1:
            break;
        case 21:
            break;
        case 22:
            break;
        case 23:
            break;
        case 24:
            break;
        case 3:
            break;
        case 4:
            break;
        default:
            break;
    }
}