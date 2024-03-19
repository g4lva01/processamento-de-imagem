function criarFiltroOndular() {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    var filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    filter.setAttribute("id", "filter-ondular");
    var feTurbulence = document.createElementNS("http://www.w3.org/2000/svg", "feTurbulence");
    feTurbulence.setAttribute("type", "turbulence");
    feTurbulence.setAttribute("baseFrequency", "0.02");
    feTurbulence.setAttribute("numOctaves", "3");
    feTurbulence.setAttribute("result", "turbulence");
    var feDisplacementMap = document.createElementNS("http://www.w3.org/2000/svg", "feDisplacementMap");
    feDisplacementMap.setAttribute("in", "SourceGraphic");
    feDisplacementMap.setAttribute("in2", "turbulence");
    feDisplacementMap.setAttribute("scale", "20");
    feDisplacementMap.setAttribute("xChannelSelector", "R");
    feDisplacementMap.setAttribute("yChannelSelector", "G");
    filter.appendChild(feTurbulence);
    filter.appendChild(feDisplacementMap);
    defs.appendChild(filter);
    svg.appendChild(defs);
    document.body.appendChild(svg);
}
criarFiltroOndular();
function ondularImagem() {
    var imagem = document.getElementById('preview').querySelector('img');
    if (imagem) {
        imagem.style.filter = "url(#filter-ondular)";
    } else {
        alert('Por favor, selecione uma imagem antes de aplicar o efeito.');
    }
}