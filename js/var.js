const { mat4, mat3, vec3, quat } = glMatrix;


var CUBE;
var models = [];
var player;
var texture;
var textures = {};
const img_src = {
    ground: ['asset/texture/ground/ground.png'],
    miku: [
        'asset/texture/miku/miku_head_f.png',
        'asset/texture/miku/miku_head_b.png',
        'asset/texture/miku/miku_body_f.png',
        'asset/texture/miku/miku_body_b.png',
        'asset/texture/miku/miku_body_l.png',
        'asset/texture/miku/miku_hand_r.png',
        'asset/texture/miku/miku_hand_l.png',
        'asset/texture/miku/miku_leg_f.png',
        'asset/texture/miku/miku_leg_b.png',
    ],
}


var camera;
var projectionMatrix, viewMatrix;

var look;
var buffer2;
var ground = []