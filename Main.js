!(function() {

    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);

    var context = canvas.getContext("2d");

    function resizeCanvas(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function clearCanvas(){
        context.fillStyle = "#000000";
        context.fillRect(0,0,canvas.width,canvas.height);
    }

    resizeCanvas();
    clearCanvas();

    window.addEventListener("resize",resizeCanvas);

    function mouseDownHandler(e){
            var x = e.clientX;
            var y = e.clientY;

            createFireworks(x,y);
    }
    document.addEventListener("mousedown",mouseDownHandler);

    var particles = [];

    setInterval(function(){
        createFireworks(Math.random()*canvas.width,Math.random()*canvas.height)
    },1000 );

    

    function createFireworks(x,y){
        var count = 100;
        var radius = 0;

        var hue = Math.floor(Math.random()*51)+150;
        var hueVariance =30;

        for(var i = 0;i<count;i++){
            var angle = 360/count *i;
            var radians = angle *Math.PI/180;

            var p = {};

            p.x = x;
            p.y = y;
            p.radians = radians;
            p.radius = radius;
            p.size = 2;

            p.speed = (Math.random()*5)+.4;
            p.radius = p.speed;

            p.hue = Math.floor(Math.random()*
                ((hue + hueVariance)-(hue- hueVariance))) +(hue-hueVariance);
            p.brightness = Math.floor(Math.random()*31)+50;
            p.alpha = (Math.floor(Math.random()*61)+40) / 100;

            particles.push(p);
        }
    }
    function drawFireworks(){
        clearCanvas();

        for(var i =0;i<particles.length;i++){
            var p = particles[i];

            var vx = Math.cos(p.radians)*p.radius;
            var vy = Math.sin(p.radians)*p.radius +0.4;

            p.x +=vx;
            p.y +=vy;
            
            p.radius *=1-p.speed/100;

            p.alpha -= 0.005;

            if(p.alpha<=0) {
                particles.splice(i,1);
                continue;
            }

            context.beginPath();
            context.arc(p.x,p.y,p.size,0,Math.PI*2,false);
            context.closePath();

            
            context.fillStyle = 'hsla('+p.hue+',100%,'+p.brightness+'%,'+p.alpha+')';
            context.fill();

        }

    }
    

    function tick(){

        context.globalCompositeOperation = 'destination-out';
        context.fillStyle = 'rgba(0,0,0,'+10/100+')';
        context.fillRect(0,0,canvas.width,canvas.height);
        context.globalCompositeOperation = 'lighter';

        drawFireworks();

        requestAnimationFrame(tick);

    }
    tick();
})();