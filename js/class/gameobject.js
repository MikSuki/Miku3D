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

    translate(x, y, z, update) {
        this.transform.position.x += x
        this.transform.position.y += y
        this.transform.position.z += z
        if(this.collider != null){
            this.collider.minX += x
            this.collider.maxX += x
            this.collider.minY += y
            this.collider.maxY += y
            this.collider.minZ += z
            this.collider.maxZ += z
        }
        mat4.translate(
            this.modelMatrix,
            this.modelMatrix,
            vec3.fromValues(
                x,
                y,
                z
            )
        )

        // if (update)
        //     this.updateMatrix()


    }

    rotate(yaw, pitch, update) {
        this.transform.rotation.x = yaw
        this.transform.rotation.y = pitch

        if (update)
            this.updateMatrix()
    }

    setTranslation(x, y, z, update) {
        this.transform.position.x = x
        this.transform.position.y = y
        this.transform.position.z = z
        if (update)
            this.updateMatrix()
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

