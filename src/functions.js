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
let mission11= false;
let mission12= false;
let mission13= false;
let mission14= false;
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
    if (!mission11 && playerBetween(14,15,2,3)){
        mission11 = true;
        freezePlayer();
        alert("Mom said I need to prepare some food.\nIt's just some chicken, how hard can it be?");
        map[0][14] = 8;
        setTimeout(() => {
            alert("You've burnt the food.\nEven the dog is not impressed, guess we're eating pizza tonight.");
                map[0][14] = 7;
                resetPlayer();
        }, 2000);
    }
    if (!mission12 && playerBetween(8,9,14,15)){
        mission12 = true;
        freezePlayer();
            alert("Room cleaning for dad.\nI need to wipe that goo off the wall, let's give our best this time!");
            setTimeout(() => {
                alert("You've messed up the whole room.\ndad is going to be mad...");
                map[12][8] = 4; map[17][7] = 4; map[17][9] = 4; map[17][3] = 4;
                map[17][4] = 4; map[17][5] = 4; map[17][6] = 4; map[17][8] = 4;          
                map[17][8] = 4; map[15][0] = 4; map[14][0] = 4; map[13][0] = 4;
                map[12][1] = 4; map[12][2] = 4; map[12][3] = 4; map[12][4] = 4;
                map[12][7] = 4; map[12][9] = 4;
                resetPlayer();
            }, 2000);
    }
    if (!mission13 && playerBetween(12,13,15,16)){
        mission13 = true;
        freezePlayer();
        let playerChoice = prompt("bar hu piho?\nfor wrong press - n \n for right press - y");
        if (playerChoice == 'y'){
            alert("you're correct.");
            freezePlayer();
        }
        else if (playerChoice == 'n'){
            alert("you're wrong.");
            freezePlayer();
        }
        else{
            alert("wrong input you dickhead");
            freezePlayer();
        }
        resetPlayer();
    }
}
function playerBetween(x1,x2,y1,y2){
    if (player.x > x1 && player.x < x2 && player.y > y1 && player.y < y2)
        return true;
    return false;
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