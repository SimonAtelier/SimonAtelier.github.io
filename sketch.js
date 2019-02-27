class Button {

	constructor() {
		this.x = 10;
		this.y = 10;
	}
	
	onDraw() {
		push();
		translate(-width / 2, - height / 2);
		fill(128);
		rect(0, 0, 200, 200);
		pop();
	}

}

class Workspace {
	
	constructor() {
		this.axisSize = 2000;
		this.xAxisVisible = true;
		this.yAxisVisible = true;
		this.zAxisVisible = true;
		this.gridVisible = true;
		this.rotationX = 0;
		this.rotationY = 0;
		this.scale = 100;
	}
	
	onDraw() {
		ambientLight(100);
		directionalLight(255, 255, 255, 1, 1, -1);
		directionalLight(127, 127, 127, -1, -1, 1);
		scale(this.scale);
		rotateX(this.rotationX);
		rotateY(this.rotationY);
		this.drawAxis(this.axisSize);
		this.drawGrid(1, 10, 10);
		fill(255);
		ambientMaterial(128, 128, 128);
	}
	
	drawAxis(axisSize) {
		if (this.xAxisVisible) {
			stroke(132, 22, 22);
			line(-axisSize, 0, 0, axisSize, 0, 0);
		}

		if (this.yAxisVisible) {
			stroke(22, 132, 22);
			line(0, -axisSize, 0, 0, axisSize, 0);
		}

		if (this.zAxisVisible) {
			stroke(22, 22, 132);
			line(0, 0, -axisSize, 0, 0, axisSize);
		}
	}
	
	drawGrid(size, rows, cols) {
		if (!this.gridVisible)
			return;
		stroke(74);
		noFill();
		push();
		rotateX(radians(-90));
		translate(-(cols * size) / 2, -(rows * size) / 2);
		for (var i = 0; i < rows; i++) {
			for (var j = 0; j < cols; j++) {
				rect(j * size, i * size, size, size);
			}
		}
		pop();
	}
	
	onMouseWheel(amount) {
		this.scale -= amount * 1;
		if (this.scale < 0.01)
			this.scale = 0.01;
		
	}
	
	onMouseDragged(left) {
		if (!left)
			return;
		var rx = this.rotationX + (pmouseY - mouseY) * TWO_PI / 1000;
		var ry = this.rotationY - (pmouseX - mouseX) * TWO_PI / 1000;
		this.rotationX = rx;
		this.rotationY = ry;	
	}

}

var workspace = new Workspace();
var button = new Button();

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
	background(40);
	workspace.onDraw();
	box(0.5);
	button.onDraw();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function mouseDragged() {
	workspace.onMouseDragged(mouseButton == LEFT);
}

function mouseWheel(event) {
	workspace.onMouseWheel(event.delta);
}