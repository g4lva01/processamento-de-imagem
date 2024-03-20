function updateRangeValue(value) {
    document.getElementById('range').textContent = value;
    processarImagem();
}

function mostrarBarraDeRange() {
    var range = document.getElementById('range');
    range.style.display = 'inline-block';
}

function transformarImagem2D(img, tamanhoPixel) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = [];
    for (let y = 0; y < canvas.height; y += tamanhoPixel) {
        for (let x = 0; x < canvas.width; x += tamanhoPixel) {
            const offset = (y * canvas.width + x) * 4;
            const r = imageData.data[offset];
            const g = imageData.data[offset + 1];
            const b = imageData.data[offset + 2];
            for (let blockY = 0; blockY < tamanhoPixel; blockY++) {
                for (let blockX = 0; blockX < tamanhoPixel; blockX++) {
                    const pixelOffset = ((y + blockY) * canvas.width + (x + blockX)) * 4;
                    imageData.data[pixelOffset] = r;
                    imageData.data[pixelOffset + 1] = g;
                    imageData.data[pixelOffset + 2] = b;
                }
            }
        }
    }
    ctx.putImageData(imageData, 0, 0);
    const novaImagem = new Image();
    novaImagem.src = canvas.toDataURL();
    return novaImagem;
}

function processarImagem() {
    mostrarBarraDeRange();
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
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                for (let y = 0; y < canvas.height; y += tamanhoPixel) {
                    for (let x = 0; x < canvas.width; x += tamanhoPixel) {
                        const offset = (y * canvas.width + x) * 4;
                        const r = imageData.data[offset];
                        const g = imageData.data[offset + 1];
                        const b = imageData.data[offset + 2];
                        for (let blockY = 0; blockY < tamanhoPixel; blockY++) {
                            for (let blockX = 0; blockX < tamanhoPixel; blockX++) {
                                const pixelOffset = ((y + blockY) * canvas.width + (x + blockX)) * 4;
                                imageData.data[pixelOffset] = r;
                                imageData.data[pixelOffset + 1] = g;
                                imageData.data[pixelOffset + 2] = b;
                            }
                        }
                    }
                }
                ctx.putImageData(imageData, 0, 0);
                const novaImagem = new Image();
                novaImagem.src = canvas.toDataURL();
                const previewDiv = document.getElementById('preview');
                previewDiv.innerHTML = '';
                previewDiv.appendChild(novaImagem);
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