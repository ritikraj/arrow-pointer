var mh, mw, wh, ww;
var animatable, time;

function v() {
    var vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return {vw, vh};
}
function drawBG(vh,vw,sx,sy,ex,ey) {
    var d = "M0,0V"+vh+"H"+vw+"V0ZM"+sx+","+sy+"H"+ex+"V"+ey+"H"+sx+"Z";
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+vw+' '+vh+'"' +
        ' style="position: fixed; top:0; left:0; z-index:2050;">\n' +
        '\t<defs>\n' +
        '\t\t<style>\n' +
        '\t\t\t.cls-1{fill:rgba(0,0,0,0.8);}\n' +
        '\t\t</style>\n' +
        '\t</defs>\n' +
        '\t<g id="Layer_2" data-name="Layer 2">\n' +
        '\t\t<g id="Layer_1-2" data-name="Layer 1">\n' +
        '\t\t\t<path class="cls-1" d="'+d+'"/>\n' +
        '\t\t</g>\n' +
        '\t</g>\n' +
        '</svg>';


    var body = document.querySelector('body');
    body.innerHTML = body.innerHTML + svg;
}

function returnQuadrent(x,y) {
    var vh = v().vh;
    var vw = v().vw;
    if(x <= vw/3){
        if(y <= vh/3) return 1;
        else if(y > vh/3 && y <= 2*vh/3) return 8;
        else if(y > 2*vh/3 && y <= vh) return 7;
    }
    else if(x > vw/3 && x <= 2*vw/3){
        if(y <= vh/3) return 2;
        else if(y > vh/3 && y <= 2*vh/3) return 9;
        else if(y > 2*vh/3 && y <= vh) return 6;
    }
    else if(x > 2*vw/3 && x <= vw){
        if(y <= vh/3) return 3;
        else if(y > vh/3 && y <= 2*vh/3) return 4;
        else if(y > 2*vh/3 && y <= vh) return 5;
    }
}


function setMessage(q, msg) {
    var message;
    if(q !== 9){
        message = '<div class="pointer-arrow-message" ' +
            'style="z-index: 2060; position: fixed; color: white; ' +
            'transform: translate(-50%, -50%); text-align: center; max-width: 100%;' +
            'top: 50%; left:50%; ">' +
            msg +
            '</div>';
    }
    else if( q === 9){
        message = '<div class="pointer-arrow-message" ' +
            'style="z-index: 2060; position: fixed; color: white; ' +
            'text-align: left; max-width: 100%;' +
            'top: 20px; left:20px; ">' +
            msg +
            '</div>';
    }
    if(v().vw < 992){
        if(q === 1 || q === 2 || q === 3 || q === 4 || q === 8 || q === 9 ){
            message = '<div class="pointer-arrow-message" ' +
                'style="z-index: 2060; position: fixed; color: white; ' +
                'text-align: left; max-width: 100%;' +
                'top: 70%; left:50%; ">' +
                msg +
                '</div>';
        }
        else if(q === 5 || q === 6 || q === 7 ){
            message = '<div class="pointer-arrow-message" ' +
                'style="z-index: 2060; position: fixed; color: white; ' +
                'text-align: left; max-width: 100%;' +
                'top: 10%; left:20%; ">' +
                msg +
                '</div>';
        }
    }
    var body = document.querySelector('body');
    body.innerHTML = body.innerHTML + message;
    var arrow = document.querySelector('.pointer-arrow-message');
    mh = arrow.offsetHeight;
    mw = arrow.offsetWidth;
    return arrow;
}


function drawArrow(q, messageOffset, windowOffset) {
    var arrowStartX, arrowStartY, arrowEndX, arrowEndY;
    var rotate;
    var c1, c2, d;
    console.log("Quadrent", q);
    if(q === 1) {
        arrowStartX = parseInt(messageOffset.x - mw/2 - 20);
        arrowStartY = parseInt(messageOffset.y - 40);
        arrowEndX = parseInt(windowOffset.x + ww + 40);
        arrowEndY = parseInt(windowOffset.y + wh + 40);
        rotate = 22;
    }
    else  if(q === 2) {
        arrowStartX = parseInt(messageOffset.x);
        arrowStartY = parseInt(messageOffset.y - 40);
        arrowEndX = parseInt(windowOffset.x + ww/2);
        arrowEndY = parseInt(windowOffset.y + wh + 40);
        rotate = 81;
    }
    else  if(q === 3) {
        arrowStartX = parseInt(messageOffset.x + mw/2 + 20);
        arrowStartY = parseInt(messageOffset.y - 40);
        arrowEndX = parseInt(windowOffset.x - 20);
        arrowEndY = parseInt(windowOffset.y + wh + 40);
        rotate = 110;
    }
    else  if(q === 4) {
        arrowStartX = parseInt(messageOffset.x + mw/2 + 20);
        arrowStartY = parseInt(messageOffset.y + mh/2 - 20);
        arrowEndX = parseInt(windowOffset.x - 40);
        arrowEndY = parseInt(windowOffset.y + wh/2 );
        rotate = 120;
    }
    else  if(q === 5) {
        arrowStartX = parseInt(messageOffset.x + mw/2 + 20);
        arrowStartY = parseInt(messageOffset.y);
        arrowEndX = parseInt(windowOffset.x - 40);
        arrowEndY = parseInt(windowOffset.y + wh/2 - 40 );
        rotate = 160;
    }
    else  if(q === 6) {
        arrowStartX = parseInt(messageOffset.x);
        arrowStartY = parseInt(messageOffset.y + mh/2 );
        arrowEndX = parseInt(windowOffset.x + ww/2);
        arrowEndY = parseInt(windowOffset.y - 40 );
        rotate = 210;
    }
    else  if(q === 7) {
        arrowStartX = parseInt(messageOffset.x - mw/2 - 20);
        arrowStartY = parseInt(messageOffset.y + mh/2 );
        arrowEndX = parseInt(windowOffset.x + ww + 40);
        arrowEndY = parseInt(windowOffset.y - 40 );
    }
    else  if(q === 8) {
        arrowStartX = parseInt(messageOffset.x - mw/2 - 20);
        arrowStartY = parseInt(messageOffset.y );
        arrowEndX = parseInt(windowOffset.x + ww + 40);
        arrowEndY = parseInt(windowOffset.y +   wh/2);
        rotate = -23;
    }
    else if(q === 9){
        arrowStartX = parseInt(messageOffset.x + mw + 20);
        arrowStartY = parseInt(messageOffset.y + mh);
        arrowEndX = parseInt(windowOffset.x - 40);
        arrowEndY = parseInt(windowOffset.y - 40);
    }

    c1 = {
        x: parseInt(Math.min(arrowStartX, arrowEndX) + Math.abs(arrowStartX - arrowEndX)/3 - 60),
        y: parseInt(Math.min(arrowStartY, arrowEndY) + Math.abs(arrowStartY - arrowEndY)/3 + 60)
    };
    c2 = {
        x: parseInt(Math.min(arrowStartX, arrowEndX) + 2*Math.abs(arrowStartX - arrowEndX)/3 + 60),
        y: parseInt(Math.min(arrowStartY, arrowEndY) + 2*Math.abs(arrowStartY - arrowEndY)/3 - 60)
    };

    if(v().vw < 992){
        if(q === 1 || q === 2 || q === 3 || q === 4 || q === 8 || q === 9 ){
            arrowStartX = parseInt(messageOffset.x + mw/2);
            arrowStartY = parseInt(messageOffset.y );
            arrowEndX = parseInt(windowOffset.x + ww/2);
            arrowEndY = parseInt(windowOffset.y + wh + 40);
        }
        else if(q === 5 || q === 6 || q === 7 ){
            arrowStartX = parseInt(messageOffset.x + mw/2);
            arrowStartY = parseInt(messageOffset.y + mh + 40 );
            arrowEndX = parseInt(windowOffset.x + ww/2);
            arrowEndY = parseInt(windowOffset.y - 40);
        }
    }

    d = "M"+arrowStartX+","+arrowStartY+" C"+c2.x+","+c2.y+" "+c1.x+","+c1.y+" "+arrowEndX+","+arrowEndY+"";

    var head = "M"+arrowEndX+","+(arrowEndY+25)+"V"+arrowEndY+"H"+(arrowEndX+25)+"";

    var headCSS ;
    if(animatable) {
        headCSS = '.head{' +
            'stroke-dasharray:200;' +
            'stroke-dashoffset:200;' +
            'animation: dash 400ms ease-out forwards '+time+'ms;' +
            '}';
    }

    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+v().vw+' '+v().vh+'"' +
        ' style="position: fixed; top:0; left:0; z-index:2070;">\n' +
        '<defs>\n' +
        '<style>\n' +
        '@keyframes dash {\n' +
        '  to {\n' +
        '    stroke-dashoffset: 0;\n' +
        '  }\n' +
        '}' +
        '@keyframes visible {\n' +
        '  to {\n' +
        '    opacity: 1;\n' +
        '  }\n' +
        '}' +
        '.arrow, .head{' +
        'fill:rgba(0,0,0,0);' +
        'stroke: #FFFFFF;' +
        'stroke-width: 4px;' +
        'stroke-linecap: round;' +
        '}' + headCSS +
        '.rotate{' +
        'transform: rotate('+rotate+'deg);' +
        'transform-origin: ' +arrowEndX+'px '+arrowEndY+'px;' +
        '}' +
        '</style>\n' +
        '</defs>' +
        '\t\t\t<path id="arrow" class="arrow" d="'+d+'"/>\n' +
        '\t\t\t<path class="head rotate" d="'+head+'"/>\n' +
        '</svg>';
    var body = document.querySelector('body');
    body.innerHTML = body.innerHTML + svg;

    if(animatable){
        var myPath = document.getElementById("arrow");
        var length = myPath.getTotalLength();
        myPath.style.strokeDasharray = length;
        myPath.style.strokeDashoffset = length;
        myPath.style.animation = "dash "+time+"ms ease-out forwards";
    }
}

function setArrow(el, message, options) {
    var sx = el.offsetLeft - 20;
    var sy = el.offsetTop - 20;
    var ex = sx + el.clientWidth + 40;
    var ey = sy + el.clientHeight + 40;
    if(options.time) time = options.time;
    else time = 400;
    if(options.animatable) animatable = options.animatable;
    drawBG(v().vh,v().vw,sx,sy,ex,ey);
    ww = ex - sx - 40;
    wh = ey - sy - 40;
    var q = returnQuadrent(sx + 20, sy + 20);
    var msgEl = setMessage(q, message);
    drawArrow(q,
        {x: msgEl.offsetLeft, y: msgEl.offsetTop},
        {x: sx+20, y: sy+20});
}

var el = document.getElementById('el');
var msg = "<h1 style='font-size: 20px'>Hello World</h1>";

window.onload = function () {
    setArrow(el, msg, {
        animatable: true
    });
};