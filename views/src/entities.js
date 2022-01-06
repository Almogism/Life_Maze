//Adding entities.
function addEntities() {
    //Adding a dog entity :).
    var dog = {
        type: 0,
        x: 4,
        y: 4
    }
    //Appending the entity to the entity array.
    mapEntities.push(dog);
}

//Function for initializing entities.
function initEntities() {
    
    //Adding current entities.
    addEntities();
    //Getting screen ID.
    var screen = $('screen');
    //Iterating through all entities.
    for (var i = 0; i < mapEntities.length; i++) {
        var entity = mapEntities[i];
        var type = entityTypes[entity.type];
        var img = document.createElement('img');
        img.src = type.img;
        img.style.display = "none";
        img.style.position = "absolute";
        
        //Entity attributes.
        entity.state = 0;
        entity.rot = 0;
        entity.dir = 0;
        entity.speed = 0;
        entity.moveSpeed = type.moveSpeed;
        entity.rotSpeed = type.rotSpeed;
        entity.numOfStates = type.numOfStates;
        entity.prevStyle = {
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            clip: '',
            display: 'none',
            zIndex: 0
        };
        entity.img = img;
        entities.push(entity); //Insert entity to array.
        screen.appendChild(img);
    }
}

//Entities arrays.
var entities = [];
var mapEntities = [];

//Entity types.
var entityTypes = [
    //Doggy dog :)
    {
        img: 'src/assets/Entities/originalDoggydog.png',
        moveSpeed: 0.05,
        rotSpeed: 5,
        numOfStates: 9
    }
];

//Rendering entities 
renderEntities = function () {
    for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];
        var dx = entity.x - player.x;
        var dy = entity.y - player.y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 10) {

            var angle = Math.atan2(dy, dx) - player.rotation;
            if (angle < -Math.PI) angle += Math.PI * 2;
            if (angle >= Math.PI) angle -= Math.PI * 2;
            if ((angle > -Math.PI) && (angle < Math.PI)) {

                var img = entity.img;
                var size = viewDist / (Math.cos(angle) * distance);
                var x = Math.tan(angle) * viewDist;
                var prevStyle = entity.prevStyle;

                if (size != prevStyle.height) {
                    img.style.height = size + 'px';
                    prevStyle.height = size;
                }
                // times the total number of states
                if ((size * entity.numOfStates) != prevStyle.width) {
                    img.style.width = (size * entity.numOfStates) + 'px';
                    prevStyle.width = (size * entity.numOfStates);
                }
                if (((screenHeight - size) / 2) != prevStyle.top) {
                    img.style.top = ((screenHeight - size) / 2) + 'px';
                    prevStyle.top = ((screenHeight - size) / 2);
                }
                if ((screenWidth / 2 + x - size / 2 - size * entity.state) != prevStyle.left) {
                    img.style.left = (screenWidth / 2 + x - size / 2 - size * entity.state) + 'px';
                    prevStyle.left = (screenWidth / 2 + x - size / 2 - size * entity.state);
                }
                if (("brightness(" + (100 - 10 * distance) + "%)") != prevStyle.filter) {
                    img.style.filter = ("brightness(" + (100 - 7.5 * distance) + "%)");
                    prevStyle.filter = ("brightness(" + (100 - 7.5 * distance) + "%)");
                }
                if (size >> 0 != prevStyle.zIndex) {
                    img.style.zIndex = size >> 0;
                    prevStyle.zIndex = size >> 0;
                }
                if ('block' != prevStyle.display) {
                    img.style.display = 'block';
                    prevStyle.display = 'block';
                }
                if (('rect(0, ' + (size * (entity.state + 1)) + ', ' + size + ', ' + (size * (entity.state)) + ')') != prevStyle.clip) {
                    img.style.clip = ('rect(0, ' + (size * (entity.state + 1)) + ', ' + size + ', ' + (size * (entity.state)) + ')');
                    prevStyle.clip = ('rect(0, ' + (size * (entity.state + 1)) + ', ' + size + ', ' + (size * (entity.state)) + ')');
                }
            }
            //Giving the entity AI.
            entityAI(entity);
        }
    }
}

//AI functionality for the entity, so it could follow the player.
function entityAI(entity) {

    var dx = player.x - entity.x;
    var dy = player.y - entity.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if ((distance > 2) && (distance < 8)) {
        var angle = Math.atan2(dy, dx);
        entity.rotDeg = angle * 180 / Math.PI;
        entity.rot = angle;
        entity.speed = 1;
        var walkCycleTime = 1000;
        var numWalkSprites = 7;
        entity.state = Math.floor((new Date() % walkCycleTime) / (walkCycleTime / numWalkSprites)) + 1;
    } else {
        entity.state = 0;
        entity.speed = 0;
    }
    entityMove(entity);
}

//Entity movement function.
function entityMove(entity) {

    var moveStep = entity.speed * entity.moveSpeed;
    var newX = entity.x + Math.cos(entity.rot) * moveStep;
    var newY = entity.y + Math.sin(entity.rot) * moveStep;

    // vars take player's collision checker
    var pos = checkCollision(entity.x, entity.y, newX, newY, 0.35);
    entity.x = pos.x;
    entity.y = pos.y;
}