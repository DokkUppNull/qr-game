let score = 0;


const game =
document.getElementById("game");


const basket =
document.getElementById("basket");


const button =
document.getElementById("throwBtn");


const scoreText =
document.getElementById("score");


const letter =
document.getElementById("letter");





// =====================
// Basket movement
// =====================


let basketX = 220;

let direction = 1;



setInterval(()=>{


    basketX += direction * 5;



    if(basketX >= 430){

        direction = -1;

    }



    if(basketX <= 10){

        direction = 1;

    }



    basket.style.left =
    basketX + "px";



},20);







// =====================
// Throw heart
// =====================


button.onclick=function(){

    throwHeart();

};








function throwHeart(){



    let heart =
    document.createElement("img");



    heart.src =
    "assets/heart.png";



    heart.className =
    "heart";



    heart.style.left =
    "240px";


    heart.style.top =
    "110px";



    game.appendChild(heart);



    let y = 110;



    let fall =
    setInterval(()=>{


        y += 4;



        heart.style.top =
        y + "px";



        checkCatch(
            heart,
            fall
        );




        if(y > 430){


            clearInterval(fall);


            heart.remove();


        }




    },20);



}








// =====================
// Catch check
// =====================


function checkCatch(heart,fall){



    let heartPos =
    heart.getBoundingClientRect();



    let basketPos =
    basket.getBoundingClientRect();





    if(

        heartPos.bottom >= basketPos.top &&

        heartPos.left < basketPos.right &&

        heartPos.right > basketPos.left


    ){


        clearInterval(fall);



        heart.remove();




        score++;



        scoreText.innerHTML =
        score;





        if(score===100){



            setTimeout(()=>{


                letter.style.display =
                "flex";


            },500);



        }



    }


}
