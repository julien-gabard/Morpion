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

        let buttonIa = document.getElementById('activeIa');
        buttonIa.addEventListener('click', app.activeButtonIa);
    },

    activeButtonIa: function() {
        let selectButtonIa = document.getElementById('activeIa');

        if (!app.selectIa) {

            selectButtonIa.classList.add('select');

        } else {

            selectButtonIa.classList.remove('select');

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
    },

    drawingCanvas: function() {
        const widthColumn = app.widthCanvas / app.numberColumn;
        const heightLine = app.heightCanvas / app.numberLine;

        // Fill the grid
        for (let i = 0; i < app.numberLine; i++) {
            for (let a = 0; a < app.numberColumn; a++) {
                app.strokes.push([]);
                app.strokes[i].push(false);
            }
        }

        // Creating the grid
        app.ctx.beginPath();
        app.ctx.lineWidth = 10;
        app.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';

        // Creation of lines
        for (let i = 0; i < app.numberLine - 1; i++) {
            app.ctx.moveTo(0, (i + 1) * (heightLine));
            app.ctx.lineTo(app.widthCanvas, (i + 1) * (heightLine));
            app.ctx.stroke();
        }

        // Creation of boxes
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

        let symbol;

        if (app.game) {
            
            if (!app.strokes[caseY][caseX]) {

                if (app.currentUser) {

                    app.createCross(middleY, middleX, widthColumn, heightLine);
                    app.strokes[caseY][caseX] = 'croix';
                    symbol = 'croix';
                    document.getElementById('user').innerHTML = 'Joueur : rond';

                } else if (!app.selectIa) {

                    app.createCircle(middleY, middleX, widthColumn, heightLine);
                    app.strokes[caseY][caseX] = 'rond';
                    symbol = 'rond';
                    document.getElementById('user').innerHTML = 'Joueur : croix';

                } else if (app.selectIa) {

                    // Using the file ia_circle.js
                    iaCircle.init();
                    symbol = 'rond';
                    caseY = iaCircle.iaCaseY;
                    caseX = iaCircle.iaCaseX;
                    document.getElementById('user').innerHTML = 'Joueur : croix';

                }

                app.currentUser = !app.currentUser;

                if (app.end()) {

                    document.getElementById('user').innerHTML = 'Egalite';
                    app.game = false;
                }
                
                if (app.gain(symbol, caseY, caseX)) {

                    if (app.currentUser) {

                        document.getElementById('user').innerHTML = 'Victoire du rond';
                        app.game = false;

                    } else {

                        document.getElementById('user').innerHTML = 'Victoire de la croix';
                        app.game = false;
                    }

                }
            }
        }
    },

    gain: function(symbol, caseY, caseX) {
        let numberSymbol = 0;

        // Checking on the lines of the X axis
        for (let i =0; i < app.numberColumn; i++) {

            if (app.strokes[caseY][i] === symbol) {

                numberSymbol ++;

                if (numberSymbol >= app.numberStrokeVictory) {
                    return true;
                }

            } else {
                numberSymbol = 0;
            }
        }

        numberSymbol = 0;

        // Check on Y axis lines
        for (let i = 0; i < app.numberLine; i++) {

            if (app.strokes[i][caseX] === symbol) {

                numberSymbol ++;

                if (numberSymbol >= app.numberStrokeVictory) {
                    return true;
                }

            } else {
                numberSymbol = 0;
            }
        }

        numberSymbol = 0;

        // Descending diagonal check
        let x = caseX * 1;
        let y = caseY * 1;

        while (x > 0 && y > 0) {
            x --;
            y --;
        }

        while (x < app.numberColumn && y < app.numberLine) {

            if (app.strokes[y][x] === symbol) {
    
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

        // Ascending diagonal check
        x = caseX * 1;
        y = caseY * 1;

        while (x < app.numberColumn -1 && y > 0) {

            x ++;
            y --;
        }

        while (x >= 0 && y < app.numberLine) {

            if (app.strokes[y][x] === symbol) {
    
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
    
                if (app.strokes[i][a] === false) {
                    return false;
                }
            }
        }
    
        return true;
    },
}

document.addEventListener('DOMContentLoaded', app.init);