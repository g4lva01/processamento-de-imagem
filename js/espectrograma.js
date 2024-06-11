document.getElementById('record-button').addEventListener('click', () => {
    const spectrogramCanvas = document.getElementById('spectrogram-canvas');
    const canvasCtx = spectrogramCanvas.getContext('2d');

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const mediaStreamSource = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        mediaStreamSource.connect(analyser);

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        function drawSpectrogram() {
            requestAnimationFrame(drawSpectrogram);

            analyser.getByteFrequencyData(dataArray);

            canvasCtx.fillStyle = 'rgb(0, 0, 0)';
            canvasCtx.fillRect(0, 0, spectrogramCanvas.width, spectrogramCanvas.height);

            const barWidth = (spectrogramCanvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i];

                const hue = i / bufferLength * 360;
                canvasCtx.fillStyle = `hsl(${hue}, 100%, 50%)`;
                canvasCtx.fillRect(x, spectrogramCanvas.height - barHeight / 2, barWidth, barHeight / 2);

                x += barWidth + 1;
            }
        }

        drawSpectrogram();
    }).catch(err => {
        console.error('Error accessing audio stream: ', err);
    });
});