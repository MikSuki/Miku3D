document.addEventListener('keydown', function (event) {
    // up
    if (event.keyCode == 87) {
        player.walk(0)
    }
    // down
    else if (event.keyCode == 83) {
        player.walk(1)
    }
    // left
    else if (event.keyCode == 65) {
        player.walk(2)
    }
    // right
    else if (event.keyCode == 68) {
        player.walk(3)
    }
    // jump
    if (event.keyCode == 32) {
        if(player.isJump == false)
            player.isJump = true
    }
});