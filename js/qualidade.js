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
function ajustarQualidadeImagem(qualidade) {
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

            // Definir a resolução com base na qualidade escolhida
            var novaLargura = imagem.width;
            var novaAltura = imagem.height;

            switch (qualidade) {
                case '240':
                    novaLargura = imagem.width * 426 / imagem.height;
                    novaAltura = 240;
                    break;
                case '360':
                    novaLargura = imagem.width * 640 / imagem.height;
                    novaAltura = 360;
                    break;
                case '480':
                    novaLargura = imagem.width * 854 / imagem.height;
                    novaAltura = 480;
                    break;
                case '720':
                    novaLargura = imagem.width * 1280 / imagem.height;
                    novaAltura = 720;
                    break;
                case '1080':
                    novaLargura = imagem.width * 1920 / imagem.height;
                    novaAltura = 1080;
                    break;
                case '1440':
                    novaLargura = imagem.width * 2560 / imagem.height;
                    novaAltura = 1440;
                    break;
                case '2160':
                    novaLargura = imagem.width * 3840 / imagem.height;
                    novaAltura = 2160;
                    break;
                case '4320':
                    novaLargura = imagem.width * 7680 / imagem.height;
                    novaAltura = 4320;
                    break;
                default:
                    break;
            }

            // Definir as dimensões do canvas com base na resolução
            canvas.width = novaLargura;
            canvas.height = novaAltura;

            // Desenhar a imagem original no canvas nas coordenadas 0, 0 (sem redimensionar)
            context.drawImage(novaImagem, 0, 0, canvas.width, canvas.height);

            // Limpar o preview
            preview.innerHTML = '';

            // Adicionar o canvas ajustado ao preview
            preview.appendChild(canvas);
        };

        // Definir a origem da nova imagem como a mesma da imagem original
        novaImagem.src = imagem.src;
    }
}