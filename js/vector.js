let Vector = {};

Vector.create = (x, y)=>{
    return {x: x, y: y}
}

Vector.add = (vec1, vec2)=>{
    return {x: vec1.x + vec2.x, y: vec1.y + vec2.y}
}

Vector.multiply = (vec, alpha)=>{
    return {x: vec.x * alpha, y: vec.y * alpha}
}

Vector.flipX = (vec)=>{
    return {x: -vec.x, y: vec.y}
}

Vector.flipY = (vec)=>{
    return {x: vec.x, y: -vec.y}
}

Vector.module = (vec)=>{
    return Math.sqrt( Math.pow(vec.x,2) + Math.pow(vec.y,2) )
}

Vector.getCoords = (vec)=>{
    return [vec.x, vec.y]
}

Vector.copy = (vec)=>{
    return {x: vec.x, y: vec.y}
}