if(!window.Float32Array){
    window.Float32Array = Array;
}

var WIDTH = 800, // px
    HEIGHT = 600,
    NPARTICLES = 10000,
    NODESIZE = 5,
	FORCECOEFF = 1000,
	SAFEDIST = 20;
    canvas = document.getElementById('myCanvas'),
    screenRatio = 1.0;

if(navigator.userAgent.match(/iPad/i)){
    WIDTH = 320;
    HEIGHT = 240;
    NPARTICLES /= 5;
    screenRatio = WIDTH/640;
    canvas.style.width = '640px';
    canvas.style.height = '480px';
    document.getElementById('canvasBox').style.width = canvas.style.width;
    document.getElementById('canvasBox').style['margin-top'] = '30px';
    document.getElementById('demoTitle').style.display = 'none';
}
else if(navigator.userAgent.match(/iPhone|iPod|Android/i)){
    WIDTH = 320;
    HEIGHT = 200;
    NPARTICLES /= 5;
    screenRatio = WIDTH/window.innerWidth;
    canvas.style.width = '100%';
    canvas.style.height = innerHeight + 'px';
    document.getElementById('canvasBox').style.width = canvas.style.width;
    document.getElementById('canvasBox').style.border = 0;
    document.getElementById('demoTitle').style.display = 'none';
    // WOW it's that hard to get fullscreen on android
    if(navigator.userAgent.match(/Android/i)){
        canvas.style.height = '1000px';
        setTimeout(function(){
            window.scrollTo(0, window.innerHeight);
            setTimeout(function(){
                canvas.style.height = document.documentElement.clientHeight + 'px';
            },1);
        },100);
    }
}



var ctx = canvas.getContext('2d'),
    //particles = new Float32Array(NPARTICLES*4),
	nodes = new Array();
   // flow = new Float32Array(WIDTH*HEIGHT/CELLSIZE/CELLSIZE*2),
    //CELLS_X = WIDTH/20,
    floor = Math.floor;
	round = Math.round;

var mouseDown = false;
var bodyLoaded = true;

//node
function node(i, x, y){
	this.index = i;
	this.x = x;
	this.y = y;
	this.forceX = 0;
	this.forceY = 0;
	this.speedX = 0;
	this.speedY = 0;
	this.dirFX = 0;
	this.dirFY = 0;
	this.dirSX = 0;
	this.dirSY = 0;

}

node.prototype.draw = node_draw;
node.prototype.act = node_act;
//node.prototype.move = node_move;

function addNode(x, y)
{
	return nodes[nodes.length] = new node(nodes.length, x, y);
}

function node_draw()
{
	ctx.fillstyle = "#ff0000";
	ctx.beginPath();
	ctx.arc(this.x, this.y, NODESIZE, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
}

function node_act()
{
	for (var i = this.index+1; i < nodes.length; i ++)
	{
		fc = getForce(this, nodes[i]);
		dx = nodes[i].x-this.x;
		dy = nodes[i].y-this.y;
		ds = distance(this.x, this.y, nodes[i].x, nodes[i].y);
		if (ds > SAFEDIST)
		{
			fcx = dx*fc/ds;
			fcy = dy*fc/ds;
		}
		else
		{
			fcx -= dx*fc/ds;
			fcy -= dy*fc/ds;
		}
			
		this.forceX += fcx;
		this.forceY += fcy;
		nodes[i].forceX -= fcx;
		nodes[i].forceY -= fcy;
	}
	
	this.speedX += this.forceX;
	this.speedY += this.forceY;
	
	if (this.x+this.speedX < 0 || this.x+this.speedX > WIDTH)
		this.speedX *= -0.9;
	
	if (this.y+this.speedY < 0 || this.y+this.speedY > HEIGHT)
		this.speedY *= -0.9;

	this.x += this.speedX;
	this.y += this.speedY;
	
	this.forceX *= 0.9;
	this.forceY *= 0.9;

}

function getForce(nodeA, nodeB)
{
	ds = distSqr(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
	return FORCECOEFF/(ds*ds);
}

function forceToSpeed(force)
{
	return force;
}

function distance(x1, y1, x2, y2)
{
	return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}

function distSqr(x1, y1, x2, y2)
{
	return (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);
}

canvas.onmousedown = function(e){
	if (bodyLoaded && !mouseDown)
	{
		var mx, mx;
		mx = (e.pageX-canvas.offsetLeft)*screenRatio;
		my = (e.pageY-canvas.offsetTop)*screenRatio;
		
		addNode(mx, my);
	
		mouseDown = true;
	}
}
canvas.ontouchstart = function(e){
	for (var i = 0; i < e.touches.length; i ++)
    canvas.onmousedown(e.touches[i]);
    return false;
}
canvas.onmouseup = canvas.ontouchend = function(){
    mouseDown = false;
}
/*
canvas.ontouchmove = function(e){
	for (var i = 0; i < e.touches.length; i ++)
    canvas.onmousemove(e.touches[i]);
}


canvas.onmousemove = function(e){
    var mx = (e.clientX-canvas.offsetLeft)*screenRatio,
        my = (e.clientY-canvas.offsetTop)*screenRatio;
    if(!down || mx == start.x && my == start.y) return;
    var ai = (floor(mx/CELLSIZE) +
        floor(my/CELLSIZE)*floor(WIDTH/CELLSIZE))*2;
    flow[ai] += (mx-start.x)*0.4;
    flow[ai+1] += (my-start.y)*0.4;
    start.x = mx;
    start.y = my;
};
*/
setInterval(function(){
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = 'rgba(100, 100, 255, 0.8)';
    ctx.globalCompositeOperation = 'lighter';

	for (var i = 0; i < nodes.length; i ++)
	{
		nodes[i].draw();
		nodes[i].act();
	}
}, 33);

function FPSCounter(ctx) {
    this.t = new Date().getTime()/1000.0;
    this.n = 0;
    this.fps = 0.0;
    this.draw = function() {
        this.n ++;
        if(this.n == 10) {
            this.n = 0;
            t = new Date().getTime()/1000.0;
            this.fps = Math.round(100/(t-this.t))/10;
            this.t = t;
        }
        ctx.fillStyle = 'white';
        ctx.fillText('FPS: ' + this.fps, 1, 15);
    }
}
var fps = new FPSCounter(ctx);

function canvasLoad()
{
	bodyLoaded = true;
}


canvas.width = WIDTH;
canvas.height = HEIGHT;
