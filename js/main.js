(function(){
    // Canvas
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    let canvasCont = document.getElementById('canvas__cont')

    let resizeCanvas = ()=>{
        canvas.width = canvasCont.clientWidth-5;
        canvas.height = canvasCont.clientHeight-5;
    }
    resizeCanvas();
    
    // Initial Velocity
    const VELX = document.getElementById('velXRange');
    const VELY = document.getElementById('velYRange');
    const TIME = document.getElementById('timeRange');
    
    VELX.value = parseFloat(localStorage.getItem('velXRange') || VELX.value);
    VELY.value = parseFloat(localStorage.getItem('velYRange') || VELY.value);

    let xVelocity = parseFloat(VELX.value);
    let yVelocity = parseFloat(VELY.value);
    const WIDTH = canvas.clientWidth;
    const HEIGHT = canvas.clientHeight;
    const GRAVITY = 10;

    // Engine and render
    let engine = new Engine();
    let render = new Render(ctx, {width: WIDTH, height: HEIGHT});
    let timer = new Timer(engine, render, 60);
    let point = new Point(
        0, 0,
        (t)=>{return t*xVelocity},
        (t)=>{return t*(yVelocity - t*GRAVITY/2)},
        {
            radius: 10,
            showTrajectory: true,
            showVelocity: true,
            velocity: {
                x:{
                    show: true,
                },
                y:{
                    show: true,
                }
            }
        }
    )

    engine.addObj(point);
    render.addObj(point);
    render.renderFrame();

    // EventListeners
    window.onresize =  ()=>{
        resizeCanvas();
        render.resizeFunc({width: canvasCont.clientWidth, height: canvasCont.clientHeight});
    }
    
    document.addEventListener("keyup", (event)=>{
        switch(event.key){
            case 'a':
                timer.start();
                break;
            case 's':
                timer.stop();
                break;
            case 'r':
                timer.reset();
                break;
            case ' ':
                timer.flip();
                break;
        }
    })
    const V0XDISPLAY = document.getElementById('v0x__display')
    const V0YDISPLAY = document.getElementById('v0y__display')
    V0XDISPLAY.innerHTML = `${xVelocity} m/s`;
    V0YDISPLAY.innerHTML = `${yVelocity} m/s`;

    VELX.addEventListener('input', ()=>{
        xVelocity = parseFloat(VELX.value);
        V0XDISPLAY.innerHTML = `${xVelocity} m/s`;
        localStorage.setItem('velXRange', xVelocity);
        point.setCinemaFuncX((t)=>{return t*xVelocity});
        timer.reset();
    })
    
    VELY.addEventListener('input', ()=>{
        yVelocity = parseFloat(VELY.value);
        V0YDISPLAY.innerHTML = `${yVelocity} m/s`;
        localStorage.setItem('velYRange', yVelocity);
        point.setCinemaFuncY((t)=>{return t*(yVelocity - t*GRAVITY/2)});
        timer.reset();
    })

    TIME.oninput =()=>{
        if(TIME.value == ''){
            timer.stop();
            timer.setTime(0);
            timer.runFrame();
            return;
        }
        timer.stop();
        timer.setTime(parseFloat(TIME.value));
        timer.runFrame();
    }

    timer.setEvent('play', (tiempo)=>{
        TIME.value = tiempo.toFixed(2);
    })
})()