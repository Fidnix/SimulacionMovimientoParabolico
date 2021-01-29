//Inicialización de variables apuntadoras de elementos del DOM

let lienzo = document.getElementById("lienzo"), ctx = lienzo.getContext("2d");

//Inicialización de constantes

const ANCHO = lienzo.clientWidth,
ALTO = lienzo.clientHeight,
SEMIEJE_X = ANCHO/2,
SEMIEJE_Y = ALTO/2,
GRAVITY = 10,
INITIAL_VELOCITY = 60,
INITIAL_ANGLE = 53 * Math.PI/180,
VELOCITY_X = INITIAL_VELOCITY * Math.cos(INITIAL_ANGLE),
INITIAL_VELOCITY_Y = INITIAL_VELOCITY * Math.sin(INITIAL_ANGLE),
FLIGHT_TIME = 2 * INITIAL_VELOCITY_Y / GRAVITY
HORIZONTAL_REACH = FLIGHT_TIME * VELOCITY_X,

EPSILON = .5;

//Declaración de otras variables

let x = 0, y = 0, mainInterval;

//Inicialización de Paths 2D

let dibujoDeEjes = new Path2D(), dibujoDeCirculo = new Path2D();

dibujoDeEjes.moveTo( 0, SEMIEJE_Y );
dibujoDeEjes.lineTo( ANCHO, SEMIEJE_Y );

dibujoDeEjes.moveTo( SEMIEJE_X, 0 );
dibujoDeEjes.lineTo( SEMIEJE_X, ALTO );


dibujoDeCirculo.arc(SEMIEJE_X, SEMIEJE_Y, HORIZONTAL_REACH/2, 0, Math.PI * 2);

//Dibujo de los ejes y el círculo y la trayectoria

function dibujoInicial(){
    ctx.stroke( dibujoDeEjes )

    ctx.setLineDash([4,6])
    ctx.stroke( dibujoDeCirculo )

    ctx.lineWidth = 2;

    drawTrajectory(ctx, SEMIEJE_X - (HORIZONTAL_REACH/2), SEMIEJE_Y, SEMIEJE_X, SEMIEJE_Y - (HORIZONTAL_REACH/2) * Math.tan(INITIAL_ANGLE) , SEMIEJE_X + (HORIZONTAL_REACH/2), SEMIEJE_Y)

    ctx.setLineDash([])
}

dibujoInicial()

//Funciones matemáticas

function yInBaseToX(x, angle, g, vi){
    return (Math.tan( angle )*x - (g*x**2)/(2*vi**2*Math.cos(angle)**2))
}

//Bucle

function bucle(){
    ctx.clearRect(0,0,ANCHO, ALTO);

    dibujoInicial()
    ctx.fillStyle = "rgb(255, 0, 0)";

    y = yInBaseToX(x, INITIAL_ANGLE, GRAVITY, INITIAL_VELOCITY);

    let current_x = SEMIEJE_X - (HORIZONTAL_REACH/2) + x, current_y = SEMIEJE_Y - y;

    ctx.beginPath();
    ctx.arc(current_x, current_y, 5, 0, Math.PI * 2);
    ctx.fill();
    // ctx.beginPath();
    // ctx.moveTo(current_x, current_y);

    x+= EPSILON;
}

mainInterval = setInterval( ()=>{
    bucle();
}, 100 )

//Escuchadores de eventos

document.addEventListener("keyup", (event)=>{
    if(event.key == "s"){
        clearInterval(mainInterval)
    }
})