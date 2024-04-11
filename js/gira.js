// Função para parar a animação e mostrar o botão "Rotação" novamente
function stopAnimation() {
    // Obtém referências para os elementos relevantes do DOM
    var imagemElement = document.getElementById('preview');
    var startAnimationButton = document.getElementById('start-animation');
    var speed = document.getElementById('speed');
    // Remove a classe 'rotation' se estiver presente na imagem
    if (imagemElement.classList.contains('rotation')) {
        imagemElement.classList.remove('rotation');
    }
    // Mostra o botão "Rotação"
    startAnimationButton.style.display = 'inline-block'; 
    // Oculta a barra de faixa de velocidade
    speed.style.display = 'none';
    // Remove o botão de parar a animação se já existir
    var stopButton = document.getElementById('stop-animation-button');
    if (stopButton) {
        stopButton.parentNode.removeChild(stopButton);
    }
}
// Função para alternar a visibilidade do botão "Rotação", da barra de faixa de velocidade e do botão "Parar"
function toggleSpeed() {
    // Obtém referências para os elementos relevantes do DOM
    var startAnimationButton = document.getElementById('start-animation');
    var speed = document.getElementById('speed');
    var imagemElement = document.getElementById('preview');
    var stopButton = document.getElementById('stop-animation-button');
    // Verifica se a imagem está girando (possui a classe 'rotation')
    if (imagemElement.classList.contains('rotation')) {
        // Exibe a barra de faixa de velocidade
        speed.style.display = 'inline-block'; 
    } else {
        // Oculta a barra de faixa de velocidade
        speed.style.display = 'none';
    }
    // Exibe o botão "Rotação" se a imagem não estiver girando
    startAnimationButton.style.display = imagemElement.classList.contains('rotation') ? 'none' : 'inline-block';
}
// Função para atualizar a velocidade da animação
function updateSpeedValue(value) {
    // Seleciona todos os elementos com a classe 'rotation'
    var rotations = document.querySelectorAll('.rotation');
    // Para cada elemento, ajusta a duração da animação conforme o valor do speed
    rotations.forEach(function(rotation) {
        rotation.style.animationDuration = value + 's';
    });
}
// Adiciona um ouvinte de evento para o evento 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona um ouvinte de evento para o clique no botão "Rotação"
    document.getElementById('start-animation').addEventListener('click', function() {
        // Obtém referência para o elemento de pré-visualização
        var imagemElement = document.getElementById('preview');
        // Verifica se o elemento de pré-visualização existe
        if (imagemElement) {
            // Alterna a presença da classe 'rotation' na imagem
            imagemElement.classList.toggle('rotation');
            // Chama a função para alternar a visibilidade do botão "Rotação" e da barra de faixa de velocidade
            toggleSpeed();
            // Adiciona um botão "Parar" dinamicamente
            var stopButton = document.createElement('button');
            stopButton.setAttribute('type', 'button');
            stopButton.setAttribute('id', 'stop-animation-button');
            stopButton.textContent = 'Parar';
            // Adiciona um ouvinte de evento para parar a animação ao clicar no botão "Parar"
            stopButton.addEventListener('click', stopAnimation);
            // Adiciona o botão "Parar" ao DOM
            document.querySelector('.buttons').appendChild(stopButton);
        } else {
            // Exibe uma mensagem de erro se o elemento de pré-visualização não for encontrado
            console.error("Elemento com ID 'preview' não encontrado.");
        }
    });
});