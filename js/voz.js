// Adicionando funcionalidade de reconhecimento de fala
document.addEventListener('DOMContentLoaded', function() {
    const voiceButton = document.getElementById('voice-button');
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = 'pt-BR'; // Defina o idioma para português do Brasil
    recognition.continuous = true; // Reconhecimento contínuo
    let voiceActive = false; // Variável para controlar o estado do reconhecimento de voz
    let lastActivatedFunction = null; // Variável para armazenar a última função ativada

    // Mapeamento das palavras-chave para as funções correspondentes
    const functionMap = {
        "pixelizar": toggleRange,
        "matriz": visualizarPixels,
        "negativa": processarImagemNegativa,
        "espelhar": flipImagem,
        "tremulação": tremularImagem,
        "locomoção": locomoverImagem,
        "rotação": toggleSpeed,
        "tamanho": toggleSize,
        "restaurar": restaurarImagem
    };

    // Solicitar permissão para acessar o microfone do usuário
    voiceButton.addEventListener('click', function() {
        if (voiceActive) {
            recognition.stop();
            console.log("Parando...");
            voiceActive = false;
            voiceButton.innerText = "Voz";
        } else {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(function(stream) {
                    recognition.start();
                    console.log("Ouvindo...");
                    voiceActive = true;
                    voiceButton.innerText = "Desativar Voz";
                })
                .catch(function(err) {
                    console.error("Erro ao acessar o microfone:", err);
                    alert("Erro ao acessar o microfone. Por favor, conceda permissão para acessar o microfone e tente novamente.");
                });
        }
    });

    recognition.onresult = function(event) {
        const speechResult = event.results[event.results.length - 1][0].transcript.toLowerCase().trim(); // Obter o último resultado reconhecido
        console.log("Você disse: " + speechResult);
        
        // Verifica se a palavra-chave dita corresponde a uma função no mapeamento
        if (functionMap.hasOwnProperty(speechResult)) {
            // Desativa a última função ativada, se houver
            if (lastActivatedFunction) {
                lastActivatedFunction();
                lastActivatedFunction = null;
            }
            
            const func = functionMap[speechResult];
            func(); // Chama a função correspondente
            lastActivatedFunction = func; // Atualiza a última função ativada
        } else {
            console.log("Função não reconhecida.");
        }
    };

    recognition.onerror = function(event) {
        console.error("Erro ao reconhecer a fala:", event.error);
        voiceActive = false;
        voiceButton.innerText = "Voz";
    };
});