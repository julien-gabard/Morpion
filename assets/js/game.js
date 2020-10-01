const app = {

    // Récupération du canvas
    canvas: document.getElementById('canvas'),
    ctx: canvas.getContext('2d'),

    // Récuperation de la taille du canvas
    heightCanvas: canvas.height,
    widthCanvas: canvas.width,

    // Taille des grilles canvas
    numberColumn: 3,
    numberLine: 3,

    // Choix du nombre de victoire
    numberStrokeVictory: 3,

    // Propriétés du jeu
    game: true,
    currentUser: true,
    strokes: [],

    init: function() {
        app.drawingCanvas();
        app.canvas.addEventListener('click', app.play, false);
    },

    /**
     * Mise en forme du canvas
     */
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

    /**
     * Créer une croix
     */
    createCross: function(middleY, middleX) {
        const widthColumn = app.widthCanvas / app.numberColumn;
        const heightLine = app.heightCanvas / app.numberLine;
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

    /**
     * Créer un cercle
     */
    createCircle: function(middleY, middleX) {
        const widthColumn = app.widthCanvas / app.numberColumn;
        const heightLine = app.heightCanvas / app.numberLine;
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

    /**
     * Déroulement du jeu
     */
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

                    app.createCross(middleY, middleX);
                    app.strokes[caseY][caseX] = 'croix';
                    var symbol = 'croix';
                    document.getElementById('user').innerHTML = 'Joueur : Cercle';

                } else {

                    app.createCircle(middleY, middleX);
                    app.strokes[caseY][caseX] = 'cercle';
                    var symbol = 'cercle';
                    document.getElementById('user').innerHTML = 'Joueur : Croix';
                }

                app.currentUser = !app.currentUser;

                if (app.gain(symbol, caseY, caseX)) {

                    if (app.currentUser) {

                        document.getElementById('user').innerHTML = 'Victoire du cercle';
                        app.game = false;

                    } else {

                        document.getElementById('user').innerHTML = 'Victoire de la croix';
                        app.game = false;
                    }

                } else {

                    if (app.end()) {
                        app.game = false;
                        document.getElementById('user').innerHTML = 'Egalite';
                    }
                }
            }
        }
    },

    /**
     * Vérification si il y a un gagnant
     */
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

    /**
     * Vérification de fin du jeu
     */
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