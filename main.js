let inputStage = {};

let imgFloor = new Image();
imgFloor.isReady = false;
imgFloor.onload = function() {
	this.isReady = true;
};
imgFloor.src = 'floor.png';

function createCharacter(imageSource, location) {
	let image = new Image();
	image.isReady = false;
	image.onload = function() {
		this.isReady = true;
	};
	image.src = imageSource;
	return {
		location: location,
		image: image
	};
}
let size = 5;

let edges = [];
let cells = [];

let maze = [];
for (let row = 0; row < size; row++) {
    maze.push([]);
    for (let col = 0; col < size; col++) {
        maze[row].push({
            x: col, y: row, edges: {
                n: null,
                s: null,
                w: null,
                e: null
            },
            included: false
        });
    }
}

maze[0][0].included = true;
edges.push({loc: {x: 0, y: 0}, dir: 'n'});
edges.push({loc: {x: 0, y: 0}, dir: 'e'});
edges.push({loc: {x: 0, y: 0}, dir: 's'});
edges.push({loc: {x: 0, y: 0}, dir: 'w'});


while(edges.length != 0) {

    let rand = Math.floor(Math.random() * edges.length);
    
    var curr = edges.splice(rand,1);
    
    curr = curr[0];
    
    switch (curr.dir) {
        case 'n':
            if(curr.loc.y != 0){
                if(!maze[curr.loc.y-1][curr.loc.x].included){
					console.log(curr.loc.x);
					console.log(curr.loc.y);
					console.log(curr.dir);
                    maze[curr.loc.y-1][curr.loc.x].included = true;
					maze[curr.loc.y][curr.loc.x].edges.n = maze[curr.loc.y-1][curr.loc.x];
					maze[curr.loc.y-1][curr.loc.x].edges.s = maze[curr.loc.y][curr.loc.x];					
                    edges.push({loc: {x: curr.loc.x, y: curr.loc.y-1}, dir: 'n'});
                    edges.push({loc: {x: curr.loc.x, y: curr.loc.y-1}, dir: 'e'});
                    edges.push({loc: {x: curr.loc.x, y: curr.loc.y-1}, dir: 's'});
                    edges.push({loc: {x: curr.loc.x, y: curr.loc.y-1}, dir: 'w'});
                }
            }
            break;
        case 'e':
            if(curr.loc.x != size-1){
                if(!maze[curr.loc.y][curr.loc.x+1].included){
					console.log(curr.loc.x);
					console.log(curr.loc.y);
					console.log(curr.dir);
                    maze[curr.loc.y][curr.loc.x+1].included = true;
					maze[curr.loc.y][curr.loc.x].edges.e = maze[curr.loc.y][curr.loc.x+1];
					maze[curr.loc.y][curr.loc.x+1].edges.w = maze[curr.loc.y][curr.loc.x];
                    edges.push({loc: {x: curr.loc.x+1, y: curr.loc.y}, dir: 'n'});
                    edges.push({loc: {x: curr.loc.x+1, y: curr.loc.y}, dir: 'e'});
                    edges.push({loc: {x: curr.loc.x+1, y: curr.loc.y}, dir: 's'});
                    edges.push({loc: {x: curr.loc.x+1, y: curr.loc.y}, dir: 'w'});
                }
            }
            break;
        case 's':
            if(curr.loc.y != size-1){
                if(!maze[curr.loc.y+1][curr.loc.x].included){
					console.log(curr.loc.x);
					console.log(curr.loc.y);
					console.log(curr.dir);
                    maze[curr.loc.y+1][curr.loc.x].included = true;
					maze[curr.loc.y][curr.loc.x].edges.s = maze[curr.loc.y+1][curr.loc.x];
					maze[curr.loc.y+1][curr.loc.x].edges.n = maze[curr.loc.y][curr.loc.x];
                    edges.push({loc: {x: curr.loc.x, y: curr.loc.y+1}, dir: 'n'});
                    edges.push({loc: {x: curr.loc.x, y: curr.loc.y+1}, dir: 'e'});
                    edges.push({loc: {x: curr.loc.x, y: curr.loc.y+1}, dir: 's'});
                    edges.push({loc: {x: curr.loc.x, y: curr.loc.y+1}, dir: 'w'});
                }
            }
            break;
        case 'w':
            if(curr.loc.x != 0){
                if(!maze[curr.loc.y][curr.loc.x-1].included){
					console.log(curr.loc.x);
					console.log(curr.loc.y);
					console.log(curr.dir);
					maze[curr.loc.y][curr.loc.x-1].included = true;
					maze[curr.loc.y][curr.loc.x].edges.w = maze[curr.loc.y][curr.loc.x-1];
                    maze[curr.loc.y][curr.loc.x-1].edges.e = maze[curr.loc.y][curr.loc.x];
                    edges.push({loc: {x: curr.loc.x-1, y: curr.loc.y}, dir: 'n'});
                    edges.push({loc: {x: curr.loc.x-1, y: curr.loc.y}, dir: 'e'});
                    edges.push({loc: {x: curr.loc.x-1, y: curr.loc.y}, dir: 's'});
                    edges.push({loc: {x: curr.loc.x-1, y: curr.loc.y}, dir: 'w'});
                }
            }
            break;
    }
}

function drawCell(cell) {

	if (imgFloor.isReady) {
		context.drawImage(imgFloor,
		cell.x * (1000 / size), cell.y * (1000 / size),
		1000 / size, 1000 / size);
	}

	if (cell.edges.n === null) {
		context.moveTo(cell.x * (1000 / size), cell.y * (1000 / size));
		context.lineTo((cell.x + 1) * (1000 / size), cell.y * (1000 / size));
		context.stroke();
	}

	if (cell.edges.s === null) {
		context.moveTo(cell.x * (1000 / size), (cell.y + 1) * (1000 / size));
		context.lineTo((cell.x + 1) * (1000 / size), (cell.y + 1) * (1000 / size));
		context.stroke();
	}

	if (cell.edges.e === null) {
		context.moveTo((cell.x + 1) * (1000 / size), cell.y * (1000 / size));
		context.lineTo((cell.x + 1) * (1000 / size), (cell.y + 1) * (1000 / size));
		context.stroke();
	}

	if (cell.edges.w === null) {
		context.moveTo(cell.x * (1000 / size), cell.y * (1000 / size));
		context.lineTo(cell.x * (1000 / size), (cell.y + 1) * (1000 / size));
		context.stroke();
	}
}

function renderCharacter(character) {
	if (character.image.isReady) {
		context.drawImage(character.image,
		character.location.x * (1000 / size), character.location.y * (1000 / size));
	}
}

function moveCharacter(keyCode, character) {
	console.log('keyCode: ', keyCode);
	if (keyCode === 40 || keyCode == 83 || keyCode == 75) {
		if (character.location.edges.s) {
			character.location = character.location.edges.s;
		}
	}
	if (keyCode == 38 || keyCode == 87 || keyCode == 73) {
		if (character.location.edges.n) {
			character.location = character.location.edges.n;
		}
	}
	if (keyCode == 39 || keyCode == 68 || keyCode == 76) {
		if (character.location.edges.e) {
			character.location = character.location.edges.e;
		}
	}
	if (keyCode == 37 || keyCode == 65 || keyCode == 74) {
		if (character.location.edges.w) {
			character.location = character.location.edges.w;
		}
	}
}

function renderMaze() {
	context.strokeStyle = 'rgb(255, 255, 255)';
	context.lineWidth = 6;

	for (let row = 0; row < size; row++) {
		for (let col = 0; col < size; col++) {
			drawCell(maze[row][col]);
		}
	}

	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(999, 0);
	context.lineTo(999, 999);
	context.lineTo(0, 999);
	context.closePath();
	context.strokeStyle = 'rgb(0, 0, 0)';
	context.stroke();
}

function render() {
	context.clear();


	renderMaze();
	renderCharacter(myCharacter);
}

function processInput() {
	for (input in inputStage) {
		moveCharacter(inputStage[input], myCharacter);
	}
	inputStage = {};
}

function gameLoop() {
	processInput();
	render();

	requestAnimationFrame(gameLoop);

}

let canvas = null;
let context = null;
var myCharacter = createCharacter('character.png', maze[0][0]);

function initialize() {
	canvas = document.getElementById('canvas-main');
	context = canvas.getContext('2d');

	CanvasRenderingContext2D.prototype.clear = function() {
		this.save();
		this.setTransform(1, 0, 0, 1, 0, 0);
		this.clearRect(0, 0, canvas.width, canvas.height);
		this.restore();
	};

	window.addEventListener('keydown', function(event) {
		//moveCharacter(event.keyCode, myCharacter);
		inputStage[event.keyCode] = event.keyCode;
	});

	requestAnimationFrame(gameLoop);
}
