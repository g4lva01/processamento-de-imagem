// Esta função alterna a exibição do botão "Tamanho" e do controle deslizante de faixa (range).
function toggleSize() {
    // Obtém uma referência para o botão "Tamanho".
    const sizeButton = document.querySelector('#size-button');
    // Obtém uma referência para o controle deslizante de faixa (range).
    const sizeRange = document.querySelector('#size-range');
    // Verifica se o botão "Tamanho" está visível.
    if (sizeButton.style.display !== 'none') {
        // Se o botão "Tamanho" estiver visível, oculta-o.
        sizeButton.style.display = 'none';
        // Mostra o controle deslizante de faixa (range).
        sizeRange.style.display = 'block';
    } else {
        // Se o botão "Tamanho" estiver oculto, mostra-o.
        sizeButton.style.display = 'block';
        // Oculta o controle deslizante de faixa (range).
        sizeRange.style.display = 'none';
    }
}
// Esta função atualiza o tamanho da imagem com base no valor do controle deslizante de faixa (range).
function updateImageSize(value) {
    // Obtém uma referência para o contêiner da prévia da imagem.
    const preview = document.getElementById('preview');
    // Calcula o valor de escala com base no valor do controle deslizante.
    const scaleValue = value / 100;
    // Aplica a transformação de escala à prévia da imagem.
    preview.style.transform = `scale(${scaleValue})`;
}