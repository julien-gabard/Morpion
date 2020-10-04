const iaCircle = {

    // Coordinates of boxes 1 to 9
    gameBox: [
        [83.33333333333333, 83.33333333333333, 166.66666666666666, 166.66666666666666],
        [83.33333333333333, 250, 166.66666666666666, 166.66666666666666],
        [83.33333333333333, 416.66666666666663, 166.66666666666666, 166.66666666666666],
        [250, 83.33333333333333, 166.66666666666666, 166.66666666666666],
        [250, 250, 166.66666666666666, 166.66666666666666],
        [250, 416.66666666666663, 166.66666666666666, 166.66666666666666],
        [416.66666666666663, 83.33333333333333, 166.66666666666666, 166.66666666666666],
        [416.66666666666663, 250, 166.66666666666666, 166.66666666666666],
        [416.66666666666663, 416.66666666666663, 166.66666666666666, 166.66666666666666],
    ],

    init: function() {
        iaCircle.startOfIa();
    },

    /**
     * TODO
     */
    checkTwoSymbol: function() {
        if (app.strokes[0][0] === 'croix' && app.strokes[0][1] === 'croix') {
            
        }
    },

    startOfIa: function() {
        let randomNumber = Math.floor(Math.random() * iaCircle.gameBox.length);

        if (!app.currentUser && app.game) {
            
            if (randomNumber === 0 && app.strokes[0][0] === false) {

                app.createCircle(...iaCircle.gameBox[randomNumber]);
                app.strokes[0][0] = 'rond';

            } else if (randomNumber === 1 && app.strokes[0][1] === false) {

                app.createCircle(...iaCircle.gameBox[randomNumber]);
                app.strokes[0][1] = 'rond';

            } else if (randomNumber === 2 && app.strokes[0][2] === false) {

                app.createCircle(...iaCircle.gameBox[randomNumber]);
                app.strokes[0][2] = 'rond';

            } else if (randomNumber === 3 && app.strokes[1][0] === false) {

                app.createCircle(...iaCircle.gameBox[randomNumber]);
                app.strokes[1][0] = 'rond';

            } else if (randomNumber === 4 && app.strokes[1][1] === false) {

                app.createCircle(...iaCircle.gameBox[randomNumber]);
                app.strokes[1][1] = 'rond';

            } else if (randomNumber === 5 && app.strokes[1][2] === false) {

                app.createCircle(...iaCircle.gameBox[randomNumber]);
                app.strokes[1][2] = 'rond';

            } else if (randomNumber === 6 && app.strokes[2][0] === false) {

                app.createCircle(...iaCircle.gameBox[randomNumber]);
                app.strokes[2][0] = 'rond';

            } else if (randomNumber === 7 && app.strokes[2][1] === false) {

                app.createCircle(...iaCircle.gameBox[randomNumber]);
                app.strokes[2][1] = 'rond';

            } else if (randomNumber === 8 && app.strokes[2][2] === false) {

                app.createCircle(...iaCircle.gameBox[randomNumber]);
                app.strokes[2][2] = 'rond';

            } else {
                iaCircle.startOfIa();
            }
        }
    },
}

/***********
 * gameBox *
 ***********/
// haut gauche
// 0 - [0][0] : 83.33333333333333, 83.33333333333333, 166.66666666666666, 166.66666666666666
// haut milieux
// 1 - [0][1] : 83.33333333333333, 250, 166.66666666666666, 166.66666666666666
// haut droite
// 2 - [0][2] : 83.33333333333333, 416.66666666666663, 166.66666666666666, 166.66666666666666
// milieux gauche
// 3 - [1][0] : 250, 83.33333333333333, 166.66666666666666, 166.66666666666666
// milieux milieux
// 4 - [1][1] : 250, 250, 166.66666666666666, 166.66666666666666
// milieux droite
// 5 - [1][2] : 250, 416.66666666666663, 166.66666666666666, 166.66666666666666
// bas gauche
// 6 - [2][0] : 416.66666666666663, 83.33333333333333, 166.66666666666666, 166.66666666666666
// bas milieux
// 7 - [2][1] : 416.66666666666663, 250, 166.66666666666666, 166.66666666666666
// bas droite
// 8 - [2][2] : 416.66666666666663, 416.66666666666663, 166.66666666666666, 166.66666666666666