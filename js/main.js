
function setCns() {
    const canvas = document.querySelector("#glCanvas");
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    gl = canvas.getContext("webgl", { premultipliedAlpha: false });

    if (gl === null) {
        alert("無法初始化 WebGL，您的瀏覽器不支援。");
        return;
    }
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var x = 0,
        y = 0,
        angX = 0,
        angY = 0,
        sensitivity = 100,
        r_click = false;

    canvas.oncontextmenu = function (e) {
        e.preventDefault();
        r_click = false
    };
    canvas.onmousemove = function (e) {
        if (r_click && !player.isJump) {
            x += e.movementX / canvas.width
            y += e.movementY / canvas.height

            angX += x * sensitivity
            //angX = 360 % angX
            angY += y * sensitivity
            if (angY > 89) angY = 89
            if (angY < -30) angY = -30
            //angY = Math.abs(angY) > 89 ? Math.sign(angY) * 89 : angY

            camera.rotate(angX, angY, true)

            x = 0
            y = 0
            cnt = 0
        }
    };
    canvas.onmousedown = function (e) {
        var rightclick;
        var e = window.event;
        if (e.which) rightclick = (e.which == 3);
        else if (e.button) rightclick = (e.button == 2);
        // mouse right clcik
        if (rightclick) {
            r_click = true
            cx = e.clientX
            cy = e.clientY
        }
    };

    canvas.onwheel = function (e) {
        camera.zoom(e.deltaY * 0.01, true)
    };

}

function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // 建立 shader 程式

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // 錯誤處理

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Send the source to the shader object

    gl.shaderSource(shader, source);

    // Compile the shader program

    gl.compileShader(shader);

    // See if it compiled successfully

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

function initBuffers(gl) {

    const positionBuffer = gl.createBuffer();

    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Now create an array of positions for the square.

    const positions = [
        // Front face
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,

        // Back face
        -1.0, -1.0, -1.0,
        -1.0, 1.0, -1.0,
        1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, -1.0, -1.0,

        // Top face
        -1.0, 1.0, -1.0,
        -1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, 1.0, -1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, -1.0,

        // Bottom face
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0, 1.0,
        -1.0, -1.0, -1.0,
        1.0, -1.0, 1.0,
        -1.0, -1.0, 1.0,

        // Right face
        1.0, -1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, 1.0, 1.0,
        1.0, -1.0, -1.0,
        1.0, 1.0, 1.0,
        1.0, -1.0, 1.0,

        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0, 1.0,
        -1.0, 1.0, 1.0,
        -1.0, -1.0, -1.0,
        -1.0, 1.0, 1.0,
        -1.0, 1.0, -1.0,
    ]

    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.

    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW);



    var colorBuffer = []
    var faceColors = [
        [0, 0.5, 0, 1.0],    // Front face: white
        [0, 0.5, 0, 1.0],    // Back face: red
        [0, 0.5, 0, 1.0],    // Top face: green
        [0, 0.5, 0, 1.0],    // Bottom face: blue
        [0, 0.5, 0, 1.0],    // Right face: yellow
        [0, 0.5, 0, 1.0],    // Left face: purple
    ];

    // Convert the array of colors into a table for all the vertices.

    var colors = [];

    for (var j = 0; j < faceColors.length; ++j) {
        const c = faceColors[j];

        // Repeat each color four times for the four vertices of the face
        colors = colors.concat(c, c, c, c, c, c);
    }

    colorBuffer.Green_dark = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer.Green_dark);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);



    faceColors = [
        [0, 1, 0, 1.0],    // Front face: white
        [0, 1, 0, 1.0],    // Back face: red
        [0, 1, 0, 1.0],    // Top face: green
        [0, 1, 0, 1.0],    // Bottom face: blue
        [0, 1, 0, 1.0],    // Right face: yellow
        [0, 1, 0, 1.0],    // Left face: purple
    ];

    // Convert the array of colors into a table for all the vertices.

    var colors = [];

    for (var j = 0; j < faceColors.length; ++j) {
        const c = faceColors[j];

        // Repeat each color four times for the four vertices of the face
        colors = colors.concat(c, c, c, c, c, c);
    }

    colorBuffer.Green_light = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer.Green_light);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);


    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);



    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

    const textureCoordinates = [
        // Front
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,

        // Back
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0,

        // Top
        0.0, 0.0,
        0.0, 1.0,
        1.0, 1.0,
        0.0, 0.0,
        1.0, 1.0,
        1.0, 0.0,
        // Bottom
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        // Right
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0,
        // Left
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
        gl.STATIC_DRAW);



    return {
        position: positionBuffer,
        color: colorBuffer,
        textureCoord: textureCoordBuffer,
    };
}

function initBuffers2(gl) {

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,
        // -1.0, -1.0, 1.0,
        // 1.0, 1.0, 1.0,
        // -1.0, 1.0, 1.0,
    ]

    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW);

    const faceColors = [
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
    ];


    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(faceColors), gl.STATIC_DRAW);



    return {
        position: positionBuffer,
        color: colorBuffer,
    };
}
function createProjMat() {
    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    mat4.perspective(
        projectionMatrix,
        fieldOfView,
        aspect,
        zNear,
        zFar
    );

    return projectionMatrix
}

function loadTexture(gl, url) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Because images have to be download over the internet
    // they might take a moment until they are ready.
    // Until then put a single pixel in the texture so we can
    // use it immediately. When the image has finished downloading
    // we'll update the texture with the contents of the image.
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
        width, height, border, srcFormat, srcType,
        pixel);

    const image = new Image();
    image.onload = function () {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
            srcFormat, srcType, image);
        if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
            // Yes, it's a power of 2. Generate mips.
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            // No, it's not a power of 2. Turn off mips and set
            // wrapping to clamp to edge
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
    };
    image.src = url;
    return texture;

    function isPowerOf2(value) {
        return (value & (value - 1)) == 0;
    }
}

function test() {
    for (let temp in img_src) {
        //let temp = i
        textures[temp] = []
        img_src[temp].forEach(e => {
            textures[temp].push(loadTexture(gl, e))
        });
    }
}




function loadImages(urls, callback) {
    var images = [];
    var imagesToLoad = urls.length;

    var onImageLoad = function () {
        --imagesToLoad;
        if (imagesToLoad == 0) {
            callback(images);
        }
    };

    for (var ii = 0; ii < imagesToLoad; ++ii) {
        var image = loadImage(urls[ii], onImageLoad);
        images.push(image);
    }
}



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

    // texture
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

    // Tell WebGL we want to affect texture unit 0
    gl.activeTexture(gl.TEXTURE0);
    // Bind the texture to texture unit 0
    gl.bindTexture(gl.TEXTURE_2D, textures.ground[0]);
    // Tell the shader we bound the texture to texture unit 0
    gl.uniform1i(CUBE.programInfo.uniformLocations.uSampler, 0);

    //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, CUBE.buffers.indices);





    // player
    {

        // gl.uniformMatrix4fv(
        //     CUBE.programInfo.uniformLocations.modelMatrix,
        //     false,
        //     CUBE.modelMatrix
        // )

        // var primitiveType = gl.TRIANGLES;
        // var offset = 0;
        // var count = 36;
        // gl.drawArrays(primitiveType, offset, count);
    }

    // ground
    for (var ii = models.ground.length - 1/*0*/; ii < models.ground.length; ++ii) {
        var matrix = models.ground[ii].modelMatrix
        // color buffer
        {
            // const numComponents = 4;
            // const type = gl.FLOAT;
            // const normalize = false;
            // const stride = 0;
            // const offset = 0;
            if (ii % 2)
                gl.uniform4fv(
                    CUBE.programInfo.uniformLocations.color,
                    color.Green_dark)

            else
                gl.uniform4fv(
                    CUBE.programInfo.uniformLocations.color,
                    color.Green_light)

            // gl.bindBuffer(gl.ARRAY_BUFFER, CUBE.buffers.color.Green_dark);
            // gl.vertexAttribPointer(
            //     CUBE.programInfo.attribLocations.vertexColor,
            //     numComponents,
            //     type,
            //     normalize,
            //     stride,
            //     offset);
            // gl.enableVertexAttribArray(
            //     CUBE.programInfo.attribLocations.vertexColor);
        }

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

    return
    // dot
    {
        // vertex buffer
        {
            const numComponents = 3;  // pull out 2 values per iteration
            const type = gl.FLOAT;    // the data in the buffer is 32bit floats
            const normalize = false;  // don't normalize
            const stride = 0;         // how many bytes to get from one set of values to the next
            // 0 = use type and numComponents above
            const offset = 0;         // how many bytes inside the buffer to start from
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer2.position);
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
        // color buffer
        // {
        //     const numComponents = 4;
        //     const type = gl.FLOAT;
        //     const normalize = false;
        //     const stride = 0;
        //     const offset = 0;
        //     gl.bindBuffer(gl.ARRAY_BUFFER, buffer2.color);
        //     gl.vertexAttribPointer(
        //         CUBE.programInfo.attribLocations.vertexColor,
        //         numComponents,
        //         type,
        //         normalize,
        //         stride,
        //         offset);
        //     gl.enableVertexAttribArray(
        //         CUBE.programInfo.attribLocations.vertexColor);
        // }

        let lookMatrix = mat4.clone(camera.lookPt.modelMatrix);
        // console.log('look')
        // show(lookMatrix)
        //[matrix[12], matrix[13], matrix[14]] = [camera.lookPt[12], camera.lookPt[13], camera.lookPt[14]] 
        mat4.scale(
            lookMatrix,
            lookMatrix,
            vec3.fromValues(1, 1, 1)
        )
        mat4.translate(
            lookMatrix,
            lookMatrix,
            [0, 1, 0]
        )

        gl.uniformMatrix4fv(
            CUBE.programInfo.uniformLocations.modelMatrix,
            false,
            lookMatrix
        )

        gl.uniform4fv(
            CUBE.programInfo.uniformLocations.color,
            dotColor)

        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 6;
        gl.drawArrays(primitiveType, offset, count);
    }
}

var dotColor = [Math.random(), Math.random(), Math.random(), 1]
var charColor = []
for (let i = 0; i < 6; ++i)
    charColor.push([Math.random(), Math.random(), Math.random(), 1])
var color = {
    Green_dark: [0, 0.5, 0, 1],
    Green_light: [0, 1, 0, 1]
}

window.onload = () => {
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


    setCns()
    test()
    texture = loadTexture(gl, 'asset/texture/ground/ground.png')


    // gl.NEAREST is also allowed, instead of gl.LINEAR, as neither mipmap.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // Prevents s-coordinate wrapping (repeating).
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    // Prevents t-coordinate wrapping (repeating).
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);






    CUBE = creaCUBE()
    projectionMatrix = createProjMat()


    camera = new Camera()
    camera.isLookAt = true
    camera.translate(0, 0, -30, true)

    player = new Character(0, 0, 0, 1, 1, 1)


    camera.lookPt = player
    camera.updateMatrix()

    // mat4.set(
    //     camera.lookPt.modelMatrix,
    //     -camera.modelMatrix[0], 0, camera.modelMatrix[2], 0,
    //     0, 1, 0, 0,
    //     -camera.modelMatrix[8], 0, camera.modelMatrix[10], 0,
    //     camera.lookPt.transform.position.x, camera.lookPt.transform.position.y, camera.lookPt.transform.position.z, 1
    // )


    buffer2 = initBuffers2(gl)


    var then = 0;
    // Draw the scene repeatedly
    function render(deltaTime) {
        //viewMatrix = createViewMat()
        // squareRotation += deltaTime * 2;
        // cubeRotation += deltaTime * 2;
        drawScene(gl, deltaTime);

    }
    function loop(now) {
        now *= 0.001;  // convert to seconds
        const deltaTime = now - then;
        then = now;
        player.update(deltaTime)
        render(deltaTime)
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
}


function edge(vertex, dir) {
    let index = 0
    for (let i = 0, max = Number.MIN_SAFE_INTEGER; i < vertex.length; ++i) {
        let proj = dot(vertex[i], dir)
        if (proj > max) {
            max = proj
            index = i
        }
    }
    let v = vertex[index]
    let v1 = index == vertex.length - 1 ? vertex[0] : vertex[index + 1]
    let v0 = index == 0 ? vertex[vertex.length - 1] : vertex[index - 1]
    let l = normalize({
        x: v.x - v1.x,
        y: v.y - v1.y
    })
    let r = normalize({
        x: v.x - v0.x,
        y: v.y - v0.y
    })

    if (dot(r, dir) <= dot(l, dir)) {
        return showV(v0, v)
    } else {
        return showV(v, v1)
    }

    function showV(v1, v2) {
        let a = -1, b = -1;
        for (let i = 0; i < vertex.length; ++i) {
            if (vertex[i] === v1) {
                a = i
            }
            else if (vertex[i] === v2) {
                b = i
            }
        }
        // console.log(a + 1, b + 1)
        // console.log(vertex[a], vertex[b])
        return {
            x: vertex[a].x - vertex[b].x,
            y: vertex[a].y - vertex[b].y
        }
    }
}

function edge2(boundary, center, left, right) {
    let v = posIn3by3(center)
    // console.log('v: ' + v)
    // console.log('v_left: ' + v_left)
    // console.log('v_right: ' + v_right)
    // console.log('----------')

    if (v % 2 == 0) {
        let v_left = posIn3by3(left)
        let v_right = posIn3by3(right)
        switch (v) {
            case 0:
                if (v_left == 4)
                    v = 3
                else if (v_right == 4)
                    v = 1
                else
                    v = 1
                break
            case 2:
                if (v_left == 4)
                    v = 1
                else if (v_right == 4)
                    v = 5
                else
                    v = 1
                break
            case 6:
                if (v_left == 4)
                    v = 7
                else if (v_right == 4)
                    v = 3
                else
                    v = 7
                break
            case 8:
                if (v_left == 4)
                    v = 5
                else if (v_right == 4)
                    v = 7
                else
                    v = 7
                break
        }
    }
    switch (v) {
        case 1:
            side = {
                x: boundary.maxX - boundary.minX,
                y: 0
            }
            break
        case 3:
            side = {
                x: 0,
                y: boundary.minZ - boundary.maxZ
            }
            break
        case 5:
            side = {
                x: 0,
                y: boundary.maxZ - boundary.minZ
            }
            break
        case 7:
            side = {
                x: boundary.minX - boundary.maxZ,
                y: 0
            }
            break
    }

    return getVerticalAngle(side)

    function posIn3by3(pos) {
        let v = -1
        if (pos.x < boundary.minX)
            v = 0
        else if (pos.x < boundary.maxX)
            v = 1
        else
            v = 2

        if (pos.y < boundary.minZ)
            v += 0
        else if (pos.y < boundary.maxZ)
            v += 3
        else
            v += 6
        return v
    }
}

function getVerticalAngle(side) {
    let side_angle = Math.acos(dot(side, { x: 1, y: 0 }) / length(side))
    if (side.y < 0) side_angle *= -1
    return side_angle - 1.571
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
