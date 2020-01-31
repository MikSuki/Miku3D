function drawScene(gl) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clearDepth(1.0)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(CUBE.programInfo.program);
    // uniforms
    gl.uniformMatrix4fv(
        CUBE.programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix)
    gl.uniformMatrix4fv(
        CUBE.programInfo.uniformLocations.viewMatrix,
        false,
        camera.modelMatrix)

    // ground
    {
        // Tell WebGL we want to affect texture unit 0
        gl.activeTexture(gl.TEXTURE0);
        // Bind the texture to texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, textures.ground[0]);
        // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(CUBE.programInfo.uniformLocations.uSampler, 0);
        for (let ii = 0; ii < models.ground.length; ++ii) {
            var matrix = models.ground[ii].modelMatrix

            gl.uniformMatrix4fv(
                CUBE.programInfo.uniformLocations.modelMatrix,
                false,
                matrix
            )

            var primitiveType = gl.TRIANGLES;
            var offset = 0;
            var count = 36;
            gl.drawArrays(primitiveType, offset, count);
        }
    }

    // character
    {
        for (let ii in player.models) {
            var matrix = mat4.clone(player.modelMatrix)
            mat4.mul(
                matrix,
                matrix,
                player.models[ii].modelMatrix
            )

            gl.uniformMatrix4fv(
                CUBE.programInfo.uniformLocations.modelMatrix,
                false,
                matrix
            )
            gl.bindTexture(gl.TEXTURE_2D, textures.miku[player.models[ii].texture[0]]);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            gl.bindTexture(gl.TEXTURE_2D, textures.miku[player.models[ii].texture[1]]);
            gl.drawArrays(gl.TRIANGLES, 6, 6);
            gl.bindTexture(gl.TEXTURE_2D, textures.miku[player.models[ii].texture[2]]);
            gl.drawArrays(gl.TRIANGLES, 12, 6);
            gl.bindTexture(gl.TEXTURE_2D, textures.miku[player.models[ii].texture[3]]);
            gl.drawArrays(gl.TRIANGLES, 18, 6);
            gl.bindTexture(gl.TEXTURE_2D, textures.miku[player.models[ii].texture[4]]);
            gl.drawArrays(gl.TRIANGLES, 24, 6);
            gl.bindTexture(gl.TEXTURE_2D, textures.miku[player.models[ii].texture[5]]);
            gl.drawArrays(gl.TRIANGLES, 30, 6);
        }
    }
}
