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

    iaCaseY: '',
    iaCaseX: '',
    blockedPlayer: false,

    init: function() {
        iaCircle.checkTwoSymbol();
        iaCircle.randomIa();
    },

    checkTwoSymbol: function() {
        // case 1 et 2
        if (app.strokes[0][0] === 'croix' && app.strokes[0][1] === 'croix' && app.strokes[0][2] !== 'rond' ||
        app.strokes[0][0] === 'rond' && app.strokes[0][1] === 'rond' && app.strokes[0][2] !== 'croix') {

            app.createCircle(...iaCircle.gameBox[2]);
            iaCircle.circlePosition(0, 2);

        // case 2 et 3
        } else if (app.strokes[0][1] === 'croix' && app.strokes[0][2] === 'croix' && app.strokes[0][0] !== 'rond' ||
        app.strokes[0][1] === 'rond' && app.strokes[0][2] === 'rond' && app.strokes[0][0] !== 'croix') {

            app.createCircle(...iaCircle.gameBox[0]);
            iaCircle.circlePosition(0, 0);

        // case 4 et 5
        } else if (app.strokes[1][0] === 'croix' && app.strokes[1][1] === 'croix' && app.strokes[1][2] !== 'rond' ||
        app.strokes[1][0] === 'rond' && app.strokes[1][1] === 'rond' && app.strokes[1][2] !== 'croix') {

            app.createCircle(...iaCircle.gameBox[5]);
            iaCircle.circlePosition(1, 2);

        // case 5 et 6
        } else if (app.strokes[1][1] === 'croix' && app.strokes[1][2] === 'croix' && app.strokes[1][0] !== 'rond' ||
        app.strokes[1][1] === 'rond' && app.strokes[1][2] === 'rond' && app.strokes[1][0] !== 'croix') {

            app.createCircle(...iaCircle.gameBox[3]);
            iaCircle.circlePosition(1, 0);

        // case 7 et 8
        } else if (app.strokes[2][0] === 'croix' && app.strokes[2][1] === 'croix' && app.strokes[2][2] !== 'rond' ||
        app.strokes[2][0] === 'rond' && app.strokes[2][1] === 'rond' && app.strokes[2][2] !== 'croix') {

            app.createCircle(...iaCircle.gameBox[8]);
            iaCircle.circlePosition(2, 2);

        // case 8 et 9
        } else if (app.strokes[2][1] === 'croix' && app.strokes[2][2] === 'croix' && app.strokes[2][0] !== 'rond' ||
        app.strokes[2][1] === 'rond' && app.strokes[2][2] === 'rond' && app.strokes[2][0] !== 'croix') {

            app.createCircle(...iaCircle.gameBox[6]);
            iaCircle.circlePosition(2, 0);

        // case 1 et 4
        } else if (app.strokes[0][0] === 'croix' && app.strokes[1][0] === 'croix' && app.strokes[2][0] !== 'rond' ||
        app.strokes[0][0] === 'rond' && app.strokes[1][0] === 'rond' && app.strokes[2][0] !== 'croix') {

            app.createCircle(...iaCircle.gameBox[6]);
            iaCircle.circlePosition(2, 0);

        // case 4 et 7
        } else if (app.strokes[1][0] === 'croix' && app.strokes[2][0] === 'croix' && app.strokes[0][0] !== 'rond' ||
        app.strokes[1][0] === 'rond' && app.strokes[2][0] === 'rond' && app.strokes[0][0] !== 'croix') {

            app.createCircle(...iaCircle.gameBox[0]);
            iaCircle.circlePosition(0, 0);

        // case 2 et 5
        } else if (app.strokes[0][1] === 'croix' && app.strokes[1][1] === 'croix' && app.strokes[2][1] !== 'rond' ||
        app.strokes[0][1] === 'rond' && app.strokes[1][1] === 'rond' && app.strokes[2][1] !== 'croix') {

            app.createCircle(...iaCircle.gameBox[7]);
            iaCircle.circlePosition(2, 1);

        // case 5 et 8
        } else if (app.strokes[1][1] === 'croix' && app.strokes[2][1] === 'croix' && app.strokes[0][1] !== 'rond' ||
        app.strokes[1][1] === 'rond' && app.strokes[2][1] === 'rond' && app.strokes[0][1] !== 'croix') {

            app.createCircle(...iaCircle.gameBox[1]);
            iaCircle.circlePosition(0, 1);
            
        // case 3 et 6
        } else if (app.strokes[0][2] === 'croix' && app.strokes[1][2] === 'croix' && app.strokes[2][2] !== 'rond' ||
        app.strokes[0][2] === 'rond' && app.strokes[1][2] === 'rond' && app.strokes[2][2] !== 'croix') {

            app.createCircle(...iaCircle.gameBox[8]);
            iaCircle.circlePosition(2, 2);

        // case 6 et 9
        } else if (app.strokes[1][2] === 'croix' && app.strokes[2][2] === 'croix' && app.strokes[0][2] !== 'rond' ||
        app.strokes[1][2] === 'rond' && app.strokes[2][2] === 'rond' && app.strokes[0][2] !== 'croix') {

            app.createCircle(...iaCircle.gameBox[2]);
            iaCircle.circlePosition(0, 2);

        // case 1 et 5
        } else if (app.strokes[0][0] === 'croix' && app.strokes[1][1] === 'croix' && app.strokes[2][2] !== 'rond' ||
        app.strokes[0][0] === 'rond' && app.strokes[1][1] === 'rond' && app.strokes[2][2] !== 'croix') {

            app.createCircle(...iaCircle.gameBox[8]);
            iaCircle.circlePosition(2, 2);

        // case 5 et 9
        } else if (app.strokes[1][1] === 'croix' && app.strokes[2][2] === 'croix' && app.strokes[0][0] !== 'rond' ||
        app.strokes[1][1] === 'rond' && app.strokes[2][2] === 'rond' && app.strokes[0][0] !== 'croix') {

            app.createCircle(...iaCircle.gameBox[0]);
            iaCircle.circlePosition(0, 0);

        // case 3 et 5
        } else if (app.strokes[0][2] === 'croix' && app.strokes[1][1] === 'croix' && app.strokes[2][0] !== 'rond' ||
        app.strokes[0][2] === 'rond' && app.strokes[1][1] === 'rond' && app.strokes[2][0] !== 'croix') {

            app.createCircle(...iaCircle.gameBox[6]);
            iaCircle.circlePosition(2, 0);

        // case 5 et 7
        } else if (app.strokes[1][1] === 'croix' && app.strokes[2][0] === 'croix' && app.strokes[0][2] !== 'rond' ||
        app.strokes[1][1] === 'rond' && app.strokes[2][0] === 'rond' && app.strokes[0][2] !== 'croix') {

            app.createCircle(...iaCircle.gameBox[2]);
            iaCircle.circlePosition(0, 2);

        // case 1 et 3
        } else if (app.strokes[0][1] === 'croix' && app.strokes[0][2] === 'croix' && app.strokes[0][1] !== 'rond' ||
        app.strokes[0][1] === 'rond' && app.strokes[0][2] === 'rond' && app.strokes[0][1] !== 'croix') {

            app.createCircle(...iaCircle.gameBox[1]);
            iaCircle.circlePosition(0, 1);

        // case 4 et 6
        } else if (app.strokes[1][0] === 'croix' && app.strokes[1][2] === 'croix' && app.strokes[1][1] !== 'rond' ||
        app.strokes[1][0] === 'rond' && app.strokes[1][2] === 'rond' && app.strokes[1][1] !== 'croix') {

            app.createCircle(...iaCircle.gameBox[4]);
            iaCircle.circlePosition(1, 1);

        // case 7 et 9
        } else if (app.strokes[2][0] === 'croix' && app.strokes[2][2] === 'croix' && app.strokes[2][1] !== 'rond' ||
        app.strokes[2][0] === 'rond' && app.strokes[2][2] === 'rond' && app.strokes[2][1] !== 'croix') {

            app.createCircle(...iaCircle.gameBox[7]);
            iaCircle.circlePosition(2, 1);

        // case 1 et 7
        } else if (app.strokes[0][0] === 'croix' && app.strokes[2][0] === 'croix' && app.strokes[1][0] !== 'rond' ||
        app.strokes[0][0] === 'rond' && app.strokes[2][0] === 'rond' && app.strokes[1][0] !== 'croix') {

            app.createCircle(...iaCircle.gameBox[3]);
            iaCircle.circlePosition(1, 0);

        // case 2 et 8
        } else if (app.strokes[0][1] === 'croix' && app.strokes[2][1] === 'croix' && app.strokes[1][1] !== 'rond' ||
        app.strokes[0][1] === 'rond' && app.strokes[2][1] === 'rond' && app.strokes[1][1] !== 'croix') {

            app.createCircle(...iaCircle.gameBox[4]);
            iaCircle.circlePosition(1, 1);

        // case 3 et 9
        } else if (app.strokes[0][2] === 'croix' && app.strokes[2][2] === 'croix' && app.strokes[1][2] !== 'rond' ||
        app.strokes[0][2] === 'rond' && app.strokes[2][2] === 'rond' && app.strokes[1][2] !== 'croix') {

            app.createCircle(...iaCircle.gameBox[5]);
            iaCircle.circlePosition(1, 2);

        // case 1 et 9
        } else if (app.strokes[0][0] === 'croix' && app.strokes[2][2] === 'croix' && app.strokes[1][1] !== 'rond' ||
        app.strokes[0][0] === 'rond' && app.strokes[2][2] === 'rond' && app.strokes[1][1] !== 'croix') {

            app.createCircle(...iaCircle.gameBox[4]);
            iaCircle.circlePosition(1, 1);

        // case 3 et 7
        } else if (app.strokes[0][2] === 'croix' && app.strokes[2][0] === 'croix' && app.strokes[1][1] !== 'rond' ||
        app.strokes[0][2] === 'rond' && app.strokes[2][0] === 'rond' && app.strokes[1][1] !== 'croix') {

            app.createCircle(...iaCircle.gameBox[4]);
            iaCircle.circlePosition(1, 1);
        }
    },

    circlePosition: function(y, x) {
        app.strokes[y][x] = 'rond';
        iaCircle.iaCaseY = y;
        iaCircle.iaCaseX = x;
        iaCircle.blockedPlayer = true;
    },

    randomIa: function() {
        let randomNumber = Math.floor(Math.random() * iaCircle.gameBox.length);
            
        if (!iaCircle.blockedPlayer) {

            if (randomNumber === 0 && app.strokes[0][0] === false) {

                app.createCircle(...iaCircle.gameBox[randomNumber]);
                app.strokes[0][0] = 'rond';
                iaCircle.iaCaseY = 0;
                iaCircle.iaCaseX = 0;
    
            } else if (randomNumber === 1 && app.strokes[0][1] === false) {
    
                app.createCircle(...iaCircle.gameBox[randomNumber]);
                app.strokes[0][1] = 'rond';
                iaCircle.iaCaseY = 0;
                iaCircle.iaCaseX = 1;
    
            } else if (randomNumber === 2 && app.strokes[0][2] === false) {
    
                app.createCircle(...iaCircle.gameBox[randomNumber]);
                app.strokes[0][2] = 'rond';
                iaCircle.iaCaseY = 0;
                iaCircle.iaCaseX = 2;
    
            } else if (randomNumber === 3 && app.strokes[1][0] === false) {
    
                app.createCircle(...iaCircle.gameBox[randomNumber]);
                app.strokes[1][0] = 'rond';
                iaCircle.iaCaseY = 1;
                iaCircle.iaCaseX = 0;
    
            } else if (randomNumber === 4 && app.strokes[1][1] === false) {
    
                app.createCircle(...iaCircle.gameBox[randomNumber]);
                app.strokes[1][1] = 'rond';
                iaCircle.iaCaseY = 1;
                iaCircle.iaCaseX = 1;
    
            } else if (randomNumber === 5 && app.strokes[1][2] === false) {
    
                app.createCircle(...iaCircle.gameBox[randomNumber]);
                app.strokes[1][2] = 'rond';
                iaCircle.iaCaseY = 1;
                iaCircle.iaCaseX = 2;
    
            } else if (randomNumber === 6 && app.strokes[2][0] === false) {
    
                app.createCircle(...iaCircle.gameBox[randomNumber]);
                app.strokes[2][0] = 'rond';
                iaCircle.iaCaseY = 2;
                iaCircle.iaCaseX = 0;
    
            } else if (randomNumber === 7 && app.strokes[2][1] === false) {
    
                app.createCircle(...iaCircle.gameBox[randomNumber]);
                app.strokes[2][1] = 'rond';
                iaCircle.iaCaseY = 2;
                iaCircle.iaCaseX = 1;
    
            } else if (randomNumber === 8 && app.strokes[2][2] === false) {
    
                app.createCircle(...iaCircle.gameBox[randomNumber]);
                app.strokes[2][2] = 'rond';
                iaCircle.iaCaseY = 2;
                iaCircle.iaCaseX = 2;
    
            } else {
                iaCircle.randomIa();
            }
        }
    },
}
