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
    }, 3);
}

//Insert objective to the objective menu
function insertObjective(obj1="",obj2="",obj3="",obj4=""){
    $('objective1').innerHTML=obj1;
    $('objective2').innerHTML=obj2;
    $('objective3').innerHTML=obj3;
    $('objective4').innerHTML=obj4;
}

//Complete objectives
function completeObjective(objective){
    switch (objective) {
        case 1: $('objective1').style.textDecoration="line-through"; break;
        case 2: $('objective2').style.textDecoration="line-through"; break;
        case 3: $('objective3').style.textDecoration="line-through"; break;
        case 4: $('objective4').style.textDecoration="line-through"; break;
        default: break;
    }
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
let mission25 = false;
let mission3 = false;
let mission4 = false;
let temp = false; //temporary for bituach leumi
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
    if (/*mission11 && */!mission12 && playerBetween(8,9,14,15)){
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
    if (/*mission12 && */!mission13 && playerBetween(12,13,15,16)){
        mission13 = true;
        freezePlayer();
        playerChoice = prompt("bar hu piho?\nfor wrong press - n \n for right press - y");
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
    if (mission13 && !mission14 && playerBetween(16.5,17.5,15,16)){
        mission14 = true;
        switchLevels(21);
    }
    if (mission14 && !mission21 && playerBetween(10.5,11.5,9,10)){
        mission21 = true;
        switchLevels(22);
    }
    if (mission21 && !mission22 && playerBetween(17.5,18.5,9,10)){
        mission22 = true;
        switchLevels(23);
    }
    if (mission22 && !mission23 && playerBetween(11,12,8,9)){
        mission23 = true;
        freezePlayer();
        alert("Is this a maze or a home god dammit.");
        resetPlayer();
    }
    if (mission23 && !mission24 && playerBetween(11,12,2,5) && (player.rotation > 5.5 || player.rotation < 0.8)){
        mission24 = true;
        freezePlayer();
        alert("hmm, seems suspicious");
        setTimeout(() => {
            alert("Okay, I think I need to get the hell out of here!!!!");
            alert("Fuck this shit!!!");
            resetPlayer();
        }, 2000);
    }
    if (mission24 && !mission25 && playerBetween(12,13,2.5,3.5)){
        mission25 = true;
        switchLevels(24);
    }
    if (!temp && player.x <1.5 && player.y >16){
        temp = true; //this is temporary you wanker
        switchLevels(31);
    }
}

//Test if player location is between x1 and x2, y1 and y2.
function playerBetween(x1,x2,y1,y2){
    if (player.x > x1 && player.x < x2 && player.y > y1 && player.y < y2)
        return true;
    return false;
}

//Switching levels.
function switchLevels(level){
    switch (level) {
        case 1:
            alert("Error!\nSavta shelha.");
            break;
        case 21:
            freezePlayer();
            alert("I'll go look for another apartment. how bad can it be?!");
            dimScreen();
            setTimeout(() => {
                relocatePlayer(8.3,9,0);
                deleteSprites();
                initSprites(21);
                map = map21;
                initScreen();
                drawMap();
                dedimScreen();
                setTimeout(() => {
                    alert("okay lets check this new apartment.");
                    slowPanning();
                }, 2000);
                setTimeout(() => {
                    alert("Omg, this place is disgusting.\nGotta find a new flat");
                    resetPlayer();
                }, 15000);
            }, 2000);
            break;
        case 22:
            freezePlayer();
            alert("Okay, lets try again...");
            dimScreen();
            setTimeout(() => {
                relocatePlayer(1.3,9,0);
                deleteSprites();
                initSprites(22);
                map = map22;
                initScreen();
                drawMap();
                dedimScreen();
                setTimeout(() => {
                    alert("Okay, seems cozy... lets check it out.");
                    slowWalking();
                    setTimeout(() => {
                        alert("this place creeps the bejesus out of me...");
                        resetPlayer();
                    }, 15000);
                }, 2000);
            }, 2000);
            break;
        case 23:
            freezePlayer();
            alert("Third times a charm I guess?");
            dimScreen();
            setTimeout(() => {
                relocatePlayer(6.5,6.5,0);
                deleteSprites();
                initSprites(23);
                map = map23;
                initScreen();
                drawMap();
                dedimScreen();
                setTimeout(() => {
                    alert("Okay, seems inviting and nice...");
                    resetPlayer();
                }, 2000);

            }, 2000);
            break;
        case 24:
            freezePlayer();
            setTimeout(() => {
                alert("phew, I'm glad I got away.");
            }, 1000);
            dimScreen();
            setTimeout(() => {
                relocatePlayer(7,10,0);
                deleteSprites();
                initSprites(24);
                map = map24;
                initScreen();
                drawMap();
                dedimScreen();
                setTimeout(() => {
                    alert("Okay, I think this is the one!");
                    alert("It does require a bit of cleaning and some furnishing");
                    resetPlayer();
                }, 2000);
            }, 2000);
            break;
        case 3:
            freezePlayer();
            dimScreen();
            setTimeout(() => {
                relocatePlayer(7,10,0); //change to another location
                deleteSprites();
                initSprites(3); //change to initSprites(whatever number you chose)
                map = map3; //change to whatever map name you chose
                initScreen();
                drawMap();
                dedimScreen();
                setTimeout(() => {
                    alert("Bituach leumi, my arch nemesis!");
                    resetPlayer();
                }, 2000);
            }, 2000);
            break;
        case 31:
            freezePlayer();
            dimScreen();
            setTimeout(() => {
                relocatePlayer(7,10,0); //change to another location
                deleteSprites();
                initSprites(31); //change to initSprites(whatever number you chose)
                map = map31; //change to whatever map name you chose
                initScreen();
                drawMap();
                dedimScreen();
                setTimeout(() => {
                    alert("wallak need a job.");
                    resetPlayer();
                }, 2000);
            }, 2000);
            break;
        case 4:
            break;
        default:
            break;
    }
}