class Engine{
    constructor(){
        this.objects = []
    }

    addObj(obj){
        this.objects.push(obj);
    }

    tick(tiempo){
        for( let obj of this.objects ){
            obj.update(tiempo);
        }
    }

    reset(){
        for( let obj of this.objects ){
            obj.reset();
        }
    }
}