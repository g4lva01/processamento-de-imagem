var myChart; // Variável global para armazenar o gráfico atual

        function gerarHistograma() {
            var preview = document.getElementById('preview');
            if (preview.getElementsByTagName('img').length > 0) {
                var imagem = preview.getElementsByTagName('img')[0];
                var canvas = document.getElementById('histograma-canvas');
                var ctx = canvas.getContext('2d');
                
                // Limpa o canvas do histograma
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Se já houver um gráfico, destrói-o
                if (myChart) {
                    myChart.destroy();
                }

                // Se não houver imagem, não há necessidade de continuar
                if (!imagem) {
                    console.error("Nenhuma imagem carregada para gerar o histograma.");
                    return;
                }
                
                // Desenha o novo histograma
                canvas.width = imagem.width;
                canvas.height = imagem.height;
                ctx.drawImage(imagem, 0, 0, canvas.width, canvas.height);
                var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                var pixels = imageData.data;

                var histogramaR = new Array(256).fill(0); // Histograma para o canal vermelho
                var histogramaG = new Array(256).fill(0); // Histograma para o canal verde
                var histogramaB = new Array(256).fill(0); // Histograma para o canal azul
                var histogramaIluminacao = new Array(256).fill(0); // Histograma para a iluminação

                for (var i = 0; i < pixels.length; i += 4) {
                    var r = pixels[i];
                    var g = pixels[i + 1];
                    var b = pixels[i + 2];
                    var iluminacao = Math.round((r + g + b) / 3); // Média dos valores de pixel RGB
                    histogramaR[r]++;
                    histogramaG[g]++;
                    histogramaB[b]++;
                    histogramaIluminacao[iluminacao]++;
                }

                // Configurações do gráfico
                myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: Array.from(Array(256).keys()), // Rótulos de 0 a 255 para os valores de cor
                        datasets: [{
                            label: 'Vermelho',
                            data: histogramaR,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Verde',
                            data: histogramaG,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Azul',
                            data: histogramaB,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Iluminação',
                            data: histogramaIluminacao,
                            backgroundColor: 'rgba(255, 206, 86, 0.2)',
                            borderColor: 'rgba(255, 206, 86, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });

                // Exibe o canvas do histograma
                canvas.classList.add('canvas-visible');
            } else {
                console.error("Nenhuma imagem carregada para gerar o histograma.");
            }
        }