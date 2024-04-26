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
        for (var j = 0; j < Math.min(3, sortedColors.length); j++) {
            var colorInfo = sortedColors[j].split(',');
            var colorBox = document.createElement('div');
            colorBox.style.width = '20px';
            colorBox.style.height = '20px';
            colorBox.style.backgroundColor = `rgb(${colorInfo[0]},${colorInfo[1]},${colorInfo[2]})`;
            colorBox.style.display = 'inline-block';
            var linhaTexto = document.createElement('span');
            linhaTexto.textContent = ` RGB(${colorInfo[0]},${colorInfo[1]},${colorInfo[2]}): ${colorCount[sortedColors[j]]} vezes`;
            outputArea.appendChild(colorBox);
            outputArea.appendChild(linhaTexto);
            outputArea.appendChild(document.createElement('br'));
        }
        // Exibe as ocorrências de cada cor RGB na área de visualização.
        for (var color in colorCount) {
            var linhaTexto = document.createElement('div');
            linhaTexto.textContent = `RGB(${color}): ${colorCount[color]} vezes`;
            outputArea.appendChild(linhaTexto);
        }
    } else {
        // Se nenhuma imagem foi carregada, exibe um alerta.
        alert('Por favor, selecione uma imagem antes de visualizar os pixels.');
    }
}