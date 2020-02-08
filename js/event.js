onkeydown = onkeyup = function (e) {
    key[e.keyCode] = e.type == 'keydown'
    // up
    if (key[87])
        player.walkDir = 0
    // down
    else if (key[83])
        player.walkDir = 1
    // left
    else if (key[65])
        player.walkDir = 2
    // right
    else if (key[68])
        player.walkDir = 3
    else
        player.walkDir = -1
    // jump
    if (key[32]) {
        if (player.isJump == false){
            player.isJump = true
            player.jumpCnt = 20
            this.console.log('in')
        }
    }
}