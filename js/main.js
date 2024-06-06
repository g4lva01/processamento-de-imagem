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