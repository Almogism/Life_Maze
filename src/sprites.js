initSprites = function (state)              // Add sprites for a specific map by checking the state
{                                           // 1  = Stage 1
    if (state == 1){                        // 21 = Stage 2.1
       addItems1();                         // 22 = Stage 2.2
    }                                       // 23 = Stage 2.3
    if (state == 21){                       // 24 = Stage 2.4
        addItems21()
    }
    if (state == 22){
        addItems22()
    }
    if (state == 23){
        addItems23()
    }
    if (state == 24){
        addItems24();
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
    { img : 'src/assets/Objects/trash3.png', block: false}       // 26= Trash 3

];

//------------LEVEL 1--------------------------------------------------------------------------------------------------------------

addItems1 = function () {
    var item = {
        type: 3,
        x: 5,
        y: 3
    }
    mapSprites.push(item)
    var item2 = {
        type: 2,
        x: 12,
        y: 16
    }
    mapSprites.push(item2)
    var item3 = {
        type: 4,
        x: 8,
        y: 1
    }
    mapSprites.push(item3)
    var item4 = {
        type: 5,
        x: 7,
        y: 14
    }
    mapSprites.push(item4)
    var item5 = {
        type: 5,
        x: 3,
        y: 14
    }
    mapSprites.push(item5)
    var item6 = {
        type: 3,
        x: 3,
        y: 7
    }
    mapSprites.push(item6)
    var item7 = {
        type: 4,
        x: 1,
        y: 10
    }
    mapSprites.push(item7)
    var item8 = {
        type: 9,
        x: 13,
        y: 5
    }
    mapSprites.push(item8)
    var item9 = {
        type: 7,
        x: 11,
        y: 1
    }
    mapSprites.push(item9)
    var item10 = {
        type: 7,
        x: 18,
        y: 1
    }
    mapSprites.push(item10)
    var item11 = {
        type: 8,
        x: 12,
        y: 6
    }
    mapSprites.push(item11)

    var item12 = {
        type: 16,
        x: 9,
        y: 16
    }
    mapSprites.push(item12)

    var item13 = {
        type: 18,
        x: 1,
        y: 16
    }
    mapSprites.push(item13)

    var item14 = {
        type: 13,
        x: 7,
        y: 10
    }
    mapSprites.push(item14)

    var item15 = {
        type: 9,
        x: 5,
        y: 15
    }
    mapSprites.push(item15)

    var item16 = {
        type: 16,
        x: 1,
        y: 1
    }
    mapSprites.push(item16)

    var item17 = {
        type: 16,
        x: 18,
        y: 9
    }
    mapSprites.push(item17)

    var item18 = {
        type: 14,
        x: 15,
        y: 10
    }
    mapSprites.push(item18)

    var item19 = {
        type: 14,
        x: 15,
        y: 14
    }
    mapSprites.push(item19)

    var item20 = {
        type: 3,
        x: 16,
        y: 12
    }
    mapSprites.push(item20)

    var item21 = {
        type: 5,
        x: 5,
        y: 5
    }
    mapSprites.push(item21)

    var item22 = {
        type: 14,
        x: 14,
        y: 3
    }
    mapSprites.push(item22)

}


//------------LEVEL 2.1------------------------------------------------------------------------------------------------------------

function addItems21(){
    var item = {
        type: 10,
        x: 9,
        y: 7
    }
    mapSprites.push(item)

    var item2 = {
        type: 11,
        x: 10,
        y: 8
    }
    mapSprites.push(item2)

    var item3 = {
        type: 10,
        x: 9,
        y: 9
    }
    mapSprites.push(item3)

    var item4 = {
        type: 10,
        x: 10,
        y: 10
    }
    mapSprites.push(item4)
    
    var item5 = {
        type: 23,
        x: 11,
        y: 8
    }
    mapSprites.push(item5)
}
//------------LEVEL 2.2------------------------------------------------------------------------------------------------------------
function addItems22(){
    var item = {
        type: 14,
        x: 4,
        y: 8
    }
    mapSprites.push(item)

    var item2 = {
        type: 14,
        x: 6,
        y: 9
    }
    mapSprites.push(item2)

    var item3 = {
        type: 14,
        x: 8,
        y: 8
    }
    mapSprites.push(item3)

    var item4 = {
        type: 14,
        x: 10,
        y: 9
    }
    mapSprites.push(item4)

    var item5 = {
        type: 14,
        x: 12,
        y: 8
    }
    mapSprites.push(item5)

    var item6 = {
        type: 14,
        x: 14,
        y: 9
    }
    mapSprites.push(item6)

    var item7 = {
        type: 12,
        x: 18,
        y: 8
    }
    mapSprites.push(item7)

    var item8 = {
        type: 24,
        x: 9,
        y: 8
    }
    mapSprites.push(item8)

    var item9 = {
        type: 6,
        x: 1,
        y: 9
    }
    mapSprites.push(item9)

    var item10 = {
        type: 13,
        x: 1,
        y: 8
    }
    mapSprites.push(item10)

}

//------------LEVEL 2.3------------------------------------------------------------------------------------------------------------

function addItems23(){
    
    var item = {
        type: 6,
        x: 6,
        y: 6
    }
    mapSprites.push(item)

    var item4 = {
        type: 5,
        x: 7,
        y: 11
    }
    mapSprites.push(item4)

    var item5 = {
        type: 5,
        x: 10,
        y: 11
    }
    mapSprites.push(item5)

    var item6 = {
        type: 14,
        x: 13,
        y: 8
    }
    mapSprites.push(item6)

    var item7 = {
        type: 14,
        x: 12,
        y: 6
    }
    mapSprites.push(item7)

    var item8 = {
        type: 17,
        x: 11,
        y: 2
    }
    mapSprites.push(item8)



}
//------------LEVEL 2.4------------------------------------------------------------------------------------------------------------


function addItems24(){

    var item = {
        type: 6,
        x: 11,
        y: 6
    }
    mapSprites.push(item)

    var item2 = {
        type: 23,
        x: 11,
        y: 8
    }
    mapSprites.push(item2)

    var item3 = {
        type: 11,
        x: 12,
        y: 8
    }
    mapSprites.push(item3)

    var item4 = {
        type: 26,
        x: 6,
        y: 7
    }
    mapSprites.push(item4)

    var item5 = {
        type: 26,
        x: 8,
        y: 6
    }
    mapSprites.push(item5)

    var item6 = {
        type: 10,
        x: 8,
        y: 10
    }
    mapSprites.push(item6)

    var item7 = {
        type: 25,
        x: 6,
        y: 9
    }
    mapSprites.push(item7)

    var item8 = {
        type: 26,
        x: 11,
        y: 11
    }
    mapSprites.push(item8)

}




//----------------------------------------------------------

// clearSprites = function () {
//     for (var i = 0; i < sprites.length; i++) {
//         var sprite = sprites[i];
//         sprite.visible = false;
//     }
// }


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
            img.style.filter = "brightness(" + (100 - 10 * distance) + "%)";
            img.style.zIndex = (size) >> 0;
        } else {
            sprite.img.style.display = "none";
        }
    }
}