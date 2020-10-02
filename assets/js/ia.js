const ia = {
    userChoise: document.getElementById('user'),
    case1: [83.33333333333333, 83.33333333333333, 166.66666666666666, 166.66666666666666],
    case2: [83.33333333333333, 250, 166.66666666666666, 166.66666666666666],
    case3: [83.33333333333333, 416.66666666666663, 166.66666666666666, 166.66666666666666],
    case4: [250, 83.33333333333333, 166.66666666666666, 166.66666666666666],
    case5: [250, 250, 166.66666666666666, 166.66666666666666],
    case6: [250, 416.66666666666663, 166.66666666666666, 166.66666666666666],
    case7: [416.66666666666663, 83.33333333333333, 166.66666666666666, 166.66666666666666],
    case8: [416.66666666666663, 250, 166.66666666666666, 166.66666666666666],
    case9: [416.66666666666663, 416.66666666666663, 166.66666666666666, 166.66666666666666],
    firstShot: true,
    secondeShot: false,

    init: function() {
        ia.launchFirstShots();
        ia.launchSecondeShot();
    },

    launchFirstShots: function() {
        if (ia.first) {
            if (app.strokes[0][0] === 'croix' || app.strokes[0][1] === 'croix' || app.strokes[0][2] === 'croix' ||
             app.strokes[1][0] === 'croix' || app.strokes[1][2] === 'croix' || app.strokes[2][0] === 'croix' ||
             app.strokes[2][1] === 'croix' || app.strokes[2][2] === 'croix' && app.strokes[1][1] !== 'rond') {

                app.createCircle(...ia.case5);
                app.strokes[1][1] = 'rond';
                ia.userChoise.innerHTML = 'joueur : croix';
                app.currentUser = true;
                ia.firstShot = false;
                ia.secondeShot = true;
    
            } else if (app.strokes[1][1] === 'croix' && app.strokes[0][0] !== 'rond') {

                app.createCircle(...ia.case1);
                app.strokes[0][0] = 'rond';
                ia.userChoise.innerHTML = 'joueur : croix';
                app.currentUser = true;
                ia.firstShot = false;
                ia.secondeShot = true;
    
            }
        }
    },

    launchSecondeShot: function() {
        if (ia.secondeShot) {

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