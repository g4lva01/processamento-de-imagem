// Declaração de uma variável global para armazenar a imagem carregada.
var imagemCarregada;
// Função chamada quando o usuário seleciona uma imagem para carregar.
function previewImage() {
    // Obtém o elemento <input> do DOM que permite ao usuário selecionar um arquivo de imagem.
    var input = document.getElementById('imagem');
    // Obtém o elemento de visualização onde a imagem será exibida.
    var preview = document.getElementById('preview');
    // Remove qualquer conteúdo existente na área de visualização.
    while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }
    // Verifica se um arquivo de imagem foi selecionado.
    var files = input.files;
    if (files.length > 0) {
        // Cria um elemento <img> com a URL do arquivo de imagem selecionado.
        imagemCarregada = document.createElement('img');
        imagemCarregada.src = URL.createObjectURL(files[0]);
        // Define o tamanho máximo da imagem para preencher a área de visualização.
        imagemCarregada.style.maxWidth = '300px';
        imagemCarregada.style.maxHeight = '100%';
        // Adiciona a imagem à área de visualização.
        preview.appendChild(imagemCarregada);
    }
}
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
        };
        // Inicia o processo de renderização dos pixels.
        renderPixels();
    } else {
        // Se nenhuma imagem foi carregada, exibe um alerta.
        alert('Por favor, selecione uma imagem antes de visualizar os pixels.');
    }
}