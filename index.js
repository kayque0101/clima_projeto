const apiKey = "9b6b76d8cb34671d131a11fd0020bf40"; // Substitua pela sua chave API

const imagensClima = {};

// Função para adicionar imagens ao objeto de clima
const adicionarImagemClima = (descricao, caminho) => {
    imagensClima[descricao] = caminho;
};

// Adiciona as imagens ao objeto
const configurarImagensClima = () => {
    adicionarImagemClima("clear sky", "assets/imagens/clouds-svgrepo-com.svg"); // Céu limpo
    adicionarImagemClima("few clouds", "assets/imagens/,clouds-svgrepo-com.svg"); // Poucas nuvens
    adicionarImagemClima("scattered clouds", "assets/imagens/,clouds-svgrepo-com.svg"); // Nuvens dispersas
    adicionarImagemClima("broken clouds", "assets/imagens/,clouds-svgrepo-com.svg"); // Nuvens partidas
    adicionarImagemClima("shower rain", "assets/imagens/,weather-drizzle.svg"); // Chuvinha
    adicionarImagemClima("rain", "assets/imagens/,weather-drizzle.svg"); // Chuva
    adicionarImagemClima("thunderstorm", "assets/imagens/,thunderstorm-outline.svg"); // Tempestade
    adicionarImagemClima("snow", "assets/imagens/,neve.png"); // Neve
    adicionarImagemClima("mist", "assets/imagens/,clouds-svgrepo-com.svg"); // Neblina
    adicionarImagemClima("drizzle", "assets/imagens/,weather-drizzle.svg"); // Chuva fina
    adicionarImagemClima("clouds", "assets/imagens/,clouds-svgrepo-com.svg"); // Nuvens
};

const mostrarPrevisaoTempo = async () => {
    const cidadeInput = document.getElementById("cidadeInput");
    const cidade = cidadeInput.value;

    if (cidade === "") {
        alert("Por favor, digite o nome de uma cidade");
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
        );

        if (!response.ok) {
            throw new Error("Erro ao obter previsão do tempo");
        }

        const data = await response.json();
        exibirInformacoesTempo(data);
    } catch (error) {
        document.getElementById("resultado").innerHTML = `<p>Erro: ${error.message}</p>`;
    }
};

const exibirInformacoesTempo = (data) => {
    const temperatura = data.main.temp;
    const umidade = data.main.humidity;
    const cidadeNome = data.name;

    // Verifica se há descrição do clima
    const descricao = data.weather && data.weather.length > 0 ? data.weather[0].description : "Descrição não disponível";

    // Imagem padrão se a descrição não corresponder
    const climaImagem = imagensClima[descricao] || "assets/imagens/thunderstorm-outline.svg";

    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `
        <h2>Previsão do tempo em ${cidadeNome}</h2>
        <img src="${climaImagem}" alt="${descricao}" style="max-width: 200px;">
        <p>Temperatura: ${temperatura}°C</p>
        <p>Descrição: ${descricao}</p>
        <p>Umidade: ${umidade}%</p>
    `;
};

// Configura as imagens ao carregar o script
configurarImagensClima();

// Adiciona o evento ao botão após o DOM ser carregado
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("submitButton").addEventListener("click", mostrarPrevisaoTempo);
});
