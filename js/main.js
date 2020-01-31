window.onload = () => {
    creaScene()
    setCns()
    loadImgSrc()
    texture = loadTexture(gl, 'asset/texture/ground/ground.png')


    // // gl.NEAREST is also allowed, instead of gl.LINEAR, as neither mipmap.
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // // Prevents s-coordinate wrapping (repeating).
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    // // Prevents t-coordinate wrapping (repeating).
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    CUBE = creaCUBE()
    bindBuffers(CUBE)
    projectionMatrix = createProjMat()
    camera = new Camera()
    camera.isLookAt = true
    camera.translate(0, 0, -30, true)
    player = new Character(0, 0, 0, 1, 1, 1)
    camera.lookPt = player
    camera.updateMatrix()
    requestAnimationFrame(loop);

    var then = 0;
    function loop(now) {
        now *= 0.001;  // convert to seconds
        const deltaTime = now - then;
        then = now;
        player.update(deltaTime)
        drawScene(gl, deltaTime);
        requestAnimationFrame(loop);
    }
}

