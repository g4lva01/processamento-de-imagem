// Função para aplicar o efeito negativo a uma imagem
function aplicarNegativo(img) {
    // Criar um elemento de canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // Definir as dimensões do canvas para as mesmas da imagem
    canvas.width = img.width;
    canvas.height = img.height;
    // Desenhar a imagem no canvas
    ctx.drawImage(img, 0, 0);
    // Obter os dados de imagem do canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // Percorrer os dados de imagem e aplicar o efeito negativo
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = 255 - imageData.data[i]; // Canal Vermelho
        imageData.data[i + 1] = 255 - imageData.data[i + 1]; // Canal Verde
        imageData.data[i + 2] = 255 - imageData.data[i + 2]; // Canal Azul
    }
    // Colocar os dados de imagem modificados de volta no canvas
    ctx.putImageData(imageData, 0, 0);
    // Criar uma nova imagem com o efeito negativo aplicado
    const novaImagem = new Image();
    novaImagem.src = canvas.toDataURL(); // Converter o canvas para um URL de dados
    return novaImagem;
}

// Função principal para processar a imagem e aplicar o efeito negativo
function processarImagemNegativa() {
    // Obter o elemento de input de imagem
    const inputElement = document.getElementById('imagem');
    // Verificar se o elemento de input existe
    if (!inputElement) {
        alert('Elemento input não encontrado. Certifique-se de que o ID está correto.');
        return;
    }
    // Obter o tamanho do pixel de um elemento de input range
    const tamanhoPixel = parseInt(document.getElementById('range').value);
    // Verificar se um arquivo de imagem foi selecionado
    if (inputElement.files.length > 0) {
        const file = inputElement.files[0];
        // Verificar se o arquivo existe
        if (!file) {
            alert('Nenhum arquivo selecionado.');
            return;
        }
        // Ler o arquivo como um data URL
        const reader = new FileReader();
        reader.onload = function (e) {
            // Quando a imagem é carregada
            const img = new Image();
            img.onload = function () {
                // Aplicar o efeito negativo diretamente à imagem
                const imagemNegativa = aplicarNegativo(img);
                // Exibir a imagem negativa no elemento de pré-visualização
                const previewDiv = document.getElementById('preview');
                previewDiv.innerHTML = '';
                previewDiv.appendChild(imagemNegativa);
            };
            // Definir a origem da imagem como o data URL
            img.src = e.target.result;
        };
        reader.onerror = function () {
            alert('Erro ao ler o arquivo.');
        };
        // Ler o arquivo como um data URL
        reader.readAsDataURL(file);
    } else {
        alert('Por favor, selecione um arquivo antes de processá-lo.');
    }
}