let playerMoney = 0;
let originalPlayerSpeed = 0.2;
//Freeze player for transitions and events.
function freezePlayer(){
    player.moveSpeed = 0;
    player.rotationSpeed=0;
    player.direction=0;
    player.vertical=0;
}
function increaseSpeed(){
    if (playerMoney > 1000){
        originalPlayerSpeed = 0.4;
        player.moveSpeed = originalPlayerSpeed;
        playerMoney -= 1000;
    }
    else{
        alert("fuck you.");
    }
}

function testAlert(){
    alert("wallak");
}

//Reset player movement to continue the game.
function resetPlayer(){
    player.moveSpeed = originalPlayerSpeed;
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
    $('objective1').style.textDecoration="none";
    $('objective2').innerHTML=obj2;
    $('objective2').style.textDecoration="none";
    $('objective3').innerHTML=obj3;
    $('objective3').style.textDecoration="none";
    $('objective4').innerHTML=obj4;
    $('objective4').style.textDecoration="none";
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
        // alert("Mom said I need to prepare some food.\nIt's just some chicken, how hard can it be?");

        Swal.fire({
            allowOutsideClick: false,  
            title: 'ארוחת ערב',
            text: '?אמא אמרה לחמם את העוף 40 דקות. כמה מסובך זה יכול להיות',
            imageUrl: 'https://previews.123rf.com/images/olegdudko/olegdudko1907/olegdudko190704407/128656393-raw-uncooked-chicken-fillet-against-white.jpg',
            imageWidth: 150,
            imageHeight: 150,  
            showDenyButton: true,  //showCancelButton: true,  
            confirmButtonText: `להפעיל את התנור על 200 מעלות`,  
            denyButtonText: `להפעיל את התנור על 400 מעלות`,
          }).then((result) => {  
              if ((result.isConfirmed) || (result.isDenied)) {    
                map[0][14] = 8;
                setTimeout(() => {
                    //alert("You've burnt the food.\nEven the dog is not impressed, guess we're eating pizza tonight.");
                    Swal.fire({
                        allowOutsideClick: false, 
                        title: 'אוי לא',
                        text: 'אני לא חושב שככה נראה עוף מוכן... אפילו הכלב לא רוצה לאכול אותו ',
                        confirmButtonText: 'אוף',
                        imageUrl: 'https://www.w-t-w.org/en/wp-content/uploads/2015/10/Are-we-going-to-be-burned-chicken.jpg',
                        imageWidth: 150,
                        imageHeight: 150,  
                    }).then((result) => {
                        if (result.isConfirmed){
                            map[0][14] = 7;
                            completeObjective(1);
                            resetPlayer();
                        }
                    })
                }, 2000);  
              }
          });
      }

    if (/*mission11 && */!mission12 && playerBetween(8,9,14,15)){
        mission12 = true;
        freezePlayer();
        Swal.fire({  
            allowOutsideClick: false, 
            title: 'לנקות את חדר העבודה',
            text: 'אבא ביקש ממני לנקות את הקירות בחדר. נראה לי שאפילו לא צריך אקונומיקה, נעביר עליהם מגבון ויהיה בסדר',
            imageUrl: 'https://www.sano.co.il/media/SA7290000288024.jpg',
            imageWidth: 150,
            imageHeight: 150,  
            showDenyButton: true,  //showCancelButton: true,  
            confirmButtonText: `ניגוב בתנועות סיבוביות`,  
            denyButtonText: `ניגוב בתנועות אנכיות`,
          }).then((result) => {  
              if ((result.isConfirmed) || (result.isDenied)) {    
                setTimeout(() => {
                    Swal.fire({
                        allowOutsideClick: false, 
                        icon: 'error',
                        title: '2 אוי לא',
                        text: 'כנראה שלא סתם אמרו להשתמש באקונומיקה. מרחתי את כל הלכלוך על הקירות ואבא לא הולך להיות מרוצה מהעניין',
                        confirmButtonText: '2 אוף',
                    }).then((result) => {
                        if (result.isConfirmed){
                            map[12][8] = 4; map[17][7] = 4; map[17][9] = 4; map[17][3] = 4;
                            map[17][4] = 4; map[17][5] = 4; map[17][6] = 4; map[17][8] = 4;          
                            map[17][8] = 4;
                            map[12][4] = 4;
                            map[12][7] = 4; map[12][9] = 4;
                            completeObjective(2);
                            resetPlayer();
                        }
                    })
                }, 2000);  
              }
          });
    }




    if (/*mission12 && */!mission13 && playerBetween(12,13,15,16)){
        freezePlayer();
        mission13 = true;
        Swal.fire({  
            allowOutsideClick: false, 
            title: 'שיחה עם השליח',
            text: 'שלום, מדבר השליח לגבי החבילה שהזמנתם. רציתי לברר באיזה שעה אתה פנוי לקבל את המשלוח',
            imageUrl: 'https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/Vd3bj2jPe/videoblocks-portrait-serious-man-having-phone-talk-at-street-close-up-of-angry-businessman-talking-on-smartphone-outdoors-young-business-man-walking-with-mobile-phone-office-employee-call-phone-outside_baui9chy8_thumbnail-1080_01.png',
            imageWidth: 200,
            imageHeight: 150,  
            showDenyButton: true,
            confirmButtonText: '.אני כל הזמן פנוי',  
            denyButtonText: `.שעה 19:00`,
        }).then((result) => {
            if ((result.isConfirmed) ||  (result.isDenied)){
                Swal.fire({
                    allowOutsideClick: false, 
                    title: '2 שיחה עם השליח',
                    text: 'אוקיי רשמתי... אני צריך עכשיו את תעודת הזהות של אחד ההורים לא כולל ספרת ביקורת',
                    imageUrl: 'https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/Vd3bj2jPe/videoblocks-portrait-serious-man-having-phone-talk-at-street-close-up-of-angry-businessman-talking-on-smartphone-outdoors-young-business-man-walking-with-mobile-phone-office-employee-call-phone-outside_baui9chy8_thumbnail-1080_01.png',
                    imageWidth: 200,
                    imageHeight: 150,  
                    showDenyButton: true,
                    confirmButtonText: '?מה זה ספרת ביקורת',  
                    denyButtonText: `.אני לא מוכן למסור מידע שכזה`,
                }).then((result) => {
                    if ((result.isConfirmed) ||  (result.isDenied)){
                        Swal.fire({
                            allowOutsideClick: false, 
                            title: '3 שיחה עם השליח',
                            text: 'לא משנה... *אנחה מזלזלת* תרצה לבוא לקחת את החבילה או שנשלח שליח אליך',
                            imageUrl: 'https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/Vd3bj2jPe/videoblocks-portrait-serious-man-having-phone-talk-at-street-close-up-of-angry-businessman-talking-on-smartphone-outdoors-young-business-man-walking-with-mobile-phone-office-employee-call-phone-outside_baui9chy8_thumbnail-1080_01.png',
                            imageWidth: 200,
                            imageHeight: 150,  
                            showDenyButton: true,
                            confirmButtonText: 'כן כן, אני רוצה לקחת',  
                            denyButtonText: `לא חושב שזאת תהיה בעיה אחי`,
                        }).then((result) => {
                            if ((result.isConfirmed) ||  (result.isDenied)){
                                Swal.fire({
                                    allowOutsideClick: false, 
                                    title: '4 שיחה עם השליח',
                                    text: 'אתה קצת מבלבל אותי, אני רושם שאתה מגיע לקחת, אנחנו נמצאים בגבעת רונן 7 באילת, המשך שבוע מרנין',
                                    imageUrl: 'https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/Vd3bj2jPe/videoblocks-portrait-serious-man-having-phone-talk-at-street-close-up-of-angry-businessman-talking-on-smartphone-outdoors-young-business-man-walking-with-mobile-phone-office-employee-call-phone-outside_baui9chy8_thumbnail-1080_01.png',
                                    imageWidth: 200,
                                    imageHeight: 150,  
                                    showDenyButton: true,
                                    confirmButtonText: '?מה זה מרנין',  
                                    denyButtonText: `רגעעעעעעעע`,
                                }).then((result) => {
                                        if ((result.isConfirmed) ||  (result.isDenied)){
                                        Swal.fire({
                                            allowOutsideClick: false, 
                                            icon: 'error',
                                            title: 'אוי לא 3',
                                            text: 'השליח ניתק ואתה נותרת עם בלבול רציני',
                                            confirmButtonText:'אוף 3'
                                        }).then((result)=>{                                        //resetPlayer();
                                            completeObjective(3);
                                            resetPlayer();
                                            setTimeout(() => {
                                                Swal.fire({
                                                    allowOutsideClick: false, 
                                                    icon: 'question',
                                                    title: 'ביי ביי',
                                                    text: 'אחרי שלא הצלחת לעמוד באף אחת מהמטלות הפשוטות שקיבלת, ההורים החליטו לגרש אותך מהבית כדי שתתחיל ללמוד איך מסתדרים לבד',
                                                    confirmButtonText:'!יאללה לחפש דירה חדשה'
                                                }).then((result) => {
                                                    if (result.isConfirmed){
                                                       insertObjective("לחפש דירה!"); 
                                                    }
                                                });
                                            }, 3000);})

                                        }
                                })
                            }
                        })
                    }

                })
            }
        });
        // mission13 = true;
        // freezePlayer();
        // playerChoice = prompt("bar hu piho?\nfor wrong press - n \n for right press - y");
        // if (playerChoice == 'y'){
        //     alert("you're correct.");
        //     freezePlayer();
        // }
        // else if (playerChoice == 'n'){
        //     alert("you're wrong.");
        //     freezePlayer();
        // }
        // else{
        //     alert("wrong input you dickhead");
        //     freezePlayer();
        // }
        // resetPlayer();
    }





    if (mission13 && !mission14 && playerBetween(16.5,17.5,15,16)){
        mission14 = true;
        switchLevels(21);
    }
    if (mission14 && !mission21 && playerBetween(10.5,11.5,9,10)){
        mission21 = true;
        Swal.fire({
            allowOutsideClick: false, 
            icon: 'error',
            title: '...אף פעם לא לוקחים את הדירה הראשונה',
            text: 'הדירה הזאת מלוכלכת ולא ראויה למגורי אדם',
            confirmButtonText:'!יאללה לחפש דירה חדשה'
        }).then((result) => {
            if (result.isConfirmed){
                switchLevels(22);
            }
        })
    }
    if (mission21 && !mission22 && playerBetween(17.5,18.5,9,10)){
        mission22 = true;
        Swal.fire({
            allowOutsideClick: false, 
            icon: 'error',
            title: '?פעם שלישית גלידה',
            text: '...אני בטוח בזה שהדירה המובטחת ממש מעבר לפינה',
            confirmButtonText:'!יאללה לחפש דירה חדשה'
        }).then((result) => {
            if (result.isConfirmed){
                switchLevels(23);
            }
        })
    }
    if (mission22 && !mission23 && playerBetween(11,12,8,9)){
        mission23 = true;
        freezePlayer();

        Swal.fire({
            allowOutsideClick: false, 
            title: 'מה קורה כאן',
            text: '???זה בית או מבוך',
            imageUrl: 'https://www.segment.co.il/wp-content/uploads/2016/12/ikea-logo-new-hero-1.jpg',
            imageWidth: 100,
            imageHeight: 100,
            confirmButtonText: 'מבוך',  
          }).then((result) => {
                if (result.isConfirmed){
                    resetPlayer();
                }
          })
    }
    if (mission23 && !mission24 && playerBetween(11,12,2,5) && (player.rotation > 5.5 || player.rotation < 0.8)){
        mission24 = true;
        freezePlayer();
        Swal.fire({
            allowOutsideClick: false, 
            title: 'משהו כאן לא בסדר',
            text: 'אני כמעט בטוח שהבית הזה לא מאה אחוז, בלי קשר לטפט',
            confirmButtonText: 'סיבוב נוסף',
        }).then((result) => {
            if (result.isConfirmed){
                resetPlayer();
                setTimeout(() => {
                    freezePlayer();
                    Swal.fire({
                        allowOutsideClick: false, 
                        imageUrl: 'https://img.favpng.com/13/12/2/tnt-bomb-explosive-material-dynamite-clip-art-png-favpng-L69x0r88qRxK4bZzzgunrHkff.jpg',
                        imageWidth: 100,
                        imageHeight: 100,
                        title: '!!!אמא',
                        text: '!הבית הזה יכול להתפוצץ בכל רגע',
                        confirmButtonText: 'לברוח על נפשך',
                    }).then((result) => {
                        if (result.isConfirmed){
                            resetPlayer();
                        }
                    })
                }, 2000);
            }
        })
        
        



        //alert("hmm, seems suspicious");


        setTimeout(() => {
            //alert("Okay, I think I need to get the hell out of here!!!!");
            //alert("Fuck this shit!!!");
            resetPlayer();
        }, 2000);
    }
    if (mission24 && !mission25 && playerBetween(12,13,2.5,3.5)){
        mission25 = true;
        switchLevels(24);
    }


    if (!temp && player.x <1.5 && player.y >16){
        temp = true; //this is temporary you wanker
        switchLevels(3);
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
            dimScreen();
            setTimeout(() => {
                relocatePlayer(8.3,9,0);
                deleteSprites();
                initSprites(21);
                map = map21;
                initScreen();
                drawMap();
                dedimScreen();
                Swal.fire({
                    allowOutsideClick: false, 
                    icon: 'warning',
                    title: 'דירה מספר אחת',
                    text: 'אחרי שחיפשתי קצת בפייסבוק הגעתי לדירה הראשונה שמצאתי. המחיר בעיקר משך אותי',
                    confirmButtonText:'!בוא נעשה סיבוב',
                }).then((result) => {
                    if (result.isConfirmed){
                        slowPanning();
                        setTimeout(() => {
                            Swal.fire({
                                allowOutsideClick: false, 
                                icon: 'warning',
                                title: 'איכס איכס איכס',
                                text: 'אין שום סיכוי בעולם שאני אגור בדירה כזאת',
                                showDenyButton: true, 
                                denyButtonText: `לדירה הבאה`,
                                confirmButtonText:'לדירה הבאה ומהר',
                            }).then((result) => {
                                if ((result.isConfirmed) || (result.isDenied)) {
                                    resetPlayer();}
                        });
                        }, 15000);
                    }
                });
            }, 2000);
            break;
        case 22:
            freezePlayer();
            dimScreen();
            setTimeout(() => {
                relocatePlayer(1.3,9,0);
                deleteSprites();
                initSprites(22);
                map = map22;
                initScreen();
                drawMap();
                dedimScreen();
                Swal.fire({
                    allowOutsideClick: false, 
                    icon: 'question',
                    title: 'דירה מספר שתיים',
                    text: 'הפעם ויתרתי על חיפוש בפייסבוק, דוד שלי הציע להשכיר את הדירה שלו במחיר מוזל',
                    confirmButtonText:'!בוא נעשה סיבוב',
                }).then((result) => {
                    if (result.isConfirmed){
                    slowWalking();
                    setTimeout(() => {
                        Swal.fire({
                            allowOutsideClick: false, 
                            icon: 'question',
                            title: 'אני קצת מפחד',
                            text: 'המקום הזה מלחיץ אותי ברמה אחרת, עם כל הכבוד לדוד שלי אני חייב לראות עוד דירות',
                            confirmButtonText: 'אני מרגיש שמישהו מסתכל עליי',
                          }).then((result) => {
                                if (result.isConfirmed){
                                    resetPlayer();
                                }
                          })
                    }, 15000); }
                })
            }, 2000);
            break;
        case 23:
            freezePlayer();
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
                    Swal.fire({
                        allowOutsideClick: false, 
                        icon: 'question',
                        title: 'דירה מספר שלוש',
                        text: 'הפעם קיבלתי המלצה מחבר על איש מבוגר שמשכיר את אחת הדירות שלו. חוץ מהטפט המזעזע אני לא חושב שמשהו פה הולך להפתיע אותי',
                        confirmButtonText:'!בוא נעשה סיבוב',
                    }).then((result) => {
                        if (result.isConfirmed){
                        resetPlayer();}
                })

                }, 2000);

            }, 2000);
            break;
        case 24:
            freezePlayer();
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
                    
                    setTimeout(() => {

                        Swal.fire({
                            allowOutsideClick: false, 
                            icon: 'question',
                            title: 'דירה מספר ארבע',
                            text: 'אז אחרי מחקר מעמיק בפייסבוק, ביד2 ובכל אתר אינטרנט שקשור לדירות, הגעתי לדירה משופצת במרכז העיר',
                            confirmButtonText:'!בוא נעשה סיבוב',
                        }).then((result) => {
                                if (result.isConfirmed){
                                    resetPlayer();
                                    setTimeout(() => {
                                    freezePlayer();
                                    Swal.fire({
                                        allowOutsideClick: false, 
                                        title: 'דווקא לא כזה נורא',
                                        text: '!חוץ מהלכלוך שצריך לנקות והנזילה בכיור אני חושב שזאת האחת',
                                        imageUrl: 'https://previews.123rf.com/images/kongvector/kongvector1712/kongvector171200808/91176035-mechanic-broom-character-cartoon-style-holding-a-wrench-vector-illustration.jpg',
                                        imageWidth: 130,
                                        imageHeight: 130,
                                        confirmButtonText:'!הידד',
                                    }).then((result) => {
                                        if (result.isConfirmed){
                                            resetPlayer();
                                        }
                                    })
                                    }, 10000);
                                }
                        })
                    }, 2000);
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
                    Swal.fire({
                        allowOutsideClick: false, 
                        title: 'ביטוח לאומי',
                        text: 'הבנתי שאחד המקומות הכי חשובים להגיע אליהם מיד לאחר השחרור הוא ביטוח לאומי',
                        imageUrl: 'https://upload.wikimedia.org/wikipedia/he/thumb/4/46/BituachLeumiLogo.svg/1280px-BituachLeumiLogo.svg.png',
                        imageWidth: 180,
                        imageHeight: 130,
                        confirmButtonText:'מקווה שהם יעשו לי קצת סדר בראש',
                    }).then((result) => {
                        if (result.isConfirmed){
                            resetPlayer();
                        }
                    })
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