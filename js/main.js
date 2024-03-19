var imagemCarregada;

function previewImage() {
    var input = document.getElementById('imagem');
    var preview = document.getElementById('preview');
    while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }
    var files = input.files;
    if (files.length > 0) {
        imagemCarregada = document.createElement('img');
        imagemCarregada.src = URL.createObjectURL(files[0]);
        imagemCarregada.style.maxWidth = '100%';
        imagemCarregada.style.maxHeight = '100%';
        preview.appendChild(imagemCarregada);
    }
}

function visualizarPixels() {
    var preview = document.getElementById('preview');
    var outputArea = document.createElement('div');
    outputArea.style.width = '100%';
    outputArea.style.height = '200px';
    outputArea.style.overflowY = 'auto';
    outputArea.style.border = '1px solid #000';
    outputArea.style.fontFamily = 'monospace';
    preview.innerHTML = '';
    preview.appendChild(outputArea);
    if (imagemCarregada) {
        var img = imagemCarregada;
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var pixels = ctx.getImageData(0, 0, img.width, img.height).data;
        var pixelsPerFrame = 100;
        var currentPixelIndex = 0;
        var renderPixels = function() {
            var startTime = performance.now();
            for (var i = 0; i < pixelsPerFrame && currentPixelIndex < pixels.length; i++) {
                var pixelIndex = currentPixelIndex;
                currentPixelIndex += 4;
                var y = Math.floor(pixelIndex / (img.width * 4));
                var x = Math.floor((pixelIndex / 4) % img.width);
                var valorRGB = Array.from(pixels.slice(pixelIndex, pixelIndex + 3));
                var linhaTexto = document.createElement('div');
                linhaTexto.textContent = `(${x},${y}): RGB(${valorRGB.join(', ')})`;
                outputArea.appendChild(linhaTexto);
            }
            if (currentPixelIndex < pixels.length) {
                requestAnimationFrame(renderPixels);
            } else {
                var endTime = performance.now();
                console.log('Tempo de execução: ' + (endTime - startTime) + ' ms');
            }
        };
        renderPixels();
    } else {
        alert('Por favor, selecione uma imagem antes de visualizar os pixels.');
    }
}