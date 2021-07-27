///<reference path='../../node_modules/@types/p5/global.d.ts'/>
var lines = [];
var lineSegs = [];
var lineSegmentSize = 40;
var lineCount = 0;
var overlapLineCount = 0;
var perFrameSlider;
var frameRateSlider;
function setup() 
{
	

	createCanvas(800, 820);
	for (let i = lineSegmentSize; i < height-20; i += lineSegmentSize*2){
		lines.push(i);
		console.log(i)
	}
	perFrameSlider = createSlider(1, 100, 1, 1);
	frameRateSlider = createSlider(1, 60, 5, 1);
	frameRateSlider.input(changeFrameRate);
	background(200)
	frameRate(60);
	drawGridLines();
	textSize(25)
	textAlign(LEFT)

}

function draw()
{
	
	for (let i = 0; i < perFrameSlider.value(); i++){
		lineSegs.push(new LineSeg());
	}
	stroke(255);
	fill(255);
	rect(0, height-20, width, 20);
	fill(0);
	color(0);
	var ratio = lineCount / overlapLineCount;
	var ratioString = ratio.toFixed(5);
	text(overlapLineCount.toString() + " / " + lineCount.toString() + " = " + ratioString, 15, height);

}


function changeFrameRate() {
	frameRate(frameRateSlider.value())
}

function drawGridLines() {
	lines.forEach(l => {
		line(0, l, width, l);
	});
}




class LineSeg{

	constructor() {
		this.x1 = floor(random() * width);
		this.y1 = floor(random() * (height-20));
		var theta = random() * 2 * Math.PI;
		this.x2 = this.x1 + Math.cos(theta) * lineSegmentSize;
		this.y2 = this.y1 + Math.sin(theta) * lineSegmentSize;
		this.isOverLapping = false;
		lineCount++;
		lines.forEach(ly => {
			if ((this.y1 > ly && this.y2 < ly) || (this.y2 > ly && this.y1 < ly)) {
				this.isOverLapping = true;
				overlapLineCount++;
			}
		});
		this.render();
	}

	render() {
		if (this.isOverLapping) {
			strokeWeight(2);
			stroke(255, 0, 0);
		} else {
			strokeWeight(1);
			stroke(random(255), random(255), random(255));
		}
		line(this.x1, this.y1, this.x2, this.y2);
	}

}