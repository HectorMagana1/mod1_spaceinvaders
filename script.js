const unitArea = {
    width: 25,
    height: 25
};

const player1Points = document.querySelector('#player1-points');
const player1Button = document.querySelector('button#player1');
const timer = document.querySelector('#timer');
const message = document.querySelector('#message');

const canvas = document.querySelector('canvas');
canvas.style.backgroundImage = 'linear-gradient(gray, lightgray)';
canvas.width = unitArea.width*17;
canvas.height = unitArea.height*22;
const context = canvas.getContext('2d');

const playerShip = {
    xPosition: Math.floor(canvas.width/2-unitArea.width/2),
    yPosition: canvas.height-(2*unitArea.height),
    width: unitArea.width,
    height: unitArea.height,
    xPosChange: 25
}

let alienColumns = 4;
let alienRows = 3;
let bulletArr = [];
let alienArr =[];
let endOfTurn = false;
let endOfGame = false;
let alienCount = 0;
let playerPoints = 0;

let seconds = 30;
let bulletsShot = 0;

function animate(){
    requestAnimationFrame(animate);

    if(endOfGame === true){
        message.innerHTML = 'Game Over'
        return;
    }
    context.clearRect(0,0,canvas.width,canvas.height);

    drawPlayerShip(playerShip);
    updateAliens(alienArr);   
    updateBullet();
    nextLevel();
    player1Points.innerHTML = playerPoints;
    timer.innerHTML = seconds;
}

animate(); 



function drawPlayerShip(playerObject){
    context.fillStyle = 'black';
    context.fillRect(playerObject.xPosition, playerObject.yPosition, playerObject.width, playerObject.height);
}

function drawBullet(bulletObject){
    context.fillStyle = 'red';
    context.fillRect(bulletObject.xPosition,bulletObject.yPosition,bulletObject.width,bulletObject.height);
}

function updateBullet(){
    for (let i = 0; i<bulletArr.length; i++){
        bulletArr[i].yPosition += bulletArr[i].yVelocity;
        drawBullet(bulletArr[i]);

        //collision detection
        for (let j = 0; j < alienArr.length; j++) {
            if (bulletArr[i].hit===false && alienArr[j].hit===false && bulletArr[i].xPosition>alienArr[j].xPosition && 
                bulletArr[i].xPosition<alienArr[j].xPosition+alienArr[j].width &&
                bulletArr[i].yPosition<alienArr[j].yPosition+alienArr[j].height && 
                bulletArr[i].yPosition>alienArr[j].yPosition){
                alienArr[j].hit = true;
                bulletArr[i].hit = true;
                alienCount--;
                playerPoints += Math.floor(100+(alienArr[j].xPosition*.2)+(seconds*.2)-(bulletsShot*2));
            }
        }

        //clearing the bullet array as soon as bullet hits alien or off the canvas
        if (bulletArr[0].yPosition<0 || bulletArr[i].hit===true){
            bulletArr.shift();
        }
    }

}


function createAlienArray(columns, rows){
    for (let i = 0; i<columns; i++){
        for (let j = 0; j<rows; j++){
            let aliens = {
                xPosition: unitArea.width+(i*50),
                yPosition: unitArea.height+(j*50),
                width: unitArea.width,
                height: unitArea.height,
                velocity: 1,
                hit: false
            }
            alienArr.push(aliens);
        }
    }
    alienCount = alienArr.length;
}
createAlienArray(alienColumns,alienRows);

function updateAliens(alienArr){
    for(let i = 0; i<alienArr.length; i++){
        if (alienArr[i].hit === false){
            alienArr[i].xPosition += alienArr[i].velocity;

            if(alienArr[i].xPosition+alienArr[i].width>= canvas.width || alienArr[i].xPosition<=0){
                alienArr[i].yPosition +=25;
                alienArr[i].velocity *= -1;
                alienArr[i].xPosition += alienArr[i].velocity*2;
            }
            context.fillStyle='blue'
            context.fillRect(alienArr[i].xPosition,alienArr[i].yPosition,alienArr[i].width,alienArr[i].height)

        if (alienArr[i].yPosition>=playerShip.yPosition){
                endOfGame = true;
            }
        }
    }
}

function countDownClock (){
    if (seconds>0){
        seconds--;
    }
    else if (seconds<=0){
        endOfGame=true;
    }
}
setInterval(countDownClock,1000)

function nextLevel(){
    if (alienCount==0){
        alienColumns++
        alienRows++
        bulletArr=[];
        alienArr=[];
        createAlienArray(alienColumns,alienRows);    
    }
}

document.addEventListener('keydown',function(event){
    if (event.key === 'ArrowLeft' && playerShip.xPosition > 0){
        playerShip.xPosition -= playerShip.xPosChange;
    }
    else if (event.key === 'ArrowRight' && playerShip.xPosition+playerShip.width<canvas.width){
        playerShip.xPosition += playerShip.xPosChange;
    }
});

document.addEventListener('keyup',function(event){
    if (event.key === ' '){    
        let bullet = {
                xPosition: playerShip.xPosition +(playerShip.width/2-1.5),
                yPosition: playerShip.yPosition,
                width: 3,
                height: 5,
                yVelocity: -2,
                hit: false
            }
        bulletArr.push(bullet);
        bulletsShot++
    }
});
