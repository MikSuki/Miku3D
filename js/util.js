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