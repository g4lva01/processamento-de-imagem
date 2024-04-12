// Função que recebe uma imagem e a vira verticalmente
function flipImagemVertical(img) {
    // Cria um novo elemento canvas
    const canvas = document.createElement('canvas');
    // Obtém o contexto 2D do canvas
    const ctx = canvas.getContext('2d');
    // Define a largura e altura do canvas igual à largura e altura da imagem
    canvas.width = img.width;
    canvas.height = img.height;
    // Translada o contexto para a largura do canvas
    ctx.translate(canvas.width, 0);
    // Inverte a escala verticalmente
    ctx.scale(-1, 1);
    // Desenha a imagem no contexto 2D do canvas
    ctx.drawImage(img, 0, 0, img.width, img.height);
    // Cria um novo elemento de imagem
    const imagemFlip = new Image();
    // Define a fonte da imagem como os dados da imagem do canvas (a imagem virada)
    imagemFlip.src = canvas.toDataURL();
    // Retorna a imagem virada
    return imagemFlip;
}
// Função que vira a imagem dentro de um elemento de pré-visualização
function flipImagem() {
    // Obtém o elemento de pré-visualização pelo seu ID
    const previewDiv = document.getElementById('preview');
    // Procura um elemento de imagem dentro do elemento de pré-visualização
    const imgElement = previewDiv.querySelector('img');
    // Verifica se o elemento de imagem não foi encontrado
    if (!imgElement) {
        // Se não foi encontrado, exibe um alerta e sai da função
        alert('Imagem não encontrada dentro do elemento de pré-visualização.');
        return;
    }
    // Chama a função flipImagemVertical para virar a imagem verticalmente
    const imagemFlip = flipImagemVertical(imgElement);
    // Limpa o conteúdo do elemento de pré-visualização
    previewDiv.innerHTML = '';
    // Adiciona a imagem virada ao elemento de pré-visualização
    previewDiv.appendChild(imagemFlip);
}
