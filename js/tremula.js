// Função responsável por aplicar a animação de tremulação a uma imagem
function tremularImagem() {
  // Obtém o elemento HTML com o ID 'preview'
  var imagem = document.getElementById('preview');
  // Verifica se há filhos dentro do elemento 'preview', ou seja, se há uma imagem dentro dele
  if (imagem.children.length > 0) {
      // Obtém o primeiro filho do elemento 'preview', que deve ser a própria imagem
      var img = imagem.children[0];
      // Adiciona a classe CSS 'tremendo' à imagem para iniciar a animação de tremulação
      img.classList.add('tremendo');
      // Define um temporizador para remover a classe 'tremendo' da imagem após 5 segundos (5000 milissegundos)
      setTimeout(function() {
          img.classList.remove('tremendo');
      }, 2500);
  } else {
      // Se não houver imagem dentro do elemento 'preview', exibe um alerta solicitando ao usuário para selecionar uma imagem
      alert("Por favor, selecione uma imagem antes de tremular.");
  }
}
// Aguarda o evento de carregamento do DOM para executar o código dentro da função anônima
document.addEventListener('DOMContentLoaded', function() {
  // Obtém o elemento HTML com o ID 'fileInput', que é um input do tipo file para selecionar arquivos
  var fileInput = document.getElementById('fileInput');
  // Verifica se o elemento 'fileInput' existe
  if (fileInput) {
      // Adiciona um ouvinte de evento para o elemento 'fileInput' que espera pelo evento de mudança (change), acionado quando o usuário seleciona um arquivo
      fileInput.addEventListener('change', function(event) {
          // Obtém o arquivo selecionado pelo usuário
          var arquivo = event.target.files[0];
          // Verifica se um arquivo foi selecionado
          if (arquivo) {
              // Cria uma nova instância de FileReader para ler o conteúdo do arquivo
              var leitor = new FileReader();
              // Define uma função de retorno de chamada para o evento onload, acionado quando a operação de leitura é concluída com sucesso
              leitor.onload = function(event) {
                  // Obtém o elemento 'preview' e atribui o resultado da leitura do arquivo (a URL da imagem) como o valor do atributo 'src' desse elemento, exibindo assim a imagem selecionada pelo usuário
                  var imagem = document.getElementById('preview');
                  imagem.src = event.target.result;
              }
              // Lê o conteúdo do arquivo como uma URL de dados codificada em base64
              leitor.readAsDataURL(arquivo);
          }
      });
  }
});