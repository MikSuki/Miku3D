class Character extends GameObject {
    constructor(x, y, z, sx, sy, sz) {
        super(x, y, z, sx, sy, sz)
        this.models = {
            head: new GameObject(0, 0, 0, 1, 1, 1),
            body: new GameObject(0, -2.5, 0, 1, 1.5, 0.5),
            left_hand: new GameObject(-1.5, -2.5, 0, 0.5, 1.5, 0.5),
            right_hand: new GameObject(1.5, -2.5, 0, 0.5, 1.5, 0.5),
            left_leg: new GameObject(-0.5, -5.5, 0, 0.5, 1.5, 0.5),
            right_leg: new GameObject(0.5, -5.5, 0, 0.5, 1.5, 0.5)
        }

        this.models.head.texture = [0, 1, 1, 1, 1, 1]
        this.models.body.texture = [2, 3, 3, 3, 4, 4]
        this.models.left_hand.texture = [5, 5, 5, 5, 5, 6]
        this.models.right_hand.texture = [5, 5, 5, 5, 5, 5]
        this.models.left_leg.texture = [7, 8, 8, 8, 8, 8]
        this.models.right_leg.texture = [7, 8, 8, 8, 8, 8]


        this.isJump = false
        this.jumpForce = 0.2
        this.jumpCnt = 40

        this.collider = {
            minX: -1,
            maxX: 1,
            minY: -7,
            maxY: 1,
            minZ: -1,
            maxZ: 1
        }
    }

    update() {
        if (this.isJump) {
            if (this.jumpCnt > 20)
                this.translate(
                    0,
                    this.jumpForce,
                    0,
                    true
                )
            else if (this.jumpCnt > 0)
                this.translate(
                    0,
                    -this.jumpForce,
                    0,
                    true
                )
            else {
                this.isJump = false
                this.jumpCnt = 40 + 1
            }
            --this.jumpCnt
        }

    }

    walk(mode) {
        let forward = vec3.create(),
            right = vec3.create(),
            v1 = 0, v2 = 0;

        vec3.normalize(
            forward,
            vec3.fromValues(
                camera.modelMatrix[2],
                0,
                camera.modelMatrix[10]
            )
        )
        vec3.normalize(
            right,
            vec3.fromValues(
                camera.modelMatrix[0],
                0,
                camera.modelMatrix[8]
            )
        )

        switch (mode) {
            case 0:
                [v1, v2] = [-forward[0], -forward[2]]
                break;
            case 1:
                [v1, v2] = [forward[0], forward[2]]
                break;
            case 2:
                [v1, v2] = [-right[0], -right[2]]
                break
            case 3:
                [v1, v2] = [right[0], right[2]]
                break
        }

        this.translate(
            v1,
            0,
            v2,
            false
        )

        if(intersect(this.collider, models.ground[models.ground.length - 1].collider)){
            console.log('collider')
            console.log(this.collider)
            /*
            console.log(models.ground[models.ground.length - 1].collider)
            this.translate(
                -v1,
                0,
                -v2,
                false
            )
            return*/
        }
        camera.translate(
            v1,
            0,
            v2,
            false
        )


        mat4.set(
            this.modelMatrix,
            this.modelMatrix[0], this.modelMatrix[1], this.modelMatrix[2], 0,
            this.modelMatrix[4], this.modelMatrix[5], this.modelMatrix[6], 0,
            this.modelMatrix[8], this.modelMatrix[9], this.modelMatrix[10], 0,
            this.transform.position.x, this.transform.position.y, this.transform.position.z, 1
        )


        switch (mode) {
            case 0:
                mat4.set(
                    this.modelMatrix,
                    right[0], 0, -forward[0], 0,
                    0, 1, 0, 0,
                    right[2], 0, -forward[2], 0,
                    this.transform.position.x, this.transform.position.y, this.transform.position.z, 1
                )
                break
            case 1:
                mat4.set(
                    this.modelMatrix,
                    -right[0], 0, forward[0], 0,
                    0, 1, 0, 0,
                    -right[2], 0, forward[2], 0,
                    this.transform.position.x, this.transform.position.y, this.transform.position.z, 1
                )
                break
            case 2:
                mat4.set(
                    this.modelMatrix,
                    -forward[0], 0, -right[0], 0,
                    0, 1, 0, 0,
                    -forward[2], 0, -right[2], 0,
                    this.transform.position.x, this.transform.position.y, this.transform.position.z, 1
                )
                break
            case 3:
                mat4.set(
                    this.modelMatrix,
                    forward[0], 0, right[0], 0,
                    0, 1, 0, 0,
                    forward[2], 0, right[2], 0,
                    this.transform.position.x, this.transform.position.y, this.transform.position.z, 1
                )
                break
        }


        camera.updateMatrix()
    }
}