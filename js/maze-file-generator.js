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
                if(row > 0) {
                    cell.above = this.getAt(row - 1, col);
                }
                if(row < 9) {
                    cell.below = this.getAt(row + 1, col);
                }
                if( col > 0) {
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
                if(cell.text === '#') {
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
        if( nextCell === currentCell.above) {
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

// var maze = new Maze('THEREWASANOLDLADYWHOSWALLOWEDAFLY');
// console.log(maze.toString());