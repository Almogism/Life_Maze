//Variables for each purchase being made.
let purchase1 = false;
let canBuy = false;
let purchase2 = false;
let purchase3 = false;
let purchase4 = false;
let purchase5 = false;
let purchase6 = false;

let playerMoney = 500;

//Update the money element in the shop.
function updateMoney(){
    var money = $("money");
    money.innerHTML = " " + playerMoney;
}

//Add more money to the player.
function changeMoney(increment=0){
    playerMoney += increment;
    updateMoney();
}

//Change shop text
function insertItems(item2="",item3="",item4="",item5="",item6=""){
    $('item2').innerHTML=item2;
    $('item3').innerHTML=item3;
    $('item4').innerHTML=item4;
    $('item5').innerHTML=item5;
    $('item6').innerHTML=item6;
}

//Buying shoes in the item shop. (item 1).
function buyShoes(){
    var money = $("money");
    var shoes = $("item1");
    if (!purchase1){
        if (playerMoney >= 1000){
            originalPlayerSpeed = 0.4;
            player.moveSpeed = originalPlayerSpeed;
            changeMoney(-1000);
            purchase1 = true;
        }
        else{
            setTimeout(() => {
                money.style.color = "red";
                setTimeout(() => {
                    money.style.color = "black";
                    setTimeout(() => {
                        money.style.color = "red";
                        setTimeout(() => {
                            money.style.color = "black";
                        }, 100);
                    }, 100);
                }, 100);
            }, 100);
        }
    }
    else {
        shoes.innerHTML = "כבר קנית את המוצר הזה!";
        setTimeout(() => {
            shoes.innerHTML = "נעליים טובות יותר";
        }, 1500);
    }
}

//Buying a broom in the item shop. (item 2).
function buyBroom(){
    var money = $("money");
    var broom = $("item2");
    if (canBuy){
        if (!purchase2){
            if (playerMoney >= 1000){
                purchase2 = true;
                deleteSprites();
                initSprites(24);
                changeMoney(-1000);
            }
            else{
                setTimeout(() => {
                    money.style.color = "red";
                    setTimeout(() => {
                        money.style.color = "black";
                        setTimeout(() => {
                            money.style.color = "red";
                            setTimeout(() => {
                                money.style.color = "black";
                            }, 100);
                        }, 100);
                    }, 100);
                }, 100);
            }
        }
        else {
            broom.innerHTML = "כבר קנית את המוצר הזה!";
            setTimeout(() => {
                broom.innerHTML = "מטאטא";
            }, 1500);
        }
    }
    else {
        broom.innerHTML = "תמתין תמתין יא נקניק"
            setTimeout(() => {
                broom.innerHTML = "???";
            }, 1500);
    }
}

//Buying a wrench in the item shop. (item 3).
function buyWrench(){
    var money = $("money");
    var wrench = $("item3");
    if (canBuy){
        if (!purchase3){
            if (playerMoney >= 1000){
                purchase3 = true;
                deleteSprites();
                initSprites(24);
                changeMoney(-1000);
            }
            else{
                setTimeout(() => {
                    money.style.color = "red";
                    setTimeout(() => {
                        money.style.color = "black";
                        setTimeout(() => {
                            money.style.color = "red";
                            setTimeout(() => {
                                money.style.color = "black";
                            }, 100);
                        }, 100);
                    }, 100);
                }, 100);
            }
        }
        else {
            wrench.innerHTML = "כבר קנית את המוצר הזה!";
            setTimeout(() => {
                wrench.innerHTML = "מפתח צינורות";
            }, 1500);
        }
    }
    else {
        wrench.innerHTML = "תמתין תמתין יא נקניק"
            setTimeout(() => {
                wrench.innerHTML = "???";
            }, 1500);
    }
}

//Buying pictures in the item shop. (item 4).
function buyPictures(){
    var money = $("money");
    var pictures = $("item4");
    if (canBuy){
        if (!purchase4){
            if (playerMoney >= 1000){
                purchase4 = true;
                map24[12][8] = 55; map24[5][13] = 56; map24[10][15] = 57;
                changeMoney(-1000);
            }
            else{
                setTimeout(() => {
                    money.style.color = "red";
                    setTimeout(() => {
                        money.style.color = "black";
                        setTimeout(() => {
                            money.style.color = "red";
                            setTimeout(() => {
                                money.style.color = "black";
                            }, 100);
                        }, 100);
                    }, 100);
                }, 100);
            }
        }
        else {
            pictures.innerHTML = "כבר קנית את המוצר הזה!";
            setTimeout(() => {
                pictures.innerHTML = "תמונות לדירה";
            }, 1500);
        }
    }
    else {
        pictures.innerHTML = "תמתין תמתין יא נקניק"
            setTimeout(() => {
                pictures.innerHTML = "???";
            }, 1500);
    }
}

//Buying an oven in the item shop. (item 5).
function buyOven(){
    var money = $("money");
    var oven = $("item5");
    if (canBuy){
        if (!purchase5){
            if (playerMoney >= 1000){
                purchase5 = true;
                map24[5][8] = 7;
                map24[5][7] = 12;
                changeMoney(-1000);
            }
            else{
                setTimeout(() => {
                    money.style.color = "red";
                    setTimeout(() => {
                        money.style.color = "black";
                        setTimeout(() => {
                            money.style.color = "red";
                            setTimeout(() => {
                                money.style.color = "black";
                            }, 100);
                        }, 100);
                    }, 100);
                }, 100);
            }
        }
        else {
            oven.innerHTML = "כבר קנית את המוצר הזה!";
            setTimeout(() => {
                oven.innerHTML = "תנור לדירה";
            }, 1500);
        }
    }
    else {
        oven.innerHTML = "תמתין תמתין יא נקניק"
            setTimeout(() => {
                oven.innerHTML = "???";
            }, 1500);
    }
}

//Buying furnitue in the item shop. (item 6).
function buyFurniture(){
    var money = $("money");
    var furniture = $("item6");
    if (canBuy){
        if (!purchase6){
            if (playerMoney >= 1000){
                purchase6 = true;
                deleteSprites();
                initSprites(24);
                changeMoney(-1000);
            }
            else{
                setTimeout(() => {
                    money.style.color = "red";
                    setTimeout(() => {
                        money.style.color = "black";
                        setTimeout(() => {
                            money.style.color = "red";
                            setTimeout(() => {
                                money.style.color = "black";
                            }, 100);
                        }, 100);
                    }, 100);
                }, 100);
            }
        }
        else {
            furniture.innerHTML = "כבר קנית את המוצר הזה!";
            setTimeout(() => {
                furniture.innerHTML = "תנור לדירה";
            }, 1500);
        }
    }
    else {
        furniture.innerHTML = "תמתין תמתין יא נקניק"
            setTimeout(() => {
                furniture.innerHTML = "???";
            }, 1500);
    }
}