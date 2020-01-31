function creaCUBE() {
    var shaderProgram = initShaderProgram(gl, vsSource, fsSource),
        programInfo = {
            program: shaderProgram,
            attribLocations: {
                vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
                textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
            },
            uniformLocations: {
                projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
                viewMatrix: gl.getUniformLocation(shaderProgram, 'uViewMatrix'),
                modelMatrix: gl.getUniformLocation(shaderProgram, 'uModelMatrix'),
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

function bindBuffers(CUBE) {
    // vertex buffer
    {
        const numComponents = 3;  // pull out 2 values per iteration
        const type = gl.FLOAT;    // the data in the buffer is 32bit floats
        const normalize = false;  // don't normalize
        const stride = 0;         // how many bytes to get from one set of values to the next
        // 0 = use type and numComponents above
        const offset = 0;         // how many bytes inside the buffer to start from
        gl.bindBuffer(gl.ARRAY_BUFFER, CUBE.buffers.position);
        gl.vertexAttribPointer(
            CUBE.programInfo.attribLocations.vertexPosition,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(
            CUBE.programInfo.attribLocations.vertexPosition);
    }

    // texture buffer
    {
        const num = 2; // every coordinate composed of 2 values
        const type = gl.FLOAT; // the data in the buffer is 32 bit float
        const normalize = false; // don't normalize
        const stride = 0; // how many bytes to get from one set to the next
        const offset = 0; // how many bytes inside the buffer to start from
        gl.bindBuffer(gl.ARRAY_BUFFER, CUBE.buffers.textureCoord);
        gl.vertexAttribPointer(CUBE.programInfo.attribLocations.textureCoord, num, type, normalize, stride, offset);
        gl.enableVertexAttribArray(CUBE.programInfo.attribLocations.textureCoord);
    }
}


