function v() {
    var vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return {vw, vh};
}
function drawSVG(vh,vw,sx,sy,ex,ey) {
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
}
function setArrow(el, message) {
    var sx = el.offsetLeft - 20;
    var sy = el.offsetTop - 20;
    var ex = sx + el.clientWidth + 40;
    var ey = sy + el.clientHeight + 40;
    drawSVG(v().vh,v().vw,sx,sy,ex,ey);
    var q = returnQuadrent(el.offsetLeft, el.offsetTop);
}

var el = document.getElementById('el');
var msg = "Hello World";
setArrow(el, msg);