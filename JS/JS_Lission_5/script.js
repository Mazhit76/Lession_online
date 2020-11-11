"use strict"
window.onload = function drawChes() {
    let mainBlock = document.querySelector('.main-block');
    let block;
    let flag = false;
    let Numerarion = {
        0: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
        9: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    };
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            block = document.createElement('div');
            if (Numerarion[i] !== undefined && Numerarion[i][j] !== undefined) {
                block.innerHTML = Numerarion[i][j];
                block.className = 'block white';
                block.style.textAlign = 'center'
                mainBlock.appendChild(block);
            }
            if (j == 0) flag = !flag;

            if (flag) block.className = 'block black';
            else block.className = 'block white';
            mainBlock.appendChild(block);
            flag = !flag;
        }
    }
}
//drawChes();
