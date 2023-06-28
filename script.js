const pixel = {
    height: 25,
    width: 25
}

//--------------------------CANVAS DECLARATION---------------------------
const canvas = document.querySelector('canvas');
canvas.style.backgroundColor = '#d2d0d0';
canvas.width = pixel.width*17; //425px
canvas.height = pixel.height*22; //550px
canvas.style.border = '5px solid lightgray'
//--------------------------CANVAS DECLARATION---------------------------


//---------------------------CANVAS DIMENSIONS---------------------------
console.log(`Canvas width: ${canvas.width}px`);
console.log(`Canvas height: ${canvas.height}px`);
console.log(`Canvas playing area is ${canvas.width/pixel.width} x ${canvas.height/pixel.height} \neach pixel is 25px x 25px`)
//---------------------------CANVAS DIMENSIONS---------------------------


//----------------------------CANVAS CONTEXT-----------------------------
const c = canvas.getContext('2d');
//----------------------------CANVAS CONTEXT-----------------------------


//-----------------------------PLAYER CLASS------------------------------
class Player{
    constructor (){
        this.height = pixel.height;
        this.width = pixel.width;
        this.x = Math.floor((canvas.width/2)-(pixel.width/2));
        this.y = canvas.height-pixel.height*2;
        this.dx = 0;
        this.dy = 0;
        this.bulletsArr = [];
        this.bulletHeight = 5;
        this.bulletWidth = 2;
        this.bulletY = this.y-this.bulletHeight
        this.bulletVelocity = 0;
    }

    draw(){
        c.fillStyle='black';
        c.fillRect(this.x, this.y, this.width, this.height);
    }
    bulletDraw(){
        c.fillStyle='red';
        c.fillRect(this.x+this.width/2,this.bulletY,this.bulletWidth,this.bulletHeight);
    }
    // bulletUpdate(){
    //     this.bulletDraw();
    //     while(this.bulletsArr.length>0){
    //         this.bulletY += this.bulletVelocity;
    //     }
    // }
}
//-----------------------------PLAYER CLASS------------------------------


//---------------------------PLAYER1 INSTANCE----------------------------
const player1 = new Player();
//---------------------------PLAYER1 INSTANCE----------------------------


//---------------------------ANIMATE FUNCTION----------------------------
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
    player1.draw();
    // player1.bulletUpdate()
}
animate();
//---------------------------ANIMATE FUNCTION----------------------------


//---------------------------EVENT LISTENERS-----------------------------
document.addEventListener('keydown', function(event){
    if (event.key === 'ArrowLeft' && player1.x > 0){
        player1.x -= pixel.width;
    }
    else if (event.key === 'ArrowRight' && (player1.x+player1.width)<canvas.width){
        player1.x += pixel.width;
    }
    // else if (event.key === ' '){
    //     console.log('space')
    //     player1.bulletsArr.push('Bullet');
    //     player1.bulletVelocity = -5;
    // }
});

document.addEventListener('keyup', function(event){
    if (event.key === 'ArrowLeft'){
        player1.dx = 0;
    }
    else if (event.key === 'ArrowRight'){
        player1.dx = 0;
    }
})
//---------------------------EVENT LISTENERS-----------------------------






















// console.log(c);
// console.log(canvas);

// //creates a rectangle c.fillRect(xPosition,yPosition,width,height)
// //.fillStyle = 'color'; is the fill color for shapes
// let color = 'red'
// c.fillStyle = color;
// const rect1 = c.fillRect(10,10,50,50)
// c.fillStyle = 'rgba(0,0,255,0.5)'
// const rect2 = c.fillRect(100,10,50,50)
// c.fillStyle = 'rgba(0,255,0,0.5)'
// const rect3 = c.fillRect(140,110,50,90)

//-----------------------CREATING A LINE-------------------------------
// c.beginPath()

// //.moveTo(x,y) is the starting position
// c.moveTo(300,300);

// //.lineTo(x,y) is the ending position for a line
// //-- can keep adding to the line
// c.lineTo(500,100);
// c.lineTo(600,300);

// //color of the stroke
// c.strokeStyle = 'red'

// //.stroke is the method to color in the line
// c.stroke();
//-----------------------CREATING A LINE-------------------------------

//---------------------------------------------------------------------
//---------------------------------------------------------------------

//-----------------------CREATING A CIRCLE-----------------------------

//.arc(xPosition, yPosition, radius, startAngle(radians)[what angle to start drawing arc], endAngle(radians)[how long arc to go for],drawCounterClockWise(boolean))
// for(let i = 0; i<100; i++){
//     let redVal = Math.floor(Math.random()*255);
//     let greenVal = Math.floor(Math.random()*255);
//     let blueVal = Math.floor(Math.random()*255);
//     let opaVal = Number((Math.random()+.5).toFixed(2));
//     let x = Math.random()*window.innerWidth;
//     let y = Math.random()*window.innerHeight;
//     let radius = (Math.random()*20)+20;
//     c.beginPath();
//     c.arc(x, y, radius, 0, Math.PI*2,false);
//     c.strokeStyle= `rgba(${redVal},${greenVal},${blueVal},${opaVal}`;
//     c.stroke();
//     console.log(redVal,greenVal,blueVal,opaVal);
// }

//-----------------------CREATING A CIRCLE-----------------------------

//---------------------------------------------------------------------
//---------------------------------------------------------------------

//----------------------------ANIMATE----------------------------------

// let x = 200;
// let y = 200;
// let dx = 2;
// let dy = 2;
// let radius = 30;

// function animate(){
//     requestAnimationFrame(animate);
//     c.clearRect(0,0,innerWidth,innerHeight);

//     c.beginPath();
//     c.arc(x,y,radius,0,Math.PI*2,false);
//     c.strokeStyle = 'blue';
//     c.stroke();

//     if (x + radius > innerWidth || x - radius < 0){
//         dx = -dx;
//     }

//     if (y+radius > innerHeight || y-radius <0){
//         dy= -dy;
//     }
//     x+=dx;
//     y+=dy;
// }
// animate();

// document.addEventListener('mousemove',function(event){
//     let mousePos = {};
//     mousePos.x = event.clientX;
//     mousePos.y = event.clientY;
//     console.log(mousePos);
// })