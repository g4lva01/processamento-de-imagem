function flipImagemHorizontal(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const imagemFlip = new Image();
    imagemFlip.src = canvas.toDataURL();
    return imagemFlip;
}

function flipImagem() {
    const previewDiv = document.getElementById('preview');
    const imgElement = previewDiv.querySelector('img');
    if (!imgElement) {
        alert('Imagem não encontrada dentro do elemento de pré-visualização.');
        return;
    }
    const imagemFlip = flipImagemHorizontal(imgElement);
    previewDiv.innerHTML = '';
    previewDiv.appendChild(imagemFlip);
}