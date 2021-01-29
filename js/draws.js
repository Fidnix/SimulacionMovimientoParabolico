function drawTrajectory( ctx, x1, y1, cpx, cpy, x2, y2 ){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(cpx, cpy, x2, y2);
    ctx.stroke();
}