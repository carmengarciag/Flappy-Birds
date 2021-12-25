var contexto = document.getElementById("lienzoJuego")
var ctx = contexto.getContext("2d")
var WIDTH = 300;
var HEIGHT = 530;
var CANVAS_WIDTH = 300;
var CANVAS_HEIGHT = 530;
contexto.width = WIDTH;
contexto.height = HEIGHT;


//VARIABLES
var score = 0
var FPS = 60
var gravedad = 1.5
var personaje = {
    x:30,
    y:150,
    w:50,
    h:50
}
var pipes = new Array ()
pipes [0] = {
    x:ctx.canvas.width,
    y:0
}
//VARIABLES AUDIO

var punto = new Audio()
punto.src = "audios/punto.mp3"

//VARIABLES IMAGENES
var bird= new Image()
bird.src = "IMAGENES/bird.png"

var floor= new Image()
floor.src = "IMAGENES/floor.png"

var background= new Image()
background.src = "IMAGENES/background.png"

var lowerpipe= new Image()
lowerpipe.src = "IMAGENES/lowerpipe.png"

var upperpipe= new Image()
upperpipe.src = "IMAGENES/upperpipe.png"
//CONTROL
function keyDown(){
    personaje.y -= 35
}
resize()
function resize(){
    CANVAS_HEIGHT = window.innerHeight;
    CANVAS_WIDTH = window.innerWidth;
     
    contexto.width = WIDTH;
    contexto.height = HEIGHT;

    contexto.style.height = ""+CANVAS_HEIGHT+"px";
    //contexto.style.width = ""+CANVAS_WIDTH+"px";
}
//LOOP//
setInterval(loop,1000/FPS)
function loop () {
    ctx.clearRect(0,0,300,530)
    //BACKGROUND
    ctx.drawImage(background,0,0)
    ctx.drawImage(floor,0,ctx.canvas.height - floor.height)
    //PERSONAJE
    ctx.drawImage(bird,personaje.x,personaje.y, personaje.w, personaje.h)
    //PIPES
    for(var i =0; i < pipes.length; i++){
        var constant = 150 + 230
        ctx.drawImage(upperpipe, pipes[i].x, pipes[i].y)
        ctx.drawImage(lowerpipe, pipes[i].x, pipes[i].y + constant)
        pipes[i].x--
        if(pipes[i].y + upperpipe.height < 80){
            pipes[i].y = 0
        }

        if(pipes[i].x == 150){

            pipes.push({
                x:ctx.canvas.width,
                y: Math.floor (Math.random()*upperpipe.height) - upperpipe.height
            })
        }
        //COLISIONES
        if(personaje.x + bird.width >= pipes[i].x &&
            personaje.x <= pipes[i].x + upperpipe.width &&
            (personaje.y <= pipes[i].y + upperpipe.height ||
                personaje.y + bird.height >= pipes[i].y + constant)
                || personaje.y + bird.height >= ctx.canvas.height - floor.height){
                window.location.href = window.location.href
        }

        if(pipes[i].x == 50){
            score++
            punto.play()
        }
    }
    //CONDICIONES
    personaje.y += gravedad
    ctx.fillStyle = "rgba(0,0,0,1)"
    ctx.font = "25px Arial"
    ctx.fillText("Score: " +score,10,ctx.canvas.height-40)
}

//EVENTOS
window.addEventListener("resize", resize)
window.addEventListener("keydown", keyDown)
