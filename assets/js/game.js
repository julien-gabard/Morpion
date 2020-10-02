const app = {

    canvas: document.getElementById('canvas'),
    ctx: canvas.getContext('2d'),
    heightCanvas: canvas.height,
    widthCanvas: canvas.width,
    numberColumn: 3,
    numberLine: 3,
    numberStrokeVictory: 3,
    game: true,
    currentUser: true,
    strokes: [],
    selectIa: false,

    init: function() {
        app.drawingCanvas();
        app.canvas.addEventListener('click', app.play, false);

        let buttonReset = document.getElementById('reset');
        buttonReset.addEventListener('click', app.reset);

        let buttonOnePlayer = document.getElementById('onePlayer');
        buttonOnePlayer.addEventListener('click', app.changeNumberPlayer);

        let buttonTwoPlayers = document.getElementById('twoPlayers');
        buttonTwoPlayers.addEventListener('click', app.changeNumberPlayer);
    },

    changeNumberPlayer: function() {
        let selectButtonOnePlayer = document.getElementById('onePlayer');
        let selectButtonTwoPlayers = document.getElementById('twoPlayers');

        if (!app.selectIa) {

            selectButtonOnePlayer.classList.add('select');
            selectButtonTwoPlayers.classList.remove('select');

        } else {

            selectButtonTwoPlayers.classList.add('select');
            selectButtonOnePlayer.classList.remove('select');

        }

        app.selectIa = !app.selectIa;
    },

    reset: function() {
        app.ctx.clearRect(0, 0, app.widthCanvas, app.heightCanvas);
        app.strokes = [];
        app.game = true;
        app.currentUser = true;

        if (app.currentUser) {
            document.getElementById('user').innerHTML = 'Joueur : croix';
        } else {
            document.getElementById('user').innerHTML = 'Joueur : rond';
        }

        app.init();

        // Réinitialise les proprietées du module ia_circle.js par defaults
        iaCircle.firstShot = true;
        iaCircle.firstCenter = false;
        iaCircle.secondeShot = false;
    },

    drawingCanvas: function() {
        const widthColumn = app.widthCanvas / app.numberColumn;
        const heightLine = app.heightCanvas / app.numberLine;

        // Remplissage de la grille
        for (let i = 0; i < app.numberLine; i++) {
            for (let a = 0; a < app.numberColumn; a++) {
                app.strokes.push([]);
                app.strokes[i].push(false);
            }
        }

        // Création de la grille
        app.ctx.beginPath();
        app.ctx.lineWidth = 10;
        app.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';

        // Création des lignes
        for (let i = 0; i < app.numberLine - 1; i++) {
            app.ctx.moveTo(0, (i + 1) * (heightLine));
            app.ctx.lineTo(app.widthCanvas, (i + 1) * (heightLine));
            app.ctx.stroke();
        }

        // Création des cases
        for (let i = 0; i < app.numberColumn - 1; i++) {
            app.ctx.moveTo((i + 1) * (widthColumn), 0);
            app.ctx.lineTo((i + 1) * (widthColumn), app.heightCanvas);
            app.ctx.stroke();
        }

        app.ctx.closePath();
    },

    createCross: function(middleY, middleX, widthColumn, heightLine) {
        const ratioCross = 0.7;
        const thicknessCross = 10;
        const colorCross = 'rgba(255, 255, 255, 0.3)';

        app.ctx.beginPath();
        app.ctx.lineWidth = thicknessCross;
        app.ctx.strokeStyle = colorCross;
        app.ctx.moveTo(middleX - (widthColumn / 2) * ratioCross, middleY - (heightLine / 2) * ratioCross);
        app.ctx.lineTo(middleX + (widthColumn / 2) * ratioCross, middleY + (heightLine / 2) * ratioCross);
        app.ctx.moveTo(middleX + (widthColumn / 2) * ratioCross, middleY - (heightLine / 2) * ratioCross);
        app.ctx.lineTo(middleX - (widthColumn / 2) * ratioCross, middleY + (heightLine / 2) * ratioCross);
        app.ctx.stroke();
        app.ctx.closePath();
    },

    createCircle: function(middleY, middleX, widthColumn, heightLine) {
        const ratioCircle = 0.7;
        const thicknessCircle = 10;
        const colorCircle = 'rgba(255, 255, 255, 0.4)';
        let rayCircle = widthColumn;

        if (widthColumn > heightLine) {
            rayCircle = heightLine;
        }

        rayCircle /= 2;
        rayCircle *= ratioCircle;

        app.ctx.beginPath();
        app.ctx.lineWidth = thicknessCircle;
        app.ctx.strokeStyle = colorCircle;
        app.ctx.arc(middleX, middleY, rayCircle, 0, 2 * Math.PI);
        app.ctx.stroke();
    },

    play: function(event) {
        let x = event.clientX - app.canvas.offsetLeft;
        let y = event.clientY - app.canvas.offsetTop + document.documentElement.scrollTop;

        const widthColumn = app.widthCanvas / app.numberColumn;
        const heightLine = app.heightCanvas / app.numberLine;

        let caseX = parseInt(x / (app.heightCanvas / app.numberColumn));
        let caseY = parseInt(y / (app.widthCanvas / app.numberLine));

        let middleX = caseX * widthColumn + widthColumn / 2;
        let middleY = caseY * heightLine + heightLine / 2;

        if (app.game) {
            
            if (!app.strokes[caseY][caseX]) {

                if (app.currentUser) {

                    app.createCross(middleY, middleX, widthColumn, heightLine);
                    app.strokes[caseY][caseX] = 'croix';
                    var symbol = 'croix';
                    document.getElementById('user').innerHTML = 'Joueur : rond';

                } else {

                    app.createCircle(middleY, middleX, widthColumn, heightLine);
                    app.strokes[caseY][caseX] = 'rond';
                    var symbol = 'rond';
                    document.getElementById('user').innerHTML = 'Joueur : croix';
                }

                app.currentUser = !app.currentUser;

                if (app.gain(symbol, caseY, caseX)) {

                    if (app.currentUser) {

                        document.getElementById('user').innerHTML = 'Victoire du rond';
                        app.game = false;

                    } else {

                        document.getElementById('user').innerHTML = 'Victoire de la croix';
                        app.game = false;
                    }

                } else if (app.end()) {

                    app.game = false;
                    document.getElementById('user').innerHTML = 'Egalite';
                }

                if (app.selectIa) {
                    iaCircle.init();
                }
            }
        }
    },

    gain: function(symbol, caseY, caseX) {
        let numberSymbol = 0;

        // Vérification sur les lignes de l'axe X
        for (let i =0; i < app.numberColumn; i++) {

            if (app.strokes[caseY][i] == symbol) {

                numberSymbol ++;

                if (numberSymbol >= app.numberStrokeVictory) {
                    return true;
                }

            } else {
                numberSymbol = 0;
            }
        }

        numberSymbol = 0;

        // Vérification sur les lignes de l'axe Y

        for (let i = 0; i < app.numberLine; i++) {

            if (app.strokes[i][caseX] == symbol) {

                numberSymbol ++;

                if (numberSymbol >= app.numberStrokeVictory) {
                    return true;
                }

            } else {
                numberSymbol = 0;
            }
        }

        numberSymbol = 0;

        // Vérification diagonale descendante
        let x = caseX * 1;
        let y = caseY * 1;

        while (x > 0 && y > 0) {
            x --;
            y --;
        }

        while (x < app.numberColumn && y < app.numberLine) {

            if (app.strokes[y][x] == symbol) {
    
                numberSymbol ++;
                
                if (numberSymbol >= app.numberStrokeVictory) {
                    return true;
                }
    
            } else {
                numberSymbol = 0;
            }
    
            x ++;
            y ++;
        }

        numberSymbol = 0;

        // Vérification diagonale asscendante
        x = caseX * 1;
        y = caseY * 1;

        while (x < app.numberColumn -1 && y > 0) {

            x ++;
            y --;
        }

        while (x >= 0 && y < app.numberLine) {

            if (app.strokes[y][x] == symbol) {
    
                numberSymbol ++;
    
                if (numberSymbol >= app.numberStrokeVictory) {
                    return true;
                }
    
            } else {
                numberSymbol = 0;
            }
    
            x --;
            y ++;
        }

        return false;
    },

    end: function() {
        for (let i = 0; i < app.numberLine; i++) {

            for (let a = 0; a < app.numberColumn; a++) {
    
                if (app.strokes[i][a] == false) {
                    return false;
                }
            }
        }
    
        return true;
    },
}

document.addEventListener('DOMContentLoaded', app.init);