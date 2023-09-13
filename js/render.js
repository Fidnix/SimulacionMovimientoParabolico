class Render{
    constructor(ctx, {width, height, margin}){
        this.ctx = ctx;
        this.setData({width, height, margin})
        this.objects = [];
    }

    setData({width, height, margin}){
        this.dims = {
            margin: margin || 40,
            width: width || 500,
            height: height || 300
        };

        this.dims.origin = Vector.create(this.dims.margin, this.dims.height - this.dims.margin);

        this.ctx.translate(...Vector.getCoords(this.dims.origin));

        this.axisPath = new Path2D();
        this.axisPath.moveTo( 0, -height );
        this.axisPath.lineTo( 0, height );
        this.axisPath.moveTo( -width, 0 );
        this.axisPath.lineTo( width, 0 );
    }

    resizeFunc({width, height, margin}){
        this.setData({width, height, margin});
        this.renderFrame();
    }

    clear(){
        this.ctx.clearRect(-this.dims.width, -this.dims.height, 2*this.dims.width, 2*this.dims.height);
    }

    initialRender(){
        this.ctx.stroke( this.axisPath );
    }

    renderPoint([x, y], argRender){
        let render = CommonElems(argRender, {
            fillColor: '#000',
            radius: 4
        })

        this.ctx.beginPath();
        let auxFillColor = this.ctx.fillStyle;
        this.ctx.fillStyle = render.fillColor;
        this.ctx.arc( x, -y, render.radius, 0, Math.PI *2);
        this.ctx.fill();
        this.ctx.fillStyle = auxFillColor;
        this.ctx.closePath();
    }

    renderVector([cx, cy], [x, y], argRender) {
        let render = CommonElems(argRender,
            {
                fillColor: '#000',
                t: 0.9
            }
        )

        let auxLineWidth = this.ctx.lineWidth;
        this.ctx.lineWidth = 2;

        let auxStrokeColor = this.ctx.strokeStyle;
        this.ctx.strokeStyle = render.fillColor;
        let auxFillColor = this.ctx.fillStyle;
        this.ctx.fillStyle = render.fillColor;

        const middle = {
            x: x * render.t + cx,
            y: y * render.t + cy
        };
        const tip = {
            dx: cx + x - middle.x,
            dy: cy + y - middle.y
        };
        this.ctx.beginPath();
        this.ctx.moveTo( cx, -cy);
        this.ctx.lineTo( middle.x, -middle.y);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.moveTo( middle.x + 0.5 * tip.dy, -middle.y + 0.5 * tip.dx);
        this.ctx.lineTo( middle.x - 0.5 * tip.dy, -middle.y - 0.5 * tip.dx);
        this.ctx.lineTo( x + cx, -y - cy);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.lineWidth = auxLineWidth;
        this.ctx.strokeStyle = auxStrokeColor;
        this.ctx.fillStyle = auxFillColor;

        this.ctx.closePath();
    }

    addObj(obj){
        this.objects.push(obj)
    }

    renderFrame(){
        let renderObjPoint = (obj)=>{
            if(obj.render.showVelocity){
                if(obj.velocity.render.r.show){
                    this.renderVector(obj.getCoords(), obj.velocity.getCoords(), obj.velocity.render.r);
                }
                if(obj.velocity.render.x.show){
                    this.renderVector(obj.getCoords(), obj.velocity.getCompX(), obj.velocity.render.x);
                }
                if(obj.velocity.render.y.show){
                    this.renderVector(obj.getCoords(), obj.velocity.getCompY(), obj.velocity.render.y);
                }
            }
            if(obj.render.showTrajectory){
                obj.getTrajectory().map((value)=>{
                    this.renderPoint(value, obj.render.trajectory);
                })
            }
            this.renderPoint(obj.getCoords(), obj.render)
        }

        this.clear();
        this.initialRender();
        for(let obj of this.objects){
            switch(obj.render.shape){
                case 'Point':
                    renderObjPoint(obj)
                    break;
            }
        }
    }
}