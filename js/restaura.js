function restaurarImagemOriginal(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const imagemOriginal = new Image();
    imagemOriginal.src = canvas.toDataURL();
    return imagemOriginal;
}

function restaurarImagem() {
    const inputElement = document.getElementById('imagem');
    if (!inputElement) {
        alert('Elemento input não encontrado. Certifique-se de que o ID está correto.');
        return;
    }
    if (inputElement.files.length > 0) {
        const file = inputElement.files[0];
        if (!file) {
            alert('Nenhum arquivo selecionado.');
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const previewDiv = document.getElementById('preview');
                previewDiv.innerHTML = '';
                const imagemOriginal = restaurarImagemOriginal(img);
                previewDiv.appendChild(imagemOriginal);
            };
            img.src = e.target.result;
        };
        reader.onerror = function () {
            alert('Erro ao ler o arquivo.');
        };
        reader.readAsDataURL(file);
    } else {
        alert('Por favor, selecione um arquivo antes de processá-lo.');
    }
}