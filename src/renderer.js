function initScreen(){
    
    //Getting the screen ID.
    var screen = $("screen");

    //Styling the screen according to the screen height and width variables.
    screen.style.height = screenHeight + 'px';
    screen.style.width = screenWidth + 'px';

    for (var i = 0; i < screenWidth; i += stripWidth) {
        //Creating a strip element for splitting the scene (crucial for the raycasting engine operation).
        var strip = document.createElement("div");

        //Inserting styling for the strips.
        strip.style.position = "absolute";
        strip.style.left = i + "px";
        strip.style.width = stripWidth + "px";
        strip.style.overflow = "hidden";

        //Creating an image variable to insert the textures to the game.
        var img = new Image();
        //Importing the walls texturing.
        img.src = ("src/assets/walls.png");
        //Positioning the walls.
        img.style.position = "absolute";
        //Previous styling.
        img.prevStyle = {
            height: 0,
            width: 0,
            top: 0,
            left: 0
        }
        //Adding the image to the strip;
        strip.appendChild(img);
        strip.img = img;
        
        //Fog addition to the game to create the illusion of depth.
        var fog = document.createElement("span");
        //Positioning the fog.
        fog.style.position = "absolute";
        //Adding the fog to the strip.
        strip.appendChild(fog);
        strip.fog = fog;
        
        //Adding the strips to the screen array.
        screenStrips.push(strip);
        screen.appendChild(strip);
    }
}

//Variables for the game.
var screenWidth = 1024;                                   // Screen res
var screenHeight = 768;                                   // Screen res
var screenStrips = [];                                    // Wall types list
var numoftex = 33;                                        // Number of different wall types
var stripWidth = 2;                                       // Wall type is made from 2 pictures
var fov = 80 * Math.PI / 180;                             // Field of view
var numofrays = Math.ceil(screenWidth / stripWidth);      // Number of rays cast by player
var viewDist = (screenWidth / 2) / Math.tan((fov / 2));   // The distance the player can see

// Set and update the ceiling picture
function updateBackground(){
    var ceiling = $("ceiling");
    ceiling.style.backgroundPosition = -200 * player.rotation + "px " + "100%";
}

//Casting ray function for the player.
castRays = function (){
    var stripIdx = 0;
    for (var i = 0; i < numofrays; i++)
     {
        var rayScreenPos = (-numofrays / 2 + i) * stripWidth;                           // Ray go through screen position
        var rayViewDist = Math.sqrt(rayScreenPos * rayScreenPos + viewDist * viewDist); // Distance from viewer to object on screen
        var rayAngle = Math.asin(rayScreenPos / rayViewDist);                           // Angle relative to the viewing direction a = sin(x) * c

        castRay( // Add the player's viewing direction
            player.rotation + rayAngle,
            stripIdx++
        );
    }
}

//Casting rays with a given angle and strip ID.
castRay = function (rayAngle, stripIdx){
    rayAngle %= Math.PI * 2;
    if (rayAngle < 0) rayAngle += Math.PI * 2;                                        // Add the players viewing direction
    var right = (rayAngle > Math.PI * 2 * 0.75 || rayAngle < Math.PI * 2 * 0.25);     // Moving right/left/up/down depends by angle
    var up = (rayAngle < 0 || rayAngle > Math.PI);
    var wallType = 0;
    var angleSin = Math.sin(rayAngle);
    var angleCos = Math.cos(rayAngle);

    var distance = 0;	// The distance to the block we hit
    var xHit = 0;   	// The x of where the ray hit the block
    var yHit = 0;       // The y of where the ray hit the block

    var textureX;	// The x on the texture
    var wallX;	    // The x of the block
    var wallY;      // The y of the block

    var shadow;     // Vertical walls shadowed

    // Check vertical wall lines by moving across edge of the block 
    // We're standing in then moving in 1 map unit steps horizontally
    // Move vertically is determined by the slope of the ray

    var slope = angleSin / angleCos; 	// The slope made by the ray
    var dXVer = right ? 1 : -1; 	    // Move left or right
    var dYVer = dXVer * slope; 	        // How much to move up or down

    // Starting horizontal position, at one of the edges of the current map block
    var x = right ? Math.ceil(player.x) : (player.x) >> 0;
    // Starting vertical position, add the horizontal step we made * slope
    var y = player.y + (x - player.x) * slope;

    while (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight){
        wallX = (x + (right ? 0 : -1)) >> 0;
        wallY = (y) >> 0;

        if (spritePosition[wallY][wallX] && !spritePosition[wallY][wallX].visible) {
            spritePosition[wallY][wallX].visible = true;
        }

        if (map[wallY][wallX] > 0){
            var distX = x - player.x;
            var distY = y - player.y;
            distance = distX * distX + distY * distY;

            wallType = map[wallY][wallX];           // Type of wall
            textureX = y % 1;	                    // Where on the wall
            if (!right) textureX = 1 - textureX;    // Texture reversed on left side

            xHit = x;	// x,y of the hit to draw the rays on minimap.
            yHit = y;
            shadow = true;
            break;
        }
        x += dXVer;
        y += dYVer;
    }

    // Once we hit a map block, we check if there is found one in the vertical turn. 
    // We'll know that if distance !=0 -> we only register this hit if the distance is smaller.
    slope = angleCos / angleSin;
    var dYHor = up ? -1 : 1;
    var dXHor = dYHor * slope;
    y = up ? (player.y) >> 0 : Math.ceil(player.y);
    x = player.x + (y - player.y) * slope;

    while (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight) {
        wallY = (y + (up ? -1 : 0)) >> 0;
        wallX = (x) >> 0;

        if (spritePosition[wallY][wallX] && !spritePosition[wallY][wallX].visible) {
            spritePosition[wallY][wallX].visible = true;
        }


        if (map[wallY][wallX] > 0) {
            var distX = x - player.x;
            var distY = y - player.y;
            var blockDist = distX * distX + distY * distY;
            if (!distance || blockDist < distance) {
                distance = blockDist;
                xHit = x;
                yHit = y;

                wallType = map[wallY][wallX];
                textureX = x % 1;
                if (up) textureX = 1 - textureX;
                shadow = false;
            }
            break;
        }
        x += dXHor;
        y += dYHor;
    }

    if (distance){
        var strip = screenStrips[stripIdx];
        distance = Math.sqrt(distance);
        // Fish eye fix
        // distorted_dist = correct_dist / cos(relative_angle_of_ray)
        distance = distance * Math.cos(player.rotation - rayAngle);
        // calc position, height and width of the wall strip
        var height = Math.round(viewDist / distance);
        // stretch the texture to a factor to make it fill the strip correctly
        var width = height * stripWidth;
        // Since everything is centered on the x, move it half 
        // Way down the screen and then half the wall height back up.
        var top = Math.round((screenHeight - height) / 2);
        var texX = Math.round(textureX * width);
        var prevStyle = strip.img.prevStyle;

        if (texX > width - stripWidth)
            texX = width - stripWidth;
        texX += (shadow ? width : 0);

        strip.style.height = height + "px";
        strip.style.top = top + "px";
        strip.style.zIndex = height >> 0;

        if (prevStyle.height != (height * numoftex) >> 0) {
            strip.img.style.height = (height * numoftex) >> 0 + "px";
            prevStyle.height = (height * numoftex) >> 0;
        }
        if (prevStyle.width != (width * 2) >> 0) {
            strip.img.style.width = (width * 2) >> 0 + "px";
            prevStyle.width = (width * 2) >> 0;
        }
        if (prevStyle.top != -(height * (wallType - 1)) >> 0) {
            strip.img.style.top = -(height * (wallType - 1)) >> 0 + "px";
            prevStyle.top = -(height * (wallType - 1)) >> 0;
        }
        if (prevStyle.left != -texX) {
            strip.img.style.left = -texX + "px";
            prevStyle.left = -texX;
        }
        strip.fog.style.height = height >> 0 + "px";
        strip.fog.style.width = (width * 2) >> 0 + "px";
        strip.fog.style.background = "rgba(0,0,0," + distance / 10 + ")";
    }
    drawRay(xHit, yHit);
}