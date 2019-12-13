class Camera extends GameObject {
    constructor() {
        super()
        this.lookPt = new GameObject()
        this.isLookAt = false
        this.lookRadius = 30
    }

    updateMatrix() {
        var matrix = mat4.create()

        mat4.set(
            matrix,
            matrix[0], matrix[1], matrix[2], matrix[3],
            matrix[4], matrix[5], matrix[6], matrix[7],
            matrix[8], matrix[9], matrix[10], matrix[11],
            this.transform.position.x, this.transform.position.y, this.transform.position.z, 1
        )

        if (this.isLookAt) {
            mat4.lookAt(
                matrix,
                vec3.fromValues(matrix[12], matrix[13], matrix[14]),
                vec3.fromValues(this.lookPt.transform.position.x, this.lookPt.transform.position.y, this.lookPt.transform.position.z),
                vec3.fromValues(0, 1, 0)
            )
        }

        this.modelMatrix = matrix
    }

    rotate(yaw, pitch, update) {
        this.transform.rotation.x = yaw
        this.transform.rotation.y = pitch
        this.transform.position.x =
            this.lookRadius * Math.cos(toRad(pitch)) * Math.cos(toRad(90 - yaw))
            + this.lookPt.transform.position.x
        this.transform.position.y =
            this.lookRadius * Math.sin(toRad(pitch))
            + this.lookPt.transform.position.y
        this.transform.position.z =
            -this.lookRadius * Math.cos(toRad(pitch)) * Math.sin(toRad(90 - yaw))
            + this.lookPt.transform.position.z

        if (update)
            this.updateMatrix()
    }

    zoom(v, update) {
        this.lookRadius += v

        this.transform.position.x +=
            v * Math.cos(toRad(this.transform.rotation.y)) * Math.cos(toRad(90 - this.transform.rotation.x))
        this.transform.position.y +=
            v * Math.sin(toRad(this.transform.rotation.y))
        this.transform.position.z +=
            -v * Math.cos(toRad(this.transform.rotation.y)) * Math.sin(toRad(90 - this.transform.rotation.x))

        if (update)
            this.updateMatrix()
    }
}
