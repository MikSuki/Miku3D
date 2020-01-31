function show(m) {
    console.log('x: ', m[0], m[4], m[8])
    console.log('y: ', m[1], m[5], m[9])
    console.log('z: ', m[2], m[6], m[10])
    console.log('t: ', m[12], m[13], m[14])
}


function toRad(angle) {
    return angle / 180 * Math.PI
}

function intersect(a, b) {
    return (a.minX <= b.maxX && a.maxX >= b.minX) &&
        (a.minY <= b.maxY && a.maxY >= b.minY) &&
        (a.minZ <= b.maxZ && a.maxZ >= b.minZ);
}

function dot(vec1, vec2) {
    return vec1.x * vec2.x + vec1.y * vec2.y
}

function length(vec) {
    return Math.sqrt(vec.x ** 2 + vec.y ** 2)
}

function normalize(vec) {
    let size = Math.sqrt(vec.x ** 2 + vec.y ** 2)
    return {
        x: vec.x / size,
        y: vec.y / size
    }
}

function cross(vec1, vec2) {
    return vec1.x * vec2.y - vec1.y * vec2.x
}
