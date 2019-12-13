const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;
    attribute vec2 aTextureCoord;

    uniform mat4 uModelMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uProjectionMatrix;
    uniform vec4 uColor;


    varying lowp vec4 vColor;
    varying highp vec2 vTextureCoord;

    void main() {
        gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * aVertexPosition;
        vColor = uColor;
        vTextureCoord = aTextureCoord;
    }
`;


const fsSource = `
    varying lowp vec4 vColor;
    varying highp vec2 vTextureCoord;

    uniform sampler2D uSampler;


    void main() {
        gl_FragColor = vColor;
        gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
`;

