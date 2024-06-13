document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-mapping-button');
    const mappingCanvas = document.getElementById('mapping-canvas');
    const canvasCtx = mappingCanvas.getContext('2d');
    const statusOutput = document.getElementById('status-output');

    let audioContext;
    let analyser;
    let dataArray;
    let bufferLength;
    let drawing = false;

    startButton.addEventListener('click', () => {
        if (!drawing) {
            navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                
                // Configuração do analisador de áudio
                analyser = audioContext.createAnalyser();
                analyser.fftSize = 2048;
                bufferLength = analyser.frequencyBinCount;
                dataArray = new Uint8Array(bufferLength);

                const mediaStreamSource = audioContext.createMediaStreamSource(stream);
                mediaStreamSource.connect(analyser);

                drawing = true;
                drawMapping();

                setTimeout(() => {
                    stream.getTracks().forEach(track => track.stop());
                    drawing = false;
                }, 10000); // Executa por 10 segundos
            }).catch(err => {
                console.error('Erro ao acessar o stream de áudio: ', err);
            });
        }
    });

    function drawMapping() {
        if (!drawing) return;

        requestAnimationFrame(drawMapping);

        analyser.getByteFrequencyData(dataArray);

        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, mappingCanvas.width, mappingCanvas.height);

        const centerX = mappingCanvas.width / 2;
        const centerY = mappingCanvas.height / 2;
        const radius = Math.min(centerX, centerY);

        for (let i = 0; i < bufferLength; i++) {
            const value = dataArray[i];
            const angle = (i / bufferLength) * Math.PI * 2;
            const distance = value / 255 * radius;

            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;

            canvasCtx.beginPath();
            canvasCtx.arc(x, y, 2, 0, Math.PI * 2, false);
            canvasCtx.fillStyle = `hsl(${angle / Math.PI * 180}, 100%, 50%)`;
            canvasCtx.fill();
        }

        // Estimativa simples de distância com base na intensidade do eco
        const maxIndex = dataArray.indexOf(Math.max(...dataArray));
        const distance = maxIndex * audioContext.sampleRate / analyser.fftSize;
        statusOutput.innerText = `Distância estimada: ${(distance * 0.034 / 2).toFixed(2)} m`; // 0.034 m/ms é a velocidade do som
    }
});