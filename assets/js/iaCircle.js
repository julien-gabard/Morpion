const iaCircle = {

    userChoise: document.getElementById('user'),

    // Coordonées des cases (de 1 à 9)
    case1: [83.33333333333333, 83.33333333333333, 166.66666666666666, 166.66666666666666],
    case2: [83.33333333333333, 250, 166.66666666666666, 166.66666666666666],
    case3: [83.33333333333333, 416.66666666666663, 166.66666666666666, 166.66666666666666],
    case4: [250, 83.33333333333333, 166.66666666666666, 166.66666666666666],
    case5: [250, 250, 166.66666666666666, 166.66666666666666],
    case6: [250, 416.66666666666663, 166.66666666666666, 166.66666666666666],
    case7: [416.66666666666663, 83.33333333333333, 166.66666666666666, 166.66666666666666],
    case8: [416.66666666666663, 250, 166.66666666666666, 166.66666666666666],
    case9: [416.66666666666663, 416.66666666666663, 166.66666666666666, 166.66666666666666],

    // Déroulement du jeu
    firstShot: true,
    firstCenter: false,
    secondeShot: false,

    init: function() {
        console.log('ia.init OK');
        iaCircle.launchFirstShots();
        iaCircle.launchSecondeShot();
    },

    launchFirstShots: function() {
        if (iaCircle.firstShot) {
            if (app.strokes[0][0] === 'croix' || app.strokes[0][1] === 'croix' || app.strokes[0][2] === 'croix' ||
             app.strokes[1][0] === 'croix' || app.strokes[1][2] === 'croix' || app.strokes[2][0] === 'croix' ||
             app.strokes[2][1] === 'croix' || app.strokes[2][2] === 'croix') {

                app.createCircle(...ia.case5);
                app.strokes[1][1] = 'rond';
                iaCircle.userChoise.innerHTML = 'joueur : croix';
                app.currentUser = true;
                iaCircle.firstShot = false;
                iaCircle.secondeShot = true;
    
            } else if (app.strokes[1][1] === 'croix') {

                app.createCircle(...ia.case1);
                app.strokes[0][0] = 'rond';
                iaCircle.userChoise.innerHTML = 'joueur : croix';
                app.currentUser = true;
                iaCircle.firstShot = false;
                iaCircle.secondeShot = true;
                iaCircle.firstCenter = true;
    
            }
        }
    },

    launchSecondeShot: function() {
        if (iaCircle.secondeShot && iaCircle.firstCenter) {
            if (app.strokes[0][1] === 'croix') {

                app.createCircle(...ia.case8);
                app.strokes[2][1] = 'rond';
                iaCircle.userChoise.innerHTML = 'joueur : croix';
                app.currentUser = true;
                iaCircle.secondeShot = false;

            } else if (app.strokes[0][2] === 'croix') {

                app.createCircle(...ia.case7);
                app.strokes[2][0] = 'rond';
                iaCircle.userChoise.innerHTML = 'joueur : croix';
                app.currentUser = true;
                iaCircle.secondeShot = false;

            } else if (app.strokes[1][2] === 'croix') {

                app.createCircle(...ia.case4);
                app.strokes[1][0] = 'rond';
                iaCircle.userChoise.innerHTML = 'joueur : croix';
                app.currentUser = true;
                iaCircle.secondeShot = false;

            } else if (app.strokes[2][2] === 'croix') {

                app.createCircle(...ia.case7);
                app.strokes[2][0] = 'rond';
                iaCircle.userChoise.innerHTML = 'joueur : croix';
                app.currentUser = true;
                iaCircle.secondeShot = false;

            } else if (app.strokes[2][1] === 'croix') {

                app.createCircle(...ia.case2);
                app.strokes[1][1] = 'rond';
                iaCircle.userChoise.innerHTML = 'joueur : croix';
                app.currentUser = true;
                iaCircle.secondeShot = false;

            } else if (app.strokes[2][0] === 'croix') {

                app.createCircle(...ia.case3);
                app.strokes[0][2] = 'rond';
                iaCircle.userChoise.innerHTML = 'joueur : croix';
                app.currentUser = true;
                iaCircle.secondeShot = false;

            } else if (app.strokes[1][0] === 'croix') {

                app.createCircle(...ia.case6);
                app.strokes[1][2] = 'rond';
                ia.userChoise.innerHTML = 'joueur : croix';
                app.currentUser = true;
                ia.secondeShot = false;

            }
        }
    },
}

// haut gauche
// 1 - [0][0] : 83.33333333333333, 83.33333333333333, 166.66666666666666, 166.66666666666666
// haut milieux
// 2 - [0][1] : 83.33333333333333, 250, 166.66666666666666, 166.66666666666666
// haut droite
// 3 - [0][2] : 83.33333333333333, 416.66666666666663, 166.66666666666666, 166.66666666666666
// milieux gauche
// 4 - [1][0] : 250, 83.33333333333333, 166.66666666666666, 166.66666666666666
// milieux milieux
// 5 - [1][1] : 250, 250, 166.66666666666666, 166.66666666666666
// milieux droite
// 6 - [1][2] : 250, 416.66666666666663, 166.66666666666666, 166.66666666666666
// bas gauche
// 7 - [2][0] : 416.66666666666663, 83.33333333333333, 166.66666666666666, 166.66666666666666
// bas milieux
// 8 - [2][1] : 416.66666666666663, 250, 166.66666666666666, 166.66666666666666
// bas droite
// 9 - [2][2] : 416.66666666666663, 416.66666666666663, 166.66666666666666, 166.66666666666666