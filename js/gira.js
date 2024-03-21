document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('start-animation').addEventListener('click', function() {
        var imagemElement = document.getElementById('preview');
        if (imagemElement) {
            imagemElement.classList.toggle('ball');
        } else {
            console.error("Elemento com ID 'imagem' não encontrado.");
        }
    });
});