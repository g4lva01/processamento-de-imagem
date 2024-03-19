function tremularImagem() {
    var imagem = document.getElementById('preview');
    if (imagem.children.length > 0) {
      var img = imagem.children[0];
      img.classList.add('tremendo');
      setTimeout(function() {
        img.classList.remove('tremendo');
      }, 5000);
    } else {
      alert("Por favor, selecione uma imagem antes de tremular.");
    }
}
  
document.addEventListener('DOMContentLoaded', function() {
    var fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.addEventListener('change', function(event) {
        var arquivo = event.target.files[0];
        if (arquivo) {
          var leitor = new FileReader();
          leitor.onload = function(event) {
            var imagem = document.getElementById('preview');
            imagem.src = event.target.result;
          }
          leitor.readAsDataURL(arquivo);
        }
      });
    }
});