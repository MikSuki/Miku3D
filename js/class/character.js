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

        this.walkDir = -1


        this.isJump = false
        this.jumpForce = 0.2
        this.jumpCnt = 40

        this.collider = {
            minX: -1,
            maxX: 1,
            minY: -7,
            maxY: 1,
            minZ: -0.5,
            maxZ: 0.5,
        }
        var theta = Math.atan(0.5 / 1) * 180 / Math.PI
        this.colliderRadius = Math.sqrt(1 + 0.5 ** 2)
        this.colliderTheta = [
            (90 - theta) / 180 * Math.PI,
            (90 + theta) / 180 * Math.PI,
            (270 - theta) / 180 * Math.PI,
            (270 + theta) / 180 * Math.PI
        ]

    }

    update(deltaTime) {
        if (this.isJump)
            this.jump()
        if (this.walkDir != -1)
            this.walk(deltaTime)

        this.setTranslation()
        camera.updateMatrix()
    }

    walk(deltaTime) {
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

        switch (this.walkDir) {
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
        v1 *= deltaTime * 10
        v2 *= deltaTime * 10

        if (this.collider.minY < models.ground[models.ground.length - 1].collider.maxY) {
            // angle
            let dot = -v1 * 1
            let len = Math.sqrt(v1 ** 2 + v2 ** 2) * 1
            let theta = Math.acos(dot / len)
            if (v2 < 0) theta = - theta
            this.theta = theta

            let shapeA = {
                x: this.transform.position.x + v1,
                y: this.transform.position.z + v2,
                vertex: []
            }
            for (let i = 0; i < 4; ++i) {
                let theta = this.theta + this.colliderTheta[i]
                shapeA.vertex.push({
                    x: shapeA.x + this.colliderRadius * Math.cos(theta),
                    y: shapeA.y + this.colliderRadius * Math.sin(theta)
                })
            }
            let shapeB = {
                x: models.ground[models.ground.length - 1].transform.position.x,
                y: models.ground[models.ground.length - 1].transform.position.z,
                vertex: [
                    { x: models.ground[models.ground.length - 1].collider.minX, y: models.ground[models.ground.length - 1].collider.minZ },
                    { x: models.ground[models.ground.length - 1].collider.maxX, y: models.ground[models.ground.length - 1].collider.minZ },
                    { x: models.ground[models.ground.length - 1].collider.maxX, y: models.ground[models.ground.length - 1].collider.maxZ },
                    { x: models.ground[models.ground.length - 1].collider.minX, y: models.ground[models.ground.length - 1].collider.maxZ },
                ]
            }
            let depth = gjk(shapeA, shapeB)
            if (depth != -1) {
                let vert_angle = getVerticalAngle(
                    models.ground[models.ground.length - 1].collider,
                    {
                        x: shapeA.x - v1,
                        y: shapeA.y - v2
                    },
                    shapeA.vertex[0],
                    shapeA.vertex[3]
                );
                v1 += depth * Math.cos(vert_angle)
                v2 += depth * Math.sin(vert_angle)
            }
        }

        this.translate(
            v1,
            0,
            v2
        )
        camera.translate(
            v1,
            0,
            v2
        )

        switch (this.walkDir) {
            case 0:
                this.setRotate(
                    right[0], 0, -forward[0],
                    0, 1, 0,
                    right[2], 0, -forward[2],
                )
                break
            case 1:
                this.setRotate(
                    -right[0], 0, forward[0],
                    0, 1, 0,
                    -right[2], 0, forward[2],
                )
                break
            case 2:
                this.setRotate(
                    -forward[0], 0, -right[0],
                    0, 1, 0,
                    -forward[2], 0, -right[2],
                )
                break
            case 3:
                this.setRotate(
                    forward[0], 0, right[0],
                    0, 1, 0,
                    forward[2], 0, right[2],
                )
                break
        }
    }

    jump() {
        if (this.jumpCnt > 20) {
            this.transform.position.y += this.jumpForce
            this.collider.minY += this.jumpForce
            this.collider.maxY += this.jumpForce
        }
        else if (this.jumpCnt > 0) {
            this.transform.position.y -= this.jumpForce
            this.collider.minY -= this.jumpForce
            this.collider.maxY -= this.jumpForce
        }
        else {
            this.isJump = false
            this.jumpCnt = 40 + 1
        }
        --this.jumpCnt
    }
}