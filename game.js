let score = 0;

let gameStarted = false;

let baskets = [];



const game =
document.getElementById("game");


const cat =
document.getElementById("cat");


const scoreText =
document.getElementById("score");


const basketContainer =
document.getElementById("basketContainer");


const startScreen =
document.getElementById("startScreen");


const startBtn =
document.getElementById("startBtn");


const letter =
document.getElementById("letter");




// =====================
// START GAME
// =====================


startBtn.onclick = function(){


    startScreen.style.display = "none";


    gameStarted = true;


    createBaskets(3);


};






// =====================
// CREATE 3 BASKETS
// =====================


function createBaskets(amount){


    for(let i=0;i<amount;i++){


        let basket =
        document.createElement("img");


        basket.src =
        "assets/basket.png";


        basket.className =
        "basket";



        basketContainer.appendChild(
            basket
        );



        moveBasket(
            basket
        );



        baskets.push(
            basket
        );



        startBasketMovement(
            basket
        );


    }


}







// =====================
// RANDOM BASKET POSITION
// =====================


function moveBasket(basket){


    let x =
    Math.random()*420;



    let y =
    Math.random()*250 + 50;



    basket.style.left =
    x+"px";



    basket.style.top =
    y+"px";


}






// =====================
// BASKET MOVEMENT
// =====================


function startBasketMovement(basket){


    setInterval(()=>{


        if(gameStarted){


            moveBasket(
                basket
            );


        }


    },
    2000 + Math.random()*1500);


}








// =====================
// THROW HEART
// =====================


game.addEventListener(
"pointerdown",
function(e){



    if(!gameStarted)
        return;



    let rect =
    game.getBoundingClientRect();



    let targetX =
    e.clientX - rect.left;



    let targetY =
    e.clientY - rect.top;




    let startX =
    cat.offsetLeft +
    cat.width/2;



    let startY =
    cat.offsetTop;





    let dx =
    targetX-startX;



    let dy =
    targetY-startY;




    let distance =
    Math.sqrt(
        dx*dx+
        dy*dy
    );



    let speed = 8;



    let vx =
    dx/distance*speed;



    let vy =
    dy/distance*speed;




    createHeart(
        startX,
        startY,
        vx,
        vy
    );


});









// =====================
// CREATE HEART
// =====================


function createHeart(
x,
y,
vx,
vy
){



    let heart =
    document.createElement("img");



    heart.src =
    "assets/heart.png";



    heart.className =
    "heart";



    game.appendChild(
        heart
    );



    let posX=x;

    let posY=y;



    let flying =
    setInterval(()=>{


        posX += vx;


        posY += vy;




        heart.style.left =
        posX+"px";



        heart.style.top =
        posY+"px";





        checkCatch(
            heart,
            flying
        );






        // missed


        if(

            posX < -50 ||

            posX > 550 ||

            posY < -50 ||

            posY > 550

        ){



            clearInterval(
                flying
            );



            heart.remove();



            changeScore(
                -1
            );



            showFloat(
                "-1 💔"
            );


        }



    },20);


}








// =====================
// CHECK BASKETS
// =====================


function checkCatch(
heart,
flying
){



    let h =
    heart.getBoundingClientRect();




    baskets.forEach(
    basket=>{



        let b =
        basket.getBoundingClientRect();





        if(


            h.right > b.left &&

            h.left < b.right &&

            h.bottom > b.top &&

            h.top < b.bottom



        ){



            clearInterval(
                flying
            );



            heart.remove();




            changeScore(
                1
            );



            showFloat(
                "+1 ❤️"
            );




            // move only this basket


            basket.style.transform =
            "scale(0)";



            setTimeout(()=>{


                moveBasket(
                    basket
                );


                basket.style.transform =
                "scale(1)";



            },300);



        }



    });



}








// =====================
// SCORE
// =====================


function changeScore(value){



    score += value;



    if(score < 0){

        score = 0;

    }



    scoreText.innerHTML =
    score;




    if(score >= 100){



        setTimeout(()=>{


            letter.style.display =
            "flex";



        },500);



    }


}








// =====================
// FLOAT MESSAGE
// =====================


function showFloat(text){



    let message =
    document.createElement("div");



    message.className =
    "floatText";



    message.innerHTML =
    text;



    message.style.left =
    "220px";



    message.style.top =
    "250px";



    game.appendChild(
        message
    );



    setTimeout(()=>{


        message.remove();



    },1000);



}
