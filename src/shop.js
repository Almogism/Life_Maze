let purchase1 = false;
let purchase2 = false;
let purchase3 = false;
let purchase4 = false;
let purchase5 = false;

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

//Buying shoes in the item shop. (item 1).
function increaseSpeed(){
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
