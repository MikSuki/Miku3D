class GameObject {
    constructor(x, y, z, sx, sy, sz) {
        this.transform = {
            position: {
                x: x || 0,
                y: y || 0,
                z: z || 0
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            },
            scale: {
                x: sx || 1,
                y: sy || 1,
                z: sz || 1
            },
        }
        this.theta = 0
        this.vertex = []
        this.texture = null
        this.modelMatrix = null
        
        this.collider = null 

        this.updateMatrix()
    }

    updateMatrix() {
        var matrix = mat4.create()
        // mat4.set(
        //     matrix,
        //     matrix[0], matrix[1], matrix[2], matrix[3],
        //     matrix[4], matrix[5], matrix[6], matrix[7],
        //     matrix[8], matrix[9], matrix[10], matrix[11],
        //     this.transform.position.x, this.transform.position.y, this.transform.position.z, 1
        // )

        mat4.translate(
            matrix,
            matrix,
            vec3.fromValues(
                this.transform.position.x,
                this.transform.position.y,
                this.transform.position.z
            )
        )

        mat4.scale(
            matrix,
            matrix,
            vec3.fromValues(
                this.transform.scale.x,
                this.transform.scale.y,
                this.transform.scale.z
            )
        )

        this.modelMatrix = matrix
    }

    translate(x, y, z) {
        this.transform.position.x += x
        this.transform.position.y += y
        this.transform.position.z += z
        // if(this.collider != null && this.vertex != undefined && this.colliderRadius != undefined){
        //     this.collider.minX += x
        //     this.collider.maxX += x
        //     this.collider.minY += y
        //     this.collider.maxY += y
        //     this.collider.minZ += z
        //     this.collider.maxZ += z
        //     //this.colliderTheta
        //     this.vertex = []
        //     for(let i = 0; i < 4; ++i){
        //         let theta = this.theta + this.colliderTheta[i]
        //         this.vertex.push({
        //             x: this.transform.position.x + this.colliderRadius * Math.cos(theta),
        //             y: this.transform.position.z + this.colliderRadius * Math.sin(theta)
        //         })
        //     }
        //     // console.log('vertex')
        //     // console.log(
        //     //     this.vertex[0],
        //     //     this.vertex[1],
        //     //     this.vertex[2],
        //     //     this.vertex[3],
        //     // )
        // }
        // mat4.translate(
        //     this.modelMatrix,
        //     this.modelMatrix,
        //     vec3.fromValues(
        //         x,
        //         y,
        //         z
        //     )
        // )
    }

    rotate(yaw, pitch, update) {
        this.transform.rotation.x = yaw
        this.transform.rotation.y = pitch

        if (update)
            this.updateMatrix()
    }

    setTranslation() {
        this.modelMatrix[12] = this.transform.position.x
        this.modelMatrix[13] = this.transform.position.y
        this.modelMatrix[14] = this.transform.position.z
    }

    setRotate(v0, v1, v2, v4, v5, v6, v8, v9, v10){
        this.modelMatrix[0] = v0
        this.modelMatrix[1] = v1
        this.modelMatrix[2] = v2
        this.modelMatrix[4] = v4
        this.modelMatrix[5] = v5
        this.modelMatrix[6] = v6
        this.modelMatrix[8] = v8
        this.modelMatrix[9] = v9
        this.modelMatrix[10] = v10
    }

    setScale(x, y, z, update) {
        this.transform.scale.x = x
        this.transform.scale.y = y
        this.transform.scale.z = z
        if(this.collider != null){
            this.collider.minX = x
            this.collider.maxX = x
            this.collider.minY = y
            this.collider.maxY = y
            this.collider.minZ = z
            this.collider.maxZ = z
        }
        if (update)
            this.updateMatrix()
    }
}

