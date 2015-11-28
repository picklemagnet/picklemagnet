var dots_number = 500;

var canvas = {};
canvas.node = document.getElementById('canvas');
canvas.context = canvas.node.getContext('2d');
canvas.node.width = window.innerWidth;
canvas.node.height = window.innerHeight;

function create_dots() {
	dots = [];
	for (var i = 0; i < dots_number; i++)
		dots.push(new GenerateDot());
	return dots;
}
var dots = create_dots();

function draw() {
	canvas.context.fillStyle = "#7ec0ee";
	canvas.context.fillRect(0,0,canvas.node.width,canvas.node.height);
	canvas.context.fillStyle = "white";
	for (var i = 0; i < dots.length; i++) {
		canvas.context.beginPath();
		canvas.context.arc(dots[i].x,dots[i].y,1,0,dots[i].b,true);
		canvas.context.fill();
	}
}
setInterval(draw,33);

function GenerateDot() {
    this.x = Math.random() * canvas.node.width;
    this.y = Math.random() * canvas.node.height;
	this.b = Math.random() * (Math.PI * 2);
}