function initSprites(state){                // Add sprites for a specific map by checking the state
    switch (state) {
        case 1: addItems1(); break;         // 1 = Stage 1
        case 21: addItems21(); break;       // 21 = Stage 2.1
        case 22: addItems22(); break;       // 22 = Stage 2.2
        case 23: addItems23(); break;       // 23 = Stage 2.3
        case 24: addItems24(); break;       // 24 = Stage 2.4
        case 3: addItems3(); break;
        case 31: addItems31(); break;
        default: break;
    }
    
    for (var i = 0; i < map.length; i++) 
        spritePosition[i] = [];

    var screen = $('screen');
    for (var i = 0; i < mapSprites.length; i++) 
    {   // Adding all correct sprites
        var sprite = mapSprites[i];
        var itemType = itemTypes[sprite.type];
        var img = document.createElement('img');
        img.src = itemType.img;
        img.style.display = "none";
        img.style.position = "absolute";
        img.style.overflow = "hidden";
        sprite.visible = false;
        sprite.block = itemType.block;
        sprite.img = img;
        spritePosition[sprite.y][sprite.x] = sprite;
        sprites.push(sprite);
        screen.appendChild(img);
    }
}

// Bank of all sprites in the game
var sprites = [];
var mapSprites = [];
var spritePosition = [];
// Sprites dic                                               ITEM TYPE = DESCRIPTION
var itemTypes = [                                                
    { img : 'src/assets/Objects/bush.png', block: false },       // 0 = Bush
    { img : 'src/assets/Objects/rat.png', block: false },        // 1 = Rat
    { img : 'src/assets/Objects/phone.png', block: false },      // 2 = Phone
    { img : 'src/assets/Objects/tablechairs.png', block: false}, // 3 = Table with 2 chairs
    { img : 'src/assets/Objects/plantgreen.png', block: false},  // 4 = Green plant
    { img : 'src/assets/Objects/light.png', block: false},       // 5 = Chandelier
    { img : 'src/assets/Objects/bed.png', block: false},         // 6 = Bed
    { img : 'src/assets/Objects/kitchenware.png', block: false}, // 7 = Kitchenware 1
    { img : 'src/assets/Objects/kitchenware2.png', block: false},// 8 = Kitchenware 2
    { img : 'src/assets/Objects/table.png', block: false},       // 9 = Table
    { img : 'src/assets/Objects/trash.png', block: false},       // 10= Trash
    { img : 'src/assets/Objects/puddle.png', block: false},      // 11= Puddle
    { img : 'src/assets/Objects/knight.png', block: false},      // 12= Knight
    { img : 'src/assets/Objects/plantbrown.png', block: false},  // 13= Brown plant
    { img : 'src/assets/Objects/light2.png', block: false},      // 14= Light from ceiling
    { img : 'src/assets/Objects/light3.png', block: false},      // 15= Lamp
    { img : 'src/assets/Objects/heater.png', block: false},      // 16= Fireplace
    { img : 'src/assets/Objects/flag.png', block: false},        // 17= Flag
    { img : 'src/assets/Objects/barrel.png', block: false},      // 18= Barrel
    { img : 'src/assets/Objects/spears.png', block: false},      // 19= Pile of spears
    { img : 'src/assets/Objects/cage.png', block: false},        // 20= Empty cage
    { img : 'src/assets/Objects/vase.png', block: false},        // 21= Empty blue vase
    { img : 'src/assets/Objects/gbarrel.png', block: false},     // 22= Green barrel
    { img : 'src/assets/Objects/sink.png', block: false},        // 23= Sink
    { img : 'src/assets/Objects/scage.png', block: false},       // 24= Cage with skeleton
    { img : 'src/assets/Objects/trash2.png', block: false},      // 25= Trash 2
    { img : 'src/assets/Objects/trash3.png', block: false},      // 26= Trash 3
    { img : 'src/assets/Objects/itemshop.png', block: false},    // 27= Item Shop
    { img : 'src/assets/Objects/servicewoman.png', block: false},// 28= Service woman
    { img : 'src/assets/Objects/kids.png', block: false},        // 29= Kids on a bench
    { img : 'src/assets/Objects/busy.png', block: false},        // 30= Business meeting
    { img : 'src/assets/Objects/light4.png', block: false},      // 31= Light from ceiling 2
    { img : 'src/assets/Objects/waitroom.png', block: false},    // 32= Waiting room sign
    { img : 'src/assets/Objects/bench.png', block: false},       // 33= Waiting bench
    { img : 'src/assets/Objects/policew.png', block: false},     // 34= Police woman
    { img : 'src/assets/Objects/sofa.png', block: false},        // 35= Sofa
    { img : 'src/assets/Objects/hobo.png', block: false},        // 36= Man looking for job
    { img : 'src/assets/Objects/idf.png', block: false},         // 37= Soldiers
    { img : 'src/assets/Objects/interview.png', block: false},   // 38= Interviewer sits
    { img : 'src/assets/Objects/interview2.png', block: false},  // 39= Interviewer stand
    { img : 'src/assets/Objects/vendingm.png', block: false},    // 40= Vending machine
    { img : 'src/assets/Objects/working.png', block: false},     // 41= Happy man working
    { img : 'src/assets/Objects/working2.png', block: false}     // 42= Man plays on desk

];

//Function to add a singular sprite.
function addSprite(newType,newX,newY){
    var item = {
        type: newType,
        x: newX,
        y: newY
    }
    mapSprites.push(item);
}

//------------LEVEL 1--------------------------------------------------------------------------------------------------------------

function addItems1() {
    insertObjective("להכין אוכל","לנקות את החדר של אבא","לדבר עם השליח","");

    addSprite(3,5,3); addSprite(2,12,16); addSprite(4,8,1); addSprite(5,7,14);
    addSprite(5,3,14); addSprite(3,3,7); addSprite(4,1,10); addSprite(9,13,5);
    addSprite(7,11,1); addSprite(7,18,1); addSprite(8,12,6); addSprite(16,9,16);
    addSprite(18,1,16); addSprite(13,7,10); addSprite(9,5,15); addSprite(16,1,1);
    addSprite(16,18,9); addSprite(14,15,10); addSprite(14,15,14); addSprite(3,16,12);
    addSprite(5,5,5); addSprite(14,14,3); addSprite(35,15,16);
}

//------------LEVEL 2.1------------------------------------------------------------------------------------------------------------

function addItems21(){
    addSprite(10,9,7); addSprite(11,10,8); addSprite(10,9,9); addSprite(10,10,10); addSprite(23,11,8);
}

//------------LEVEL 2.2------------------------------------------------------------------------------------------------------------

function addItems22(){
    addSprite(14,4,8); addSprite(14,6,9); addSprite(14,8,8); addSprite(14,10,9); addSprite(14,12,8);
    addSprite(14,14,9); addSprite(12,18,8); addSprite(24,9,8); addSprite(6,1,9); addSprite(13,1,8);
}

//------------LEVEL 2.3------------------------------------------------------------------------------------------------------------

function addItems23(){
    addSprite(6,6,6); addSprite(5,7,11); addSprite(5,10,11); addSprite(14,13,8); addSprite(14,12,6); addSprite(17,11,2);
}

//------------LEVEL 2.4------------------------------------------------------------------------------------------------------------

function addItems24(){

    addSprite(6,11,6); addSprite(23,11,8); addSprite(11,12,8); addSprite(26,6,7); addSprite(26,8,6); addSprite(10,8,10);
    addSprite(25,6,9); addSprite(26,11,11); addSprite(2,5,6); addSprite(27,9,6)
}

//------------LEVEL 3--------------------------------------------------------------------------------------------------------------


function addItems3(){

    addSprite(28,11,3); addSprite(29,12,4); addSprite(30,9,3); addSprite(30,7,3); addSprite(30,5,3);
    addSprite(31,6,4); addSprite(31,8,4); addSprite(31,10,4); addSprite(32,13,3); addSprite(33,14,3);
    addSprite(14,7,6); addSprite(14,11,6); addSprite(14,11,10); addSprite(4,6,11); addSprite(4,14,11);
    addSprite(9,12,8); addSprite(9,9,8); addSprite(34,5,8);
}


//------------LEVEL 3.1------------------------------------------------------------------------------------------------------------
function addItems31(){
    addSprite(36,4,11); addSprite(37,10,5); addSprite(38,15,11); addSprite(39,14,11); addSprite(40,11,9);
    addSprite(41,4,2); addSprite(42,6,2); addSprite(35,10,2); addSprite(35,12,2); addSprite(4,8,2); 
    addSprite(31,11,3); addSprite(31,5,4); addSprite(31,7,4); addSprite(2,4,7); addSprite(35,15,7);
    addSprite(4,15,5);
}

function deleteSprites(){
    // Sprites delete function
    for (var i = 0;i<sprites.length;i++){
        mapSprites.pop();
        sprites[i].visible = false;
    }
}
//----------------------------------------------------------

renderSprites = function () {
    // Rendering sprites function
    for (var i = 0; i < sprites.length; i++) {

        var sprite = sprites[i];
        if (sprite.visible) {

            var img = sprite.img;
            img.style.display = "block";

            // translate position to viewer space
            var dx = sprite.x + 0.5 - player.x;
            var dy = sprite.y + 0.5 - player.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            var angle = Math.atan2(dy, dx) - player.rotation;
            var size = viewDist / (Math.cos(angle) * distance);

            // x-position on screen
            var x = Math.tan(angle) * viewDist;
            img.style.left = (screenWidth / 2 + x - size / 2) + "px";
            // y is constant
            img.style.top = ((screenHeight - size) / 2) + "px";
            img.style.width = size + "px";
            img.style.height = size + "px";

            // fog on sprite
            img.style.filter = "brightness(" + (100 - 7.5 * distance) + "%)";
            img.style.zIndex = (size) >> 0;
        } else {
            sprite.img.style.display = "none";
        }
    }
}