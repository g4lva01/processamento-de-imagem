// Esta função restaura a imagem original sem quaisquer modificações
function restaurarImagemOriginal(img) {
    // Cria um novo elemento canvas
    const canvas = document.createElement('canvas');
    // Obtém o contexto 2D do canvas
    const ctx = canvas.getContext('2d');
    // Define a largura e altura do canvas para corresponder às dimensões da imagem
    canvas.width = img.width;
    canvas.height = img.height;
    // Desenha a imagem no canvas
    ctx.drawImage(img, 0, 0);
    // Converte o conteúdo do canvas em uma URL de dados
    const imagemOriginal = new Image();
    imagemOriginal.src = canvas.toDataURL();
    // Retorna a imagem original
    return imagemOriginal;
}
// Esta função é chamada quando ocorre uma alteração no elemento de entrada de arquivo
function restaurarImagem() {
    // Obtém o elemento de entrada de arquivo pelo ID
    const inputElement = document.getElementById('imagem');
    // Verifica se o elemento de entrada foi encontrado no documento
    if (!inputElement) {
        // Exibe um alerta se o elemento não foi encontrado e sai da função
        alert('Elemento input não encontrado. Certifique-se de que o ID está correto.');
        return;
    }
    // Verifica se pelo menos um arquivo foi selecionado
    if (inputElement.files.length > 0) {
        // Obtém o primeiro arquivo selecionado
        const file = inputElement.files[0];
        // Verifica se o arquivo existe
        if (!file) {
            // Exibe um alerta se nenhum arquivo foi selecionado e sai da função
            alert('Nenhum arquivo selecionado.');
            return;
        }
        // Cria um novo leitor de arquivo
        const reader = new FileReader();
        // Define a função a ser executada quando a leitura do arquivo for concluída com sucesso
        reader.onload = function (e) {
            // Cria um novo objeto de imagem
            const img = new Image();
            // Define a função a ser executada quando a imagem for carregada
            img.onload = function () {
                // Obtém o elemento de pré-visualização
                const previewDiv = document.getElementById('preview');
                // Limpa o conteúdo do elemento de pré-visualização
                previewDiv.innerHTML = '';
                // Restaura a imagem original e a adiciona ao elemento de pré-visualização
                const imagemOriginal = restaurarImagemOriginal(img);
                previewDiv.appendChild(imagemOriginal);
            };
            // Define a fonte da imagem como a URL de dados do arquivo
            img.src = e.target.result;
        };
        // Define a função a ser executada em caso de erro na leitura do arquivo
        reader.onerror = function () {
            // Exibe um alerta em caso de erro na leitura do arquivo
            alert('Erro ao ler o arquivo.');
        };
        // Lê o conteúdo do arquivo como uma URL de dados
        reader.readAsDataURL(file);
    } else {
        // Exibe um alerta se nenhum arquivo foi selecionado
        alert('Por favor, selecione um arquivo antes de processá-lo.');
    }
}