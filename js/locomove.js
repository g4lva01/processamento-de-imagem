function viewImage() {
    var preview = document.getElementById('preview');
    var file = document.getElementById('imagem').files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        var img = document.createElement('img');
        img.src = reader.result;
        preview.innerHTML = '';
        preview.appendChild(img);
    };
    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = '';
    }
}

function animateImage(img) {
    var amplitude = 10;
    var frequency = 0.05;
    var phase = 0;
    var xOffset = 0;
    var yOffset = 0;
    var direction = 1;
    var startTime = performance.now();

    function update() {
        xOffset += direction;
        if (xOffset >= 200 || xOffset <= 0) {
            direction *= -1;
        }
        yOffset = amplitude * Math.sin(2 * Math.PI * frequency * xOffset / img.width + phase);
        img.style.transform = 'translate(' + xOffset + 'px,' + yOffset + 'px)';
        if (performance.now() - startTime < 6000) {
            requestAnimationFrame(update);
        }
    }

    update();
}

function locomoverImagem() {
    var preview = document.getElementById('preview');
    var img = preview.querySelector('img');
    if (img) {
        animateImage(img);
    }
}