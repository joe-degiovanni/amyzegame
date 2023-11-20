class Coord {
    x;
    y;

    constructor(commaSeparatedCoords) {
        this.x = parseInt(commaSeparatedCoords.split(',')[0].trim());
        this.y = parseInt(commaSeparatedCoords.split(',')[1].trim());
    }
}

class Coordinate {
    constructor(row, col) {
        this.x = col;
        this.y = row;
    }

    static random = function () {
        return new Coordinate(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));
    }

    toString() {
        return `${this.x},${this.y}`;
    }
}

class Cell {
    constructor(coordinate, above, below, left, right) {
        this.coordinate = coordinate;
        this.above = above;
        this.below = below;
        this.left = left;
        this.right = right
        this.text = '#';
    }

    toString() {
        return `${this.text}`;
    }

    neighbors() {
        return [this.above, this.below, this.left, this.right];
    }
}

class Maze {
    // define the mazeText, solutionText, and solution
    constructor(solutionText) {
        this.maze = [];
        for (let row = 0; row < 10; row++) {
            this.maze[row] = [];
            for (let col = 0; col < 10; col++) {
                this.maze[row].push(new Cell(new Coordinate(row, col), null, null, null, null));
            }
        }
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                let cell = this.getAt(row, col);
                if (row > 0) {
                    cell.above = this.getAt(row - 1, col);
                }
                if (row < 9) {
                    cell.below = this.getAt(row + 1, col);
                }
                if (col > 0) {
                    cell.left = this.getAt(row, col - 1);
                }
                if (col < 9) {
                    cell.right = this.getAt(row, col + 1);
                }
            }
        }
        this.solutionText = solutionText;
        this.solution = '';
        this.positionIndex = 0;
        this.startPosition = Coordinate.random();
        this.currentPosition = this.startPosition;
        while (this.positionIndex < solutionText.length) {
            this.generateSolution();
            this.positionIndex++;
        }
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                let cell = this.getAt(row, col);
                if (cell.text === '#') {
                    cell.text = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
                }
            }
        }
    }

    generateSolution() {
        let currentLetter = this.solutionText[this.positionIndex];
        console.log(currentLetter);
        let currentCell = this.getAt(this.currentPosition.y, this.currentPosition.x);
        currentCell.text = currentLetter;
        let neighbors = currentCell.neighbors().filter(cell => !!cell && cell.text === '#');
        let nextCell = neighbors[Math.floor(Math.random() * neighbors.length)];
        if (nextCell === currentCell.above) {
            this.solution += '^';
        } else if (nextCell === currentCell.below) {
            this.solution += 'v';
        } else if (nextCell === currentCell.left) {
            this.solution += '<';
        } else if (nextCell === currentCell.right) {
            this.solution += '>';
        }
        this.lastPosition = this.currentPosition;
        this.currentPosition = nextCell.coordinate;
    }


    getAt(row, col) {
        try {
            return this.maze[row][col];
        } catch (error) {
            return new Cell(new Coordinate(row, col), null, null, null, null);
        }
    }

    toString() {
        let maze = '';
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                maze += this.getAt(row, col).toString();
            }
            maze += '\n';
        }
        return `${this.startPosition}\n${this.lastPosition}\n---\n${maze}---\n${this.solution}`;
    }
}


function generateFutureMazes(futureMazes) {
    let daysInFuture = 1;
    futureMazes.forEach(text => {
        daysInFuture++;
        let success = false;
        while (!success) {
            try {
                generateFutureMaze(text, daysInFuture);
                success = true;
            } catch (error) {
                console.log(error);
            }
        }
    });
}

function generateFutureMaze(text, daysInFuture) {
    text = text.toUpperCase();
    // remove all non-alphabet characters
    text = text.replace(/[^A-Z]/g, '');
    let date = new Date();
    date.setDate(date.getDate() + daysInFuture);
    let maze = new Maze(text);
    let dataUrl = `data:text/plain;base64,${btoa(maze.toString())}`;
    let link = document.createElement('a');
    link.setAttribute('href', dataUrl);
    // let fileName = `${date.getFullYear()}-0${date.getMonth() + 1}-0${date.getDate()}.txt`;
    // create the file name based off the date with zero padding for months and days
    let zeroPaddedMonth = ("00" + (date.getMonth() + 1)).slice(-2);
    let zeroPaddedDay = ("00" + date.getDate()).slice(-2);
    let fileName = `${date.getFullYear()}-${zeroPaddedMonth}-${zeroPaddedDay}.txt`;
    link.setAttribute('download', fileName);
    link.click();
}

generateFutureMazes([
//     'A piece of cake',
//     'On cloud nine',
//     'Bite the bullet',
//     'Actions speak louder than words',
//     'Easy as pie',
//     'Burning the midnight oil',
//     'The ball is in your court',
//     'Two heads are better than one',
//     'The early bird gets the worm',
//     'Every cloud has a silver lining',
//     'The buck stops here',
//     'A penny for your thoughts',
//     'Birds of a feather',
//     'The bigger they are the harder',
//     'Dont count your chickens before they hatch',
//     'Dont put all your eggs in one basket',
//     'Better late than never',
//     'In the nick of time',
//     'Practice makes perfect',
//     'Dont cry over spilled milk',
//     'A piece of the pie',
//     'A stitch in time',
//     'Break a leg',
//     'Cool as a cucumber',
//     'Cross that bridge',
//     'Dont hold your breath',
//     'Dont judge a book by its cover',
//     'Dont sweat it',
//     'Every dog has its day',
//     'Follow your heart',
//     'Get the ball rolling',
//     'Go the extra mile',
//     'Hang in there',
//     'It takes two to tango',
//     'Keep it up',
//     'Kill two birds with one stone',
//     'Let the cat out of the bag',
//     'Live and learn',
//     'Make a long story short',
//     'No pain no gain',
//     'Out of sight out of mind',
//     'Piece of the action',
//     'Put your best foot forward',
//     'Rome wasnt built in a day',
//     'Set the record straight',
//     'Sleep on it',
//     'Step up to the plate',
//     'Take it easy',
//     'The best of both worlds',
//     'The calm before the storm',
//     'The sky is the limit',
//     'There is no place like home',
//     'Time flies when you are having fun',
//     'Too many cooks spoil the broth',
//     'When in Rome',
//     'You cant have your cake and eat it too',
//     'You cant judge a book by its cover',
//     'You reap what you sow',
//     'A change of heart',
//     'A dime a dozen',
//     'All in a days work',
//     'Beggars cant be choosers',
//     'Better safe than sorry',
//     'Dead as a doornail',
//     'Dont cry over spilt milk',
//     'Dont put the cart before the horse',
//     'Dont rock the boat',
//     'Dont throw stones in a glass house',
//     'Dont try to reinvent the wheel',
//     'Dont wait up',
//     'Down to the wire',
//     'Every man for himself',
//     'Fortune favors the bold',
//     'Give it your best shot',
//     'Half a loaf is better than none',
//     'Hit the nail on the head',
//     'If the shoe fits',
//     'In the heat of the moment',
//     'Its a piece of pie',
//     'Its the tip of the iceberg',
//     'Keep your chin up',
//     'Let sleeping dogs lie',
//     'Live for the moment',
//     'Money talks and bullshit walks',
//     'Never look back',
//     'No stone unturned',
//     'On a roll',
//     'Over the moon',
//     'Paint the town red',
//     'Play it by ear',
//     'Pull out all the stops',
//     'Put the cart before the horse',
//     'Put your foot in your mouth',
//     'See eye to eye',
//     'Shoot for the moon',
//     'Stick to your guns',
//     'The apple of my eye',
//     'The early bird catches the worm',
//     'The elephant in the room',
//     'The icing on the cake',
//     'The pot calling the kettle black',
//     'The whole nine yards',
//     'There is no time like the present',
//     'That dog will hunt',
//     'Time is money',
//     'Under the weather',
//     'When pigs fly',
//     'Two heads are better than one',
//     'Two in the bush one in the hand',
//     'You cant take it with you',
//     'You only live once',
//     'You scratch my back Ill scratch yours',
//     'You win some you lose some',
//     'A blessing in disguise',
//     'A dime a dozen',
//     'A drop in the bucket',
//     'A fool and his money are soon parted',
//     'A hot potato',
//     'A penny saved is a penny earned',
]);