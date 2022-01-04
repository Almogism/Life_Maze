//Freeze player for transitions and events.
function freezePlayer(){
    player.moveSpeed = 0;
    player.rotationSpeed=0;
    player.direction=0;
    player.vertical=0;
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
let flag= false;
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
let temp2 = false; //temporary for bituach leumi coonversation.
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
    if (!mission11 && playerBetween(14,15,2,3)){
        mission11 = true;
        freezePlayer();
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

    if (mission11 && !mission12 && playerBetween(8,9,14,15)){
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
    if (mission12 && !mission13 && playerBetween(12.3,13.7,15.3,16.6)){
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
                                        }).then((result)=>{
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
                                                       flag = true;
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
    }
    if (flag && mission13 && !mission14 && playerBetween(16.5,17.5,15,16)){
        flag = false;
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
    if (mission22 && !mission23 && playerBetween(11,12,8,10)){
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
    if (mission23 && !mission24 && playerBetween(11,15,2,4.5) && (player.rotation > 5.7 || player.rotation < 0.8)){
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
                            flag = true;
                        }
                    })
                }, 2000);
            }
        })
        setTimeout(() => {
            resetPlayer();
        }, 2000);
    }
    if (flag && mission24 && !mission25 && playerBetween(12,13,2.5,3.5)){
        mission25 = true;
        switchLevels(24);
    }
    if (temp && !temp2 && playerBetween(11,12,4,5)){
        temp2 = true;
        freezePlayer();
        Swal.fire({  
            allowOutsideClick: false, 
            title: 'שיחה עם ביטוח לאומי',
            text: '?שלום, אני חנה, פקידה בביטוח לאומי, איך אפשר לעזור',
            imageUrl: 'https://www.israelhayom.co.il/sites/default/files/styles/566x349/public/images/articles/2020/07/09/15942940756571_b.jpg',
            imageWidth: 200,
            imageHeight: 150,  
            showDenyButton: true,
            confirmButtonText: 'השתחררתי לפני חודש ואני קצת מבולבל',  
            denyButtonText: `רציתי לקבל מידע רלוונטי עבור חיילים משוחררים`,
        }).then((result) => {
            if ((result.isConfirmed) ||  (result.isDenied)){
                Swal.fire({
                    allowOutsideClick: false, 
                    title: '2 שיחה עם ביטוח לאומי',
                    text: 'אוקיי, אז דבר ראשון אני שמחה שהגעת אלינו וברכותיי על השחרור ויציאתך לאזרחות. אחד הדברים שמגיעים לך מאיתנו הוא פטור של חודשיים מתשלום ביטוח לאומי וביטוח בריאות אם שירתת לפחות 75% משירות החובה שלך',
                    imageUrl: 'https://www.israelhayom.co.il/sites/default/files/styles/566x349/public/images/articles/2020/07/09/15942940756571_b.jpg',
                    imageWidth: 200,
                    imageHeight: 150,  
                    showDenyButton: true,
                    confirmButtonText: '!אשכרה',  
                    denyButtonText: `?מגניב, יש אפילו עוד הטבות`,
                }).then((result) => {
                    if ((result.isConfirmed) ||  (result.isDenied)){
                        Swal.fire({
                            allowOutsideClick: false, 
                            title: '3 שיחה עם ביטוח לאומי',
                            text: 'בנוסף מגיע לך פטור מארנונה לתקופה של 4 חודשים על שטח של 70 מ"ר מהדירה. וגם אתה מקבל הטבות מס למשך 3 שנים בגובה של 432 שקלים לחודש. אגב, תבדוק את מענק השחרור והפקדון שקיבלת, הכסף הזה יעזור לך לסגור את החודש בתחילת דרכך',
                            imageUrl: 'https://www.israelhayom.co.il/sites/default/files/styles/566x349/public/images/articles/2020/07/09/15942940756571_b.jpg',
                            imageWidth: 200,
                            imageHeight: 150,  
                            showDenyButton: true,
                            confirmButtonText: '!מאוד כלכלי להתגייס',  
                            denyButtonText: `?נהדר! עוד משהו שלדעתך אני צריך לדעת`,
                        }).then((result) => {
                            if ((result.isConfirmed) ||  (result.isDenied)){
                                Swal.fire({
                                    allowOutsideClick: false, 
                                    title: '4 שיחה עם ביטוח לאומי',
                                    text: 'חשוב מאוד להירשם לקופת חולים אם אתה עדיין לא רשום לאחת ולבדוק מול הבנק שלך את אופן ניהול חשבונך. אני בטוחה שיש להם מסלולי חיילים ללא עמלות שמאוד יתאימו לך. אה! ומיד אחרי שאתה מסיים פה אני ממליצה לך ללכת לקרן להכוונת חיילים של משרד הביטחון, הם יעזרו עם כל עניין שקשור להכוונת תעסוקה, מלגות וייעוץ שמאוד יועיל לך',
                                    imageUrl: 'https://www.israelhayom.co.il/sites/default/files/styles/566x349/public/images/articles/2020/07/09/15942940756571_b.jpg',
                                    imageWidth: 200,
                                    imageHeight: 150,  
                                    showDenyButton: true,
                                    confirmButtonText: '!תודה רבה לך חנה',  
                                    denyButtonText: `!שיהיה לך יום מרנין`,
                                }).then((result) => {
                                        if ((result.isConfirmed) ||  (result.isDenied)){
                                        Swal.fire({
                                            allowOutsideClick: false, 
                                            icon: 'success',
                                            title: 'ביטוח לאומי דווקא סבבה',
                                            text: 'קיבלתי את המענק שחרור! אני צריך לחזור לדירה שלי עכשיו כדי לנקות ולרהט קצת. אחרי שאסיים שם אקפוץ לקרן להכוונת חיילים כמו שחנה אמרה',
                                            confirmButtonText:'אני עשיררר'
                                        }).then((result)=>{
                                            if (result.isConfirmed){                                        
                                                resetPlayer();}
                                            })
                                        }
                                })
                            }
                        })
                    }

                })
            }
        });
    }
    //This is the havit
    if (!temp && player.x <1.5 && player.y >16){
        temp = true; //this is temporary you wanker
        switchLevels(24);
        mission25 = true;
        insertItems("מטאטא","מפתח צינורות","תמונה לקיר","תנור לדירה","רהיטים לדירה")
    }



    
    if (!temp2 && playerBetween(14,15,10,12)){
        freezePlayer();
        temp2 = true;

        Swal.fire({  
            allowOutsideClick: false, 
            title: 'שיחה עם הקרן להכוונת חיילים',
            text: 'אהלן אחי, מה המצב? אתה נראה כאילו השתחררת אתמול',
            imageUrl: 'https://videoandmarketing.co.il/wp-content/uploads/2017/02/%D7%94%D7%A7%D7%A8%D7%9F-%D7%94%D7%99%D7%97%D7%99%D7%93%D7%94-%D7%9C%D7%97%D7%99%D7%99%D7%9C%D7%99%D7%9D-%D7%9E%D7%A9%D7%95%D7%97%D7%A8%D7%A8%D7%99%D7%9D-%D7%9E%D7%A9%D7%AA%D7%97%D7%A8%D7%A8%D7%99%D7%9D-%D7%9E%D7%A6%D7%99%D7%A4%D7%95%D7%A8%D7%94.jpg',
            imageWidth: 200,
            imageHeight: 150,  
            showDenyButton: true,
            confirmButtonText: '?אני נראה עד כדי כך מבולבל',  
            denyButtonText: `...מצחיק מאוד`,
        }).then((result) => {
            if ((result.isConfirmed) ||  (result.isDenied)){
                Swal.fire({
                    allowOutsideClick: false, 
                    title: '2 שיחה עם הקרן להכוונת חיילים',
                    text: 'סתם סתם, קודם כל ברוך הבא לקרן להכוונת חיילים משוחררים של משרד הביטחון - המקפצה שלך  לאזרחות! אנחנו פה כדי לעזור. נתחיל בעניין המלגות שמגיעות לך בתור משוחרר טרי',
                    imageUrl: 'https://videoandmarketing.co.il/wp-content/uploads/2017/02/%D7%94%D7%A7%D7%A8%D7%9F-%D7%94%D7%99%D7%97%D7%99%D7%93%D7%94-%D7%9C%D7%97%D7%99%D7%99%D7%9C%D7%99%D7%9D-%D7%9E%D7%A9%D7%95%D7%97%D7%A8%D7%A8%D7%99%D7%9D-%D7%9E%D7%A9%D7%AA%D7%97%D7%A8%D7%A8%D7%99%D7%9D-%D7%9E%D7%A6%D7%99%D7%A4%D7%95%D7%A8%D7%94.jpg',
                    imageWidth: 200,
                    imageHeight: 150,  
                    showDenyButton: true,
                    confirmButtonText: 'נווווווו',  
                    denyButtonText: `אני מקשיב`,
                }).then((result) => {
                    if ((result.isConfirmed) ||  (result.isDenied)){
                        Swal.fire({
                            allowOutsideClick: false, 
                            title: '3 שיחה עם הקרן להכוונת חיילים',
                            text: 'מבחינת מלגות יש 2 מלגות עיקריות שמגיעות לך. אם בחרת ללמוד במוסד אקדמי באיזור הפריפריה, מגיעה לך שנת לימודים ראשונה בחינם! בנוסף, אם שירתת בתור לוחם לדוגמא, אנחנו נממן לך שני שליש מסך כל התואר! דואגים לך פה',
                            imageUrl: 'https://videoandmarketing.co.il/wp-content/uploads/2017/02/%D7%94%D7%A7%D7%A8%D7%9F-%D7%94%D7%99%D7%97%D7%99%D7%93%D7%94-%D7%9C%D7%97%D7%99%D7%99%D7%9C%D7%99%D7%9D-%D7%9E%D7%A9%D7%95%D7%97%D7%A8%D7%A8%D7%99%D7%9D-%D7%9E%D7%A9%D7%AA%D7%97%D7%A8%D7%A8%D7%99%D7%9D-%D7%9E%D7%A6%D7%99%D7%A4%D7%95%D7%A8%D7%94.jpg',
                            imageWidth: 200,
                            imageHeight: 150,  
                            showDenyButton: true,
                            confirmButtonText: 'אני עדיין מרגיש קצת מודאג',  
                            denyButtonText: `?מגניב ממש, מה עם עניין התעסוקה למשל`,
                        }).then((result) => {
                            if ((result.isConfirmed) ||  (result.isDenied)){
                                Swal.fire({
                                    allowOutsideClick: false, 
                                    title: '4 שיחה עם הקרן להכוונת חיילים',
                                    text: 'אז חוץ מייעוץ תעסוקתי שאתה תמיד יכול לפנות אלינו לגביו, יש את נושא העבודה המועדפת. אם בשנה הראשונה לשחרור תבחר לעבוד בתחנת דלק, מלונות, מפעלים או תחומים מוכרים אחרים בתעשיה ותסיים 150 ימי עבודה בתוך שנתיים מהשחרור, תקבל מאיתנו מענק יפה של 9,500 ש"ח! אני מאחל לך המון הצלחה בהמשך ותמיד תוכל להתעדכן באתר האינטרנט שלנו לגבי עוד הטבות שמגיעות לך על שירות משמעותי למדינה',
                                    imageUrl: 'https://videoandmarketing.co.il/wp-content/uploads/2017/02/%D7%94%D7%A7%D7%A8%D7%9F-%D7%94%D7%99%D7%97%D7%99%D7%93%D7%94-%D7%9C%D7%97%D7%99%D7%99%D7%9C%D7%99%D7%9D-%D7%9E%D7%A9%D7%95%D7%97%D7%A8%D7%A8%D7%99%D7%9D-%D7%9E%D7%A9%D7%AA%D7%97%D7%A8%D7%A8%D7%99%D7%9D-%D7%9E%D7%A6%D7%99%D7%A4%D7%95%D7%A8%D7%94.jpg',
                                    imageWidth: 200,
                                    imageHeight: 150,  
                                    showDenyButton: true,
                                    confirmButtonText: 'איזה כיף! מתאים לי עבודה מועדפת',  
                                    denyButtonText: `!תודה רבה ויום מרנין`,
                                }).then((result) => {
                                        if ((result.isConfirmed) ||  (result.isDenied)){
                                        Swal.fire({
                                            allowOutsideClick: false, 
                                            icon: 'success',
                                            title: 'הקרן להכוונת חיילים משוחררים גם סבבה',
                                            text: 'קיבלתי המון מידע רלוונטי מהקרן להכוונת חיילים משוחררים, אני חושב שהגיע הזמן ללכת הביתה ולנוח קצת אחרי היום המשוגע הזה',
                                            confirmButtonText:'יאללה הבייתה'
                                        }).then((result)=>{
                                            if (result.isConfirmed){                                        
                                                resetPlayer();}
                                            })
                                        }
                                })
                            }
                        })
                    }

                })
            }
        });
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
                    }, 18000); }
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
                                            completeObjective(1);
                                            insertItems("מטאטא","מפתח צינורות","תמונות לדירה","תנור לדירה","רהיטים לדירה");
                                            canBuy = true;
                                            setTimeout(() => {
                                                Swal.fire({
                                                    allowOutsideClick: false, 
                                                    icon: 'warning',
                                                    title: '*SMS קיבלת*',
                                                    text: 'היי מתוקי, זאת אמא שלך מדברת. רציתי להזכיר לך כמה חשוב לקנות רהיטים לבית כדי שהוא יקבל סוף סוף צורה. איזה כיף שאתה עצמאי סוף סוף. יום טוב מתוקי, אוהבת',
                                                    confirmButtonText:'!יאללה רהיטים',
                                                }).then((result) => {
                                                    if (result.isConfirmed){
                                                        setTimeout(() => {

                                                            Swal.fire({
                                                                allowOutsideClick: false, 
                                                                icon: 'warning',
                                                                title: 'אני צריך ללכת לביטוח לאומי',
                                                                text: 'אמרו משהו על זה שמגיע הטבות למשוחררים טריים לא? שווה לקפוץ לביטוח לאומי לראות אם ההטבות שלהם שוות משהו',
                                                                confirmButtonText:'!יאללה לביטוח לאומי',
                                                            })
                                                        }, 15000);
                                                    }
                                                })
                                            }, 5000);
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

                    Swal.fire({
                        allowOutsideClick: false, 
                        imageUrl: 'https://www.smartdrive.co.il/sites/smart/UserContent/images/%D7%A2%D7%9C%D7%95%D7%9F%20%D7%9E%D7%A7%D7%A4%D7%A6%D7%94%20%D7%9C%D7%95%D7%91%D7%99%20%D7%92%D7%93%D7%95%D7%9C.jpg',
                        imageWidth: 200,
                        imageHeight: 130,
                        title: 'הקרן להכוונת חיילים משוחררים',
                        text: 'בביטוח לאומי אמרו לי ללכת לדבר עם נציגים של הקרן להכוונת חיילים על מנת לשמוע על הכוונת תעסוקה, מלגות, ייעוץ ואולי עוד ',
                        confirmButtonText:'בוא נחפש מישהו לדבר איתו',
                    }).then((result) => {
                        if (result.isConfirmed){
                            resetPlayer();
                        }
                    })
                }, 2000);
            }, 2000);
            break;
        case 4:
            break;
        default:
            break;
    }
}