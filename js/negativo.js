function aplicarNegativo(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = 255 - imageData.data[i];
        imageData.data[i + 1] = 255 - imageData.data[i + 1];
        imageData.data[i + 2] = 255 - imageData.data[i + 2];
    }
    ctx.putImageData(imageData, 0, 0);
    const novaImagem = new Image();
    novaImagem.src = canvas.toDataURL();
    return novaImagem;
}

function processarImagemNegativa() {
    const inputElement = document.getElementById('imagem');
    if (!inputElement) {
        alert('Elemento input não encontrado. Certifique-se de que o ID está correto.');
        return;
    }
    const tamanhoPixel = parseInt(document.getElementById('range').value);
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
                const novaImagem = transformarImagem2D(img, tamanhoPixel);
                const imagemNegativa = aplicarNegativo(novaImagem);
                const previewDiv = document.getElementById('preview');
                previewDiv.innerHTML = '';
                previewDiv.appendChild(imagemNegativa);
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