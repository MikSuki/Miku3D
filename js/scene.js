function creaScene() {
    let len = 1024,
        x = -1 * Math.sqrt(len),
        z = 30 - Math.sqrt(len);

    let ground = []
    for (let i = 0; i < len; ++i) {
        ground.push(new GameObject(x, -7.5, z))
        ground[i].setScale(1, 0.5, 1, true)
        x += 2
        if (x >= Math.sqrt(len)) {
            x = -1 * Math.sqrt(len)
            z += 2
        }
    }
    ground.push(new GameObject(0, -6, 6))
    ground[ground.length - 1].setScale(5, 1, 1, true)
    ground[ground.length - 1].collider = {
        minX: ground[ground.length - 1].transform.position.x - 5,
        maxX: ground[ground.length - 1].transform.position.x + 5,
        minY: -7,
        maxY: -5,
        minZ: ground[ground.length - 1].transform.position.z - 1,
        maxZ: ground[ground.length - 1].transform.position.z + 1
    }
    models.ground = ground
}