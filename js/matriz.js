// Função chamada quando o usuário deseja visualizar os pixels da imagem carregada.
function visualizarPixels() {
    // Obtém o elemento de visualização.
    var preview = document.getElementById('preview');
    // Cria um novo elemento <div> para exibir as informações dos pixels e o adiciona à área de visualização.
    var outputArea = document.createElement('div');
    outputArea.style.width = '100%';
    outputArea.style.height = '200px';
    outputArea.style.overflowY = 'auto';
    outputArea.style.border = '2px solid #725ac1';
    outputArea.style.fontFamily = 'monospace';
    preview.innerHTML = '';
    preview.appendChild(outputArea);
    // Cria um objeto para armazenar a contagem de ocorrências de cada valor de cor RGB.
    var colorCount = {};
    // Verifica se uma imagem foi carregada.
    if (imagemCarregada) {
        var img = imagemCarregada;
        // Cria um canvas e obtém o contexto 2D.
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // Define o tamanho do canvas como o tamanho da imagem.
        canvas.width = img.width;
        canvas.height = img.height;
        // Desenha a imagem no canvas.
        ctx.drawImage(img, 0, 0, img.width, img.height);
        // Obtém os dados de imagem do canvas.
        var pixels = ctx.getImageData(0, 0, img.width, img.height).data;
        // Define o número de pixels a serem renderizados por frame.
        var pixelsPerFrame = 100;
        var currentPixelIndex = 0;
        // Função para renderizar os pixels de forma assíncrona.
        var renderPixels = function() {
            var startTime = performance.now();
            // Itera sobre os pixels.
            for (var i = 0; i < pixelsPerFrame && currentPixelIndex < pixels.length; i++) {
                var pixelIndex = currentPixelIndex;
                currentPixelIndex += 4;
                // Calcula as coordenadas (x, y) do pixel.
                var y = Math.floor(pixelIndex / (img.width * 4));
                var x = Math.floor((pixelIndex / 4) % img.width);
                // Obtém os valores RGB do pixel.
                var valorRGB = Array.from(pixels.slice(pixelIndex, pixelIndex + 3));
                // Cria um elemento <div> para exibir as informações do pixel e o adiciona à área de visualização.
                var linhaTexto = document.createElement('div');
                linhaTexto.textContent = `(${x},${y}): RGB(${valorRGB.join(', ')})`;
                outputArea.appendChild(linhaTexto);
            }
            // Continua renderizando os pixels se ainda houver pixels a serem processados.
            if (currentPixelIndex < pixels.length) {
                requestAnimationFrame(renderPixels);
            } else {
                // Exibe o tempo de execução no console quando todos os pixels forem processados.
                var endTime = performance.now();
                console.log('Tempo de execução: ' + (endTime - startTime) + ' ms');
            }
        }
        // Itera sobre os pixels para contar as ocorrências de cada valor de cor RGB.
        for (var i = 0; i < pixels.length; i += 4) {
            var r = pixels[i];
            var g = pixels[i + 1];
            var b = pixels[i + 2];
            var rgb = `${r},${g},${b}`;
            // Incrementa a contagem para esta cor RGB.
            if (rgb in colorCount) {
                colorCount[rgb]++;
            } else {
                colorCount[rgb] = 1;
            }
        }
        // Exibe as três cores mais utilizadas no canto superior direito da área de visualização.
        var sortedColors = Object.keys(colorCount).sort(function(a, b) {
            return colorCount[b] - colorCount[a];
        });
        var topColorsContainer = document.createElement('div');
        topColorsContainer.style.display = 'flex'; // Define um layout flexível para os elementos
        topColorsContainer.style.alignItems = 'center'; // Centraliza os elementos verticalmente
        for (var j = 0; j < Math.min(3, sortedColors.length); j++) {
            var colorInfo = sortedColors[j].split(',');
            var colorBox = document.createElement('div');
            colorBox.style.width = '20px';
            colorBox.style.height = '20px';
            colorBox.style.backgroundColor = `rgb(${colorInfo[0]},${colorInfo[1]},${colorInfo[2]})`;
            colorBox.style.display = 'inline-block';
            var linhaTexto = document.createElement('span');
            linhaTexto.textContent = ` RGB(${colorInfo[0]},${colorInfo[1]},${colorInfo[2]}): ${colorCount[sortedColors[j]]} vezes`;
            var colorContainer = document.createElement('div');
            colorContainer.style.marginRight = '10px'; // Espaço entre as cores
            colorContainer.appendChild(colorBox);
            colorContainer.appendChild(linhaTexto);
            topColorsContainer.appendChild(colorContainer);
        }
        outputArea.appendChild(topColorsContainer);
        // Adiciona uma linha separadora
        var linhaSeparadora = document.createElement('hr');
        outputArea.appendChild(linhaSeparadora);
        renderPixels();
    } else {
        // Se nenhuma imagem foi carregada, exibe um alerta.
        alert('Por favor, selecione uma imagem antes de visualizar os pixels.');
    }
}