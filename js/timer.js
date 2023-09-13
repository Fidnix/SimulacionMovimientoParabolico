class Timer{
    #loop;
    #timeInterval;
    #engine;
    #render;
    #state;

    constructor(engine, render, fps){
        this.#state = 'stop';

        this.#loop;
        this.#timeInterval = 1/fps;
        this.#engine = engine;
        this.#render = render;
        this.#render.renderFrame();
        this.time = 0;

        this.flipBtn = document.getElementById('flipBtn');
        this.resetBtn = document.getElementById('resetBtn');

        let self = this;
        this.flipBtn.addEventListener('click', ()=>{
            self.flip()
        })
        
        this.resetBtn.addEventListener('click', ()=>{
            self.reset();
        })

        this.events = {};
    }

    start(){
        if(this.#state == 'start'){
            return;
        }
        this.flipBtn.classList.remove('play');
        this.flipBtn.classList.add('pause');
        
        this.#state = 'start';
        this.#loop = setInterval( ()=>{
            this.runFrame();
            this.time += this.#timeInterval;
            if(this.events['play']){
                this.events['play'](this.time)
            }
        }, this.#timeInterval*1000 );
    }
    
    stop(){
        this.flipBtn.classList.add('play');
        this.flipBtn.classList.remove('pause');

        if(this.events['pause']){
            this.events['pause']()
        }
        this.#state = 'stop';
        clearInterval( this.#loop );
    }

    runFrame(){
        this.#engine.tick(this.time);
        this.#render.renderFrame();
    }

    setTime(time){
        this.time = time
    }
    

    reset(){
        this.stop();
        this.time = 0;
        if(this.events['play']){
            this.events['play'](0)
        }
        this.#engine.reset();
        this.#render.renderFrame();
    }

    flip(){
        switch(this.#state){
            case 'start':
                this.stop();
                break;
            case 'stop':
                this.start();
                break;
        }
    }

    getState(){
        return this.#state;
    }

    setEvent(eventName, callback){
        this.events[eventName] = callback;
    }
}