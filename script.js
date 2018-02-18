let inputStage = {};
let maze = [];
let gameTime = 0;
let crumbs = false;
let canvas = null;
let context = null;
let size = 0;
var myCharacter = null;
var path = [];
var score = 0;
var showScore = true;
var showPath = false;
var prevTime = 0;
var newGame = true;
	
let imgFloor = new Image();
imgFloor.isReady = false;
imgFloor.onload = function() {
	this.isReady = true;
};
imgFloor.src = 'floor.png';

// let imgBub = new Image();
// imgBub.isReady = false;
// imgBub.onload = function() {
// 	this.isReady = true;
// };
// imgBub.src = 'Bubble - White.png';

let imgStart = new Image();
imgStart.isReady = false;
imgStart.onload = function() {
	this.isReady = true;
};
imgStart.src = 'Orb of Blood.png';

let imgEnd = new Image();
imgEnd.isReady = false;
imgEnd.onload = function() {
	this.isReady = true;
};
imgEnd.src = 'Orb of Venom.png';


let imgCrumb = new Image();
imgCrumb.isReady = false;
imgCrumb.onload = function() {
	this.isReady = true;
};
imgCrumb.src = 'Airless.png';


let imgNext = new Image();
imgNext.isReady = false;
imgNext.onload = function() {
	this.isReady = true;
};
imgNext.src = 'Fmless.png';


let imgPath = new Image();
imgPath.isReady = false;
imgPath.onload = function() {
	this.isReady = true;
};
imgPath.src = 'Flameless.png';

function createCharacter(imageSource, location) {
	let image = new Image();
	image.isReady = false;
	image.onload = function() {
		this.isReady = true;
	};
	image.src = imageSource;
	location.visited = true;
	return {
		location: location,
		image: image
	};
}

function createMaze(inSize) {
		
	let size = inSize;
	
	let edges = [];
	let cells = [];
	
	maze = [];
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
	            included: false,
	            visited: false,
	            cameFrom: {x: col, y: row},
	            dist: 0,
	            onPath: false
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
	                    maze[curr.loc.y-1][curr.loc.x].included = true;
	                    maze[curr.loc.y-1][curr.loc.x].cameFrom = {x: curr.loc.x, y: curr.loc.y};
						maze[curr.loc.y-1][curr.loc.x].dist = maze[curr.loc.y][curr.loc.x].dist + 1;
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
	                    maze[curr.loc.y][curr.loc.x+1].included = true;
	                    maze[curr.loc.y][curr.loc.x+1].cameFrom = {x: curr.loc.x, y: curr.loc.y};
						maze[curr.loc.y][curr.loc.x+1].dist = maze[curr.loc.y][curr.loc.x].dist + 1;
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
	                    maze[curr.loc.y+1][curr.loc.x].included = true;
	                    maze[curr.loc.y+1][curr.loc.x].cameFrom = {x: curr.loc.x, y: curr.loc.y};
						maze[curr.loc.y+1][curr.loc.x].dist = maze[curr.loc.y][curr.loc.x].dist + 1;
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
						maze[curr.loc.y][curr.loc.x-1].included = true;
						maze[curr.loc.y][curr.loc.x-1].cameFrom = {x: curr.loc.x, y: curr.loc.y};
						maze[curr.loc.y][curr.loc.x-1].dist = maze[curr.loc.y][curr.loc.x].dist + 1;
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
	
	var temp = maze[size-1][size-1];
	while(!(temp.x == 0 && temp.y == 0)){
		path.push({x: temp.x, y: temp.y});
		maze[temp.y][temp.x].onPath = true;
		temp = maze[temp.cameFrom.y][temp.cameFrom.x];
		
		
	}
	
	
}

function drawCrumbs(cell) {
	if(cell.onPath && false)
		{
		    context.beginPath();
		    context.arc(cell.x*(1000/size)+1000/size/2,cell.y*(1000/size)+1000/size/2,((1000/size)/8),0, 2 * Math.PI);
		    context.fill();
		}
}

function drawCell(cell) {

	if (imgFloor.isReady) {
		context.drawImage(imgFloor,
		cell.x * (1000 / size), cell.y * (1000 / size),
		1000 / size, 1000 / size);
		
	}

	if (imgCrumb.isReady) {
		if(cell.visited && crumbs){
		context.drawImage(imgCrumb,
		cell.x * (1000 / size)+(1000 / size / 3), cell.y * (1000 / size)+(1000 / size / 3),
		1000 / size/4, 1000 / size/4);
		}
	}

	if (cell.edges.n === null) {
		context.moveTo(cell.x * (1000 / size), cell.y * (1000 / size));
		context.lineTo((cell.x + 1) * (1000 / size), cell.y * (1000 / size));
		// context.stroke();
	}

	if (cell.edges.s === null) {
		context.moveTo(cell.x * (1000 / size), (cell.y + 1) * (1000 / size));
		context.lineTo((cell.x + 1) * (1000 / size), (cell.y + 1) * (1000 / size));
		// context.stroke();
	}

	if (cell.edges.e === null) {
		context.moveTo((cell.x + 1) * (1000 / size), cell.y * (1000 / size));
		context.lineTo((cell.x + 1) * (1000 / size), (cell.y + 1) * (1000 / size));
		// context.stroke();
	}

	if (cell.edges.w === null) {
		context.moveTo(cell.x * (1000 / size), cell.y * (1000 / size));
		context.lineTo(cell.x * (1000 / size), (cell.y + 1) * (1000 / size));
		// context.stroke();
	}
}

function renderCharacter(character) {
	if (character.image.isReady) {
		context.drawImage(character.image,
		character.location.x * (1000 / size) + 1000/size/4, character.location.y * (1000 / size) + 1000/size/4,
		1000 / size /2, 1000 / size /2);
	}
}

function updateScore(character) {
			if(!maze[character.location.y][character.location.x].visited) {
				if(maze[character.location.y][character.location.x].onPath) {
					score = score + 5;
				} else {
					score = score - 2;
				}
		    	maze[character.location.y][character.location.x].visited = true;
			}
	
}

function moveCharacter(keyCode, character) {
	console.log('keyCode: ', keyCode);
	if (keyCode === 40 || keyCode == 83 || keyCode == 75) {
		if (character.location.edges.s) {
			character.location = character.location.edges.s;
		    updateScore(character);
		}
	}
	if (keyCode == 38 || keyCode == 87 || keyCode == 73) {
		if (character.location.edges.n) {
			character.location = character.location.edges.n;
		    updateScore(character);
		}
	}
	if (keyCode == 39 || keyCode == 68 || keyCode == 76) {
		if (character.location.edges.e) {
			character.location = character.location.edges.e;
		    updateScore(character);
		}
	}
	if (keyCode == 37 || keyCode == 65 || keyCode == 74) {
		if (character.location.edges.w) {
			character.location = character.location.edges.w;
			updateScore(character);
		}
	}
	if (keyCode == 66) {
		crumbs = !crumbs;
	}
	if (keyCode == 89) {
		showScore = !showScore;
	}
	if (keyCode == 80) {
		showPath = !showPath;
	}
}

function renderPath() {
	for(var i=0; i<path.length; i++) {
		if (imgPath.isReady) {
			context.drawImage(imgPath,
			path[i].x * (1000 / size)+(1000 / size / 3), path[i].y * (1000 / size)+(1000 / size / 3),
			1000 / size/4, 1000 / size/4);
		}
	}
}

function renderStartAndStop(startCell, endCell) {
	if (imgStart.isReady) {
		context.drawImage(imgStart,
		startCell.x * (1000 / size)+(1000 / size / 3), startCell.y * (1000 / size)+(1000 / size / 3),
		1000 / size/4, 1000 / size/4);
	}
	if (imgEnd.isReady) {
		context.drawImage(imgEnd,
		endCell.x * (1000 / size)+(1000 / size / 3), endCell.y * (1000 / size)+(1000 / size / 3),
		1000 / size/4, 1000 / size/4);
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
	context.stroke();
	
	if(crumbs) {
		for (let row = 0; row < size; row++) {
			for (let col = 0; col < size; col++) {
				drawCrumbs(maze[row][col]);
			}
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

    var date = new Date(null);
    date.setSeconds(gameTime); // specify value for SECONDS here
    document.getElementById("div-time").innerHTML = date.toISOString().substr(14, 5);
    if (showScore){
	    document.getElementById("span-score").innerHTML = score;
    } else {
    	document.getElementById("span-score").innerHTML = "Hidden"
    }
	renderMaze();
	if(showPath) {
		renderPath();
	}
	renderStartAndStop({x:0, y:0},{x:size-1, y:size-1});
	renderCharacter(myCharacter);
}

function update(elapsedTime) {
	//console.log(elapsedTime);
	if(newGame) {
	  prevTime = elapsedTime;
	  newGame = false;
	}
	gameTime = (elapsedTime-prevTime)/1000;
}

function processInput() {
	for (input in inputStage) {
		moveCharacter(inputStage[input], myCharacter);
	}
	inputStage = {};
}

function gameLoop(elapsedTime) {
	processInput();
	update(elapsedTime);
	render();

	requestAnimationFrame(gameLoop);

}

function initialize(inSize) {
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
	
	if(inSize) {	
	  size = inSize;
	}
	newGame = true;
	createMaze(inSize);
	myCharacter = createCharacter('color_fish_red.png', maze[0][0]);

	requestAnimationFrame(gameLoop);
}
