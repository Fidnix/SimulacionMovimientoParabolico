class Point{
    #iniPos;
    #currentPos;
    #fx;
    #fy;
    #time;

    constructor(x, y, fx, fy, render){
        this.#iniPos = Vector.create(x, y);
        this.#currentPos = Vector.create(x, y);

        this.#fx = fx;
        this.#fy = fy;

        this.#time = 0;

        this.render = CommonElems( render,
            {
                shape: 'Point',
                radius: 5,
                fillColor: '#ff0054',
                showTrajectory: false,
                trajectory: {},
                showVelocity: false,
                velocity: {}
            }
        )

        if(this.render.showVelocity){
            this.velocity = new Velocity(fx, fy, 0, this.render.velocity);
        }
    }

    setCinemaFuncX(fx){
        this.#fx = fx;
        this.velocity.setCinemaFuncX.call(this.velocity, fx)
    }
    
    setCinemaFuncY(fy){
        this.#fy = fy;
        this.velocity.setCinemaFuncY.call(this.velocity, fy)
    }

    getCinemaFunc(){
        return [this.#fx, this.#fy];
    }

    getVelocity(){
        return this.velocity;
    }

    getCoords(){
        return Vector.getCoords(this.#currentPos);
    }

    #updateCoords(tiempo){
        let vec1 = Vector.create(this.#fx(tiempo), this.#fy(tiempo))
        this.#currentPos = Vector.add( vec1, this.#iniPos );
    }

    update(tiempo){
        this.#updateCoords(tiempo);
        this.velocity.eval.call(this.velocity, tiempo)
    }

    getTime(){
        return this.#time
    }
    
    setTime(time){
        this.#updateCoords(time);
    }

    reset(){
        this.#currentPos = Vector.copy(this.#iniPos);
        this.setTime(0);
        if(this.velocity != undefined){
            this.velocity.reset.call(this.velocity)
        }
    }

    getTrajectory(){
        let futurePos = []
        for (let i = 0; i < 40; i+=0.5) {
            if(this.#fy(i) < 0){
                break;
            }
            futurePos.push(Vector.getCoords(Vector.add( Vector.create(this.#fx(i),this.#fy(i)), this.#iniPos )))

        }
        return futurePos
    }
}

class Velocity{
    #x
    #y
    #fx
    #fy
    constructor(fx, fy, t = 0, options){
        this.#x = 0;
        this.#y = 0;
        this.#fx = fx
        this.#fy = fy
        this.eval(t);

        this.render = CommonElems(options, {
            r: {
                shape: 'Vector',
                show: true,
                showModule: false,
                fillColor: '#390099',
                t: 0.9,
            },
            x: {
                shape: 'Vector',
                show: false,
                showModule: false,
                fillColor: '#390099',
                t: 0.9,
            },
            y: {
                shape: 'Vector',
                show: false,
                showModule: false,
                fillColor: '#390099',
                t: 0.9,
            }
        })

        this.events = {};
    }

    update(){
        this.eval()
        if(this.events['change']){
            this.events['change'](this.getCoords());
        }
    }

    reset(){
        this.eval(0)
    }

    eval(time){
        const H = 0.000000000001
        this.#x = (this.#fx(time + H) - this.#fx(time))/H;
        this.#y = (this.#fy(time + H) - this.#fy(time))/H;
        return [this.#x, this.#y]
    }

    getCoords(){
        return [this.#x, this.#y]
    }
    getCompX(){
        return [this.#x, 0]
    }
    getCompY(){
        return [0, this.#y]
    }

    setCinemaFuncX(fx){
        this.#fx = fx;
    }

    setCinemaFuncY(fy){
        this.#fy = fy;
    }

    setEvent(eventname, callback){
        this.events[eventname] = callback;
    }
}