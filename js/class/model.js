function creaCUBE() {
    var shaderProgram = initShaderProgram(gl, vsSource, fsSource),
        programInfo = {
            program: shaderProgram,
            attribLocations: {
                vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
                vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
                textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
            },
            uniformLocations: {
                projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
                viewMatrix: gl.getUniformLocation(shaderProgram, 'uViewMatrix'),
                modelMatrix: gl.getUniformLocation(shaderProgram, 'uModelMatrix'),
                color: gl.getUniformLocation(shaderProgram, 'uColor'),
                uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
            },
        },
        buffers = initBuffers(gl);

    return {
        shaderProgram: shaderProgram,
        programInfo: programInfo,
        buffers: buffers
    }
}

