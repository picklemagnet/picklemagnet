// -- set vars --
var draw_distance = 75; // distance from cursor to dot before line is drawn
var dots_number = 2000;

// -- runtime vars --
var mousePos;
var dots;
var mouseDown = false;
var canvas = {};
canvas.node = document.getElementById('canvas');
canvas.context = canvas.node.getContext('2d');

function parse_query() {
	function get_parameter_by_name(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	var radius = get_parameter_by_name('radius');
	draw_distance = isNaN(radius) ? 75 : radius;
	var stars = get_parameter_by_name('stars')
	dots_number = isNaN(stars) ? 2000 : stars;
}
if (window.location.search) parse_query();

function set_dimensions() {
	canvas.node.width  = window.innerWidth;
	canvas.node.height = window.innerHeight;
}
set_dimensions();

function create_dots() {
	d = [];
	for (var i = 0; i < dots_number; i++)
		d.push(new GenerateDot());
	return d;
}
dots = create_dots();

function draw() {
    canvas.context.fillStyle = "black";
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
        if (distance < draw_distance * (mouseDown ? 2.5 : 1)) {
            var nearest = find_nearest_dots(dot);
            canvas.context.strokeStyle = "white";
            canvas.context.lineWidth = (1 - distance/draw_distance);
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

window.addEventListener('mousedown', function(event) {
	mouseDown = true;
});

window.addEventListener('mouseup', function(event) {
	mouseDown = false;
});

window.addEventListener('resize', function(event) {
	set_dimensions();
	dots = create_dots();
});

// -- utility functions --
function get_distance(point1,point2) {
	return Math.abs(point1.x-point2.x)+Math.abs(point1.y-point2.y);
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