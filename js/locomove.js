// Função para visualizar a imagem selecionada pelo usuário
function viewImage() {
    // Obtém a referência para o elemento de visualização da imagem
    var preview = document.getElementById('preview');
    // Obtém o arquivo de imagem selecionado pelo usuário
    var file = document.getElementById('imagem').files[0];
    // Cria um novo leitor de arquivo
    var reader = new FileReader();
    // Define o evento que será chamado quando a leitura do arquivo estiver concluída
    reader.onloadend = function () {
        // Cria um elemento de imagem
        var img = document.createElement('img');
        // Define o atributo src da imagem como o resultado da leitura do arquivo
        img.src = reader.result;
        // Limpa o conteúdo atual do elemento de visualização
        preview.innerHTML = '';
        // Adiciona o elemento de imagem ao elemento de visualização
        preview.appendChild(img);
    };
    // Se um arquivo de imagem foi selecionado
    if (file) {
        // Lê o arquivo como um URL de dados
        reader.readAsDataURL(file);
    } else {
        // Se nenhum arquivo foi selecionado, limpa o elemento de visualização
        preview.innerHTML = '';
    }
}
// Função para animar a imagem com um efeito oscilatório
function animateImage(img) {
    // Definição de parâmetros para a animação
    var amplitude = 10;
    var frequency = 0.05;
    var phase = 0;
    var xOffset = 0;
    var yOffset = 0;
    var direction = 1;
    var distanceLimit = 200; // Limite de distância
    var distanceTraveled = 0; // Distância percorrida
    var lastXOffset = 0; // Posição anterior
    var startTime = performance.now();
    // Função para atualizar a posição da imagem
    function update() {
        // Atualiza o deslocamento horizontal
        xOffset += direction;
        // Calcula a distância percorrida
        distanceTraveled += Math.abs(xOffset - lastXOffset);
        // Atualiza a posição anterior
        lastXOffset = xOffset;
        // Alterna a direção se atingir os limites
        if (distanceTraveled >= distanceLimit || xOffset <= 0) {
            direction = 1;
            distanceTraveled = 0;
        } else if (xOffset >= distanceLimit) {
            direction = -1;
            distanceTraveled = 0;
        }
        // Calcula o deslocamento vertical com base na função senoidal
        yOffset = amplitude * Math.sin(2 * Math.PI * frequency * xOffset / img.width + phase);
        // Aplica a transformação CSS para mover a imagem
        img.style.transform = 'translate(' + xOffset + 'px,' + yOffset + 'px)';
        // Continua atualizando a posição da imagem se ainda não atingiu o limite e xOffset não é zero
        if (distanceTraveled < distanceLimit && xOffset !== 0) {
            requestAnimationFrame(update);
        }
    }
    // Inicia a animação
    update();
}
// Função para iniciar a animação da imagem
function locomoverImagem() {
    // Obtém a referência para o elemento de visualização
    var preview = document.getElementById('preview');
    // Busca a imagem dentro do elemento de visualização
    var img = preview.querySelector('img');
    // Se uma imagem for encontrada, inicia a animação
    if (img) {
        animateImage(img);
    }
}