const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const frictionDisplay = document.getElementById("friction");
const velocityXDisplay = document.getElementById("velocity_x");
const accelerationXDisplay = document.getElementById("acceleration_x");

const velocityYDisplay = document.getElementById("velocity_y");
const accelerationYDisplay = document.getElementById("acceleration_y");

let x = 100;
let y = 100;


let LEFT, UP, RIGHT, DOWN;
let velocity =4;
let friction =0.1;

frictionDisplay.innerText = friction;




const balls=[];

class Ball {
    constructor(x, y, r,acceleration) {
        this.x = x;
        this.y = y;
        this.vel_x=0;
        this.vel_y=0;
        this.acc_x=0;
        this.acc_y=0;
        this.acceleration = acceleration;
        this.r = r;
        this.isPlayer = false;
        balls.push(this)
    }

    drawBall() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = "red";
        ctx.fill();
    }


    display(){
        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x + this.acc_x *50, this.y + this.acc_y *100);
        ctx.strokeStyle = "green";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x+ this.vel_x *10, this.y + this.vel_y*10);
        ctx.strokeStyle = "blue";
        ctx.stroke();
    }

}


function keyControl(ball) {
    canvas.addEventListener('keydown', function (e) {
        //left
        if (e.keyCode === 37) {
            LEFT = true;
        }
        //up
        if (e.keyCode === 38) {
            UP = true;
        }
        //right
        if (e.keyCode === 39) {
            RIGHT = true;
        }
        //down
        if (e.keyCode === 40) {
            DOWN = true;
        }
    })

    canvas.addEventListener("keyup", function (e) {
        if (e.keyCode === 37) {
            LEFT = false;
        }
        //up
        if (e.keyCode === 38) {
            UP = false;
        }
        //right
        if (e.keyCode === 39) {
            RIGHT = false;
        }
        //down
        if (e.keyCode === 40) {
            DOWN = false;
        }

    })

    if (LEFT) {
        ball.acc_x = -ball.acceleration;
    }
    if (RIGHT) {
        ball.acc_x = ball.acceleration ;
    }
    if (UP) {
        ball.acc_y = -ball.acceleration;
    }
    if (DOWN) {
        ball.acc_y = ball.acceleration;
    }

    if(!UP && !DOWN){
        ball.acc_y =0;
    }
    if(!RIGHT && !LEFT){
        ball.acc_x =0;
    }

    ball.vel_x += ball.acc_x;
    ball.vel_y += ball.acc_y;
    ball.vel_x *= 1-friction;
    ball.vel_y *= 1-friction;

    ball.x += ball.vel_x;
    ball.y += ball.vel_y;

}


function mainLoop() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);


    balls.forEach((b)=>{
        b.drawBall();
        if(b.isPlayer) keyControl(b);
        b.display()
        
    })

    velocityXDisplay.innerText = Ball1.vel_x.toFixed(3);
    velocityYDisplay.innerText = Ball1.vel_y.toFixed(3);

    accelerationXDisplay.innerText = Ball1.acc_x; 
    accelerationYDisplay.innerText = Ball1.acc_y;
   
    requestAnimationFrame(mainLoop)
}


let Ball1 = new Ball(100, 100, 20,1.4);
Ball1.isPlayer = true;
document.getElementById("mass").innerText = Ball1.r

requestAnimationFrame(mainLoop);







