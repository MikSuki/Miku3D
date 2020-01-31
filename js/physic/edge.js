// collision edge vertical angle
function getVerticalAngle(boundary, center, left, right) {
    let v = posIn3by3(center),
        side_angle = 0;
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

    side_angle = Math.acos(dot(side, { x: 1, y: 0 }) / length(side))
    if (side.y < 0) side_angle *= -1
    return side_angle - 1.571

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