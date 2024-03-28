// Função para alternar a visibilidade do botão "Pixelizar" e da barra de range
function toggleRange() {
    // Obtém o botão "Pixelizar" e a barra de range pelo ID
    var pixelizarButton = document.getElementById('pixelizar-button');
    var range = document.getElementById('range');
    // Oculta o botão "Pixelizar"
    pixelizarButton.style.display = 'none';
    // Exibe a barra de range
    range.style.display = 'block';
    // Chama a função para processar a imagem assim que a barra de range é exibida
    processarImagem();
}
// Função para atualizar o valor exibido em um elemento HTML com o ID 'range' e chamar a função de processamento de imagem
function updateRangeValue(value) {
    document.getElementById('range').textContent = value; // Atualiza o valor exibido
    processarImagem(); // Chama a função de processamento de imagem
}
// Função para exibir a barra de range na interface do usuário
function mostrarBarraDeRange() {
    var range = document.getElementById('range');
    range.style.display = 'inline-block'; // Altera o estilo CSS para exibir a barra de range
}
// Função para transformar a imagem com base no tamanho do pixel fornecido
function transformarImagem2D(img, tamanhoPixel) {
    const canvas = document.createElement('canvas'); // Cria um elemento de canvas
    const ctx = canvas.getContext('2d'); // Obtém o contexto 2D do canvas
    canvas.width = img.width; // Define a largura do canvas como a largura da imagem
    canvas.height = img.height; // Define a altura do canvas como a altura da imagem
    ctx.drawImage(img, 0, 0); // Desenha a imagem no canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); // Obtém os dados de imagem do contexto 2D
    const pixels = []; // Array para armazenar os pixels da imagem
    // Loop pelos pixels da imagem com base no tamanho do pixel especificado
    for (let y = 0; y < canvas.height; y += tamanhoPixel) {
        for (let x = 0; x < canvas.width; x += tamanhoPixel) {
            const offset = (y * canvas.width + x) * 4; // Calcula o deslocamento no array de dados da imagem
            const r = imageData.data[offset]; // Componente vermelho do pixel
            const g = imageData.data[offset + 1]; // Componente verde do pixel
            const b = imageData.data[offset + 2]; // Componente azul do pixel
            // Loop para duplicar os pixels em blocos do tamanho especificado
            for (let blockY = 0; blockY < tamanhoPixel; blockY++) {
                for (let blockX = 0; blockX < tamanhoPixel; blockX++) {
                    const pixelOffset = ((y + blockY) * canvas.width + (x + blockX)) * 4; // Calcula o deslocamento do pixel no array de dados da imagem
                    imageData.data[pixelOffset] = r; // Define o componente vermelho do pixel
                    imageData.data[pixelOffset + 1] = g; // Define o componente verde do pixel
                    imageData.data[pixelOffset + 2] = b; // Define o componente azul do pixel
                }
            }
        }
    }
    ctx.putImageData(imageData, 0, 0); // Desenha os dados de imagem de volta no canvas
    const novaImagem = new Image(); // Cria um novo elemento de imagem
    novaImagem.src = canvas.toDataURL(); // Define o src da nova imagem como os dados do canvas
    return novaImagem; // Retorna a nova imagem transformada
}
// Função para processar a imagem carregada pelo usuário
function processarImagem() {
    mostrarBarraDeRange(); // Exibe a barra de range na interface do usuário
    const inputElement = document.getElementById('imagem'); // Obtém o elemento de entrada de arquivo
    if (!inputElement) { // Verifica se o elemento de entrada de arquivo existe
        alert('Elemento input não encontrado. Certifique-se de que o ID está correto.'); // Alerta se o elemento não for encontrado
        return;
    }
    const tamanhoPixel = parseInt(document.getElementById('range').value); // Obtém o tamanho do pixel do elemento de range
    if (inputElement.files.length > 0) { // Verifica se um arquivo foi selecionado
        const file = inputElement.files[0]; // Obtém o primeiro arquivo selecionado
        if (!file) { // Verifica se o arquivo é válido
            alert('Nenhum arquivo selecionado.'); // Alerta se nenhum arquivo for selecionado
            return;
        }
        const reader = new FileReader(); // Cria um leitor de arquivos
        reader.onload = function (e) { // Função de retorno de chamada para quando a leitura do arquivo for concluída
            const img = new Image(); // Cria um novo elemento de imagem
            img.onload = function () { // Função de retorno de chamada para quando a imagem for carregada
                const canvas = document.createElement('canvas'); // Cria um elemento de canvas
                const ctx = canvas.getContext('2d'); // Obtém o contexto 2D do canvas
                canvas.width = img.width; // Define a largura do canvas como a largura da imagem
                canvas.height = img.height; // Define a altura do canvas como a altura da imagem
                ctx.drawImage(img, 0, 0); // Desenha a imagem no canvas
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); // Obtém os dados de imagem do contexto 2D
                // Loop pelos pixels da imagem com base no tamanho do pixel especificado
                for (let y = 0; y < canvas.height; y += tamanhoPixel) {
                    for (let x = 0; x < canvas.width; x += tamanhoPixel) {
                        const offset = (y * canvas.width + x) * 4; // Calcula o deslocamento no array de dados da imagem
                        const r = imageData.data[offset]; // Componente vermelho do pixel
                        const g = imageData.data[offset + 1]; // Componente verde do pixel
                        const b = imageData.data[offset + 2]; // Componente azul do pixel
                        // Loop para duplicar os pixels em blocos do tamanho especificado
                        for (let blockY = 0; blockY < tamanhoPixel; blockY++) {
                            for (let blockX = 0; blockX < tamanhoPixel; blockX++) {
                                const pixelOffset = ((y + blockY) * canvas.width + (x + blockX)) * 4; // Calcula o deslocamento do pixel no array de dados da imagem
                                imageData.data[pixelOffset] = r; // Define o componente vermelho do pixel
                                imageData.data[pixelOffset + 1] = g; // Define o componente verde do pixel
                                imageData.data[pixelOffset + 2] = b; // Define o componente azul do pixel
                            }
                        }
                    }
                }
                ctx.putImageData(imageData, 0, 0); // Desenha os dados de imagem de volta no canvas
                const novaImagem = new Image(); // Cria um novo elemento de imagem
                novaImagem.src = canvas.toDataURL(); // Define o src da nova imagem como os dados do canvas
                const previewDiv = document.getElementById('preview'); // Obtém o elemento de visualização
                previewDiv.innerHTML = ''; // Limpa o conteúdo existente
                previewDiv.appendChild(novaImagem); // Adiciona a nova imagem à visualização
            };
            img.src = e.target.result; // Define o src da imagem carregada como o resultado da leitura do arquivo
        };
        reader.onerror = function () { // Função de retorno de chamada para lidar com erros de leitura do arquivo
            alert('Erro ao ler o arquivo.'); // Alerta sobre erro de leitura do arquivo
        };
        reader.readAsDataURL(file); // Lê o arquivo como um URL de dados
    } else {
        alert('Por favor, selecione um arquivo antes de processá-lo.'); // Alerta se nenhum arquivo for selecionado
    }
}