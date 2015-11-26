const DRAW_DISTANCE = 100; // distance from cursor to dot before line is drawn

var mousePos;
var dots;
var canvas = {};
canvas.node = document.getElementById('canvas');
canvas.context = canvas.node.getContext('2d');

function set_dimensions() {
	canvas.node.width  = window.innerWidth;
	canvas.node.height = window.innerHeight;
}
set_dimensions();

function create_dots() {
	d = [];
	for (var i = 0; i < 2000; i++)
		d.push(new GenerateDot());
	return d;
}
dots = create_dots();

function draw() {
    canvas.context.fillStyle = "black";
	canvas.context.clearRect(0, 0, canvas.node.width, canvas.node.height);
	canvas.context.fillRect(0, 0, canvas.node.width, canvas.node.height);
  
    for (var i = 0; i < dots.length; i++) {
        var dot = dots[i];
        dot.x += (Math.random() - 0.5); dot.y += (Math.random() - 0.5);
        // draw dot
        canvas.context.beginPath();
        canvas.context.fillStyle = "white";
        canvas.context.arc(dot.x ,dot.y, 1, 0, Math.PI*2, true);
        canvas.context.fill();
        
        var distance = get_distance(mousePos, dot);
        if (distance < DRAW_DISTANCE) {
            var nearest = find_nearest_dots(dot);
            canvas.context.strokeStyle = "white";
            canvas.context.lineWidth = (DRAW_DISTANCE - distance)/50;
            for (var j = 0; j < nearest.length; j++) {
                canvas.context.moveTo(dot.x, dot.y);
                canvas.context.lineTo(nearest[j].x, nearest[j].y);
            }
            canvas.context.stroke();
        }
    }
}
setInterval(draw,33);

// -- event listeners --
canvas.node.addEventListener('mousemove', function(event) {
	mousePos = new MousePosition(event);
});

window.addEventListener('resize', function(event) {
	set_dimensions();
	dots = create_dots();
});

// -- utility functions --
function get_distance(point1,point2) {
	return Math.sqrt(Math.pow(point1.x-point2.x,2)+Math.pow(point1.y-point2.y,2));
}

/*
function find_nearest_dot(dot) {
	var nearest;
    for (var i = 0; i < dots.length; i++) {
    	var checkDot = dots[i];
        if (checkDot === dot) continue;
        if (!nearest) nearest = checkDot;
        
        if (get_distance(dot,checkDot) < get_distance(dot,nearest)) {
        	nearest = checkDot;
        }
    }
    return nearest;
}
*/

function find_nearest_dots(dot) {
	return dots.slice().sort(function(a, b){
        return get_distance(a,dot) - get_distance(b,dot);
    }).slice(0,5);
}

// -- objects --
function GenerateDot() {
    this.x = Math.random() * canvas.node.width;
    this.y = Math.random() * canvas.node.height;
}

function MousePosition(event) {
    var rect = canvas.node.getBoundingClientRect();
    this.x = event.clientX - rect.left;
	this.y = event.clientY - rect.top;
}