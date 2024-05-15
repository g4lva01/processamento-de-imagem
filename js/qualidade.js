// Esta função alterna a exibição do botão "Qualidade" e do controle deslizante de faixa (range).
function toggleQuality() {
    // Obtém uma referência para o botão "Qualidade".
    const qualityButton = document.querySelector('#quality-button');
    // Obtém uma referência para o controle deslizante de faixa (range).
    const qualityRange = document.querySelector('#quality-range');
    // Verifica se o botão "Qualidade" está visível.
    if (qualityButton.style.display !== 'none') {
        // Se o botão "Qualidade" estiver visível, oculta-o.
        qualityButton.style.display = 'none';
        // Mostra o controle deslizante de faixa (range).
        qualityRange.style.display = 'block';
    } else {
        // Se o botão "Qualidade" estiver oculto, mostra-o.
        qualityButton.style.display = 'block';
        // Oculta o controle deslizante de faixa (range).
        qualityRange.style.display = 'none';
    }
}

// Variável para armazenar a URL da imagem original
var originalImageSrc = '';

// Função para aplicar o efeito de desfoque na imagem
function aplicarDesfoqueImagem(blurValue = 5) {
    var preview = document.getElementById('preview');
    var imagem = preview.querySelector('img');

    // Se houver uma imagem carregada
    if (imagem) {
        // Criar um novo elemento de imagem
        var novaImagem = new Image();

        // Definir o carregador de eventos para a nova imagem
        novaImagem.onload = function() {
            // Criar um canvas para desenhar a imagem
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');

            // Definir as dimensões do canvas com base na imagem original
            canvas.width = imagem.width;
            canvas.height = imagem.height;

            // Aplicar o filtro de desfoque de acordo com o valor do range
            if (blurValue > 0) {
                context.filter = `blur(${blurValue}px)`;
            } else {
                context.filter = 'none';
            }

            // Desenhar a imagem original no canvas
            context.drawImage(novaImagem, 0, 0, canvas.width, canvas.height);

            // Limpar o preview
            preview.innerHTML = '';

            // Adicionar o canvas ajustado ao preview
            preview.appendChild(canvas);
        };

        // Definir a origem da nova imagem como a mesma da imagem original
        if (blurValue == 0) {
            novaImagem.src = originalImageSrc;  // Usar a imagem original armazenada
        } else {
            novaImagem.src = imagem.src;
        }
    }
}

// Listener para o controle deslizante de desfoque
document.getElementById('blurRange').addEventListener('input', function() {
    var blurValue = this.value;
    aplicarDesfoqueImagem(blurValue);
});

// Listener para o evento 'change' do input de imagem
document.getElementById('imagem').addEventListener('change', function(event) {
    var input = event.target;
    var preview = document.getElementById('preview');
    var reader = new FileReader();

    // Remove qualquer conteúdo existente na área de visualização.
    while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    // Verifica se um arquivo de imagem foi selecionado.
    var files = input.files;
    if (files.length > 0) {
        // Cria um elemento <img> com a URL do arquivo de imagem selecionado.
        var img = document.createElement('img');
        img.onload = function() {
            // Armazena a URL da imagem original
            originalImageSrc = img.src;
            // Adiciona a imagem à área de visualização.
            preview.appendChild(img);
            // Aplica o desfoque inicial
            aplicarDesfoqueImagem(document.getElementById('blurRange').value);
        };
        reader.readAsDataURL(files[0]);
    }
});