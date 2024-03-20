document.getElementById('inspireButton').addEventListener('click', getRandomQuote);

//Função para exibir alert em caso de erro
function handleFetchError(error, errorMessage) {
    console.error(errorMessage, error);
    alert(errorMessage);
}

//Obtendo uma citação aleatória de um anime 
function getRandomQuote() {

    fetch('https://animechan.xyz/api/random')
        //Manipulando a Promise retornada pela função fetch
        .then(response => response.json())
        .then(quote => {
            //Criando URL para api Jikan
            const animeName = quote.anime.split(' ').join('%20');
            const jikanUrl = `https://api.jikan.moe/v4/anime?q=${animeName}`;

            //Requisição assíncrona para obter informações do anime
            fetch(jikanUrl)
                .then(response => response.json())
                .then(animeData => {

                    const randomQuote = quote.quote;
                    const characterName = quote.character;
                    const animeName = quote.anime;
                    const imageUrl = animeData.data[0].images.jpg.image_url;
                    const synopsis = animeData.data[0].synopsis;

                    document.getElementById('quote').innerHTML = `"${randomQuote}"`;
                    document.getElementById('character').innerHTML = `- ${characterName}`;
                    document.getElementById('anime').innerHTML = `${animeName}`;
                    document.getElementById('image').innerHTML = `<img src="${imageUrl}" alt="Anime Image" width="200">`;
                    document.getElementById('synopsis').innerHTML = `${synopsis}`;

                })
                //Capturando e tratando erros ao realizar a requisição na api do jikan (Informações do anime)
                .catch(error => handleFetchError(error, 'Erro ao trazer informações do anime'));
        })
        //Capturando e tratando erros ao realizar a requisição na api do animechan (Frases aleatórias)
        .catch(error => handleFetchError(error, 'Erro ao trazer frase aleatória'));
}
