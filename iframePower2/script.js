const token_hero = '338148107599656';
let myUrl = `https://www.superheroapi.com/api.php/${token_hero}/search/`;
let dataHero;
let heroResults;

const token_movie = `7e451c2`;
let myURL2 = `http://www.omdbapi.com/?i=tt3896198&apikey=${token_movie}&s=`;

let dataMovie;
let movieResults;

let heroName = "";
let inputTagValue;

let inputTag = document.querySelector('#searchArea');
let searchBtn = document.querySelector('#searchBtn');
let article1 = document.querySelector('#ar-1');
let article2 = document.querySelector('#ar-2');
let article3 = document.querySelector('#ar-3');
let article4 = document.querySelector('#ar-4');
let article5 = document.querySelector('#ar-5');
let article6 = document.querySelector('#ar-6');

searchBtn.addEventListener('click', event => {
    event.preventDefault();
    heroName = inputTag.value;
    inputTagValue = inputTag.value // put the input value inside a variable to use later
    inputTag.value = ""; // clean the input value from input area
    article2.innerHTML = ""; // clean section2
    article4.innerHTML = "";
    article5.innerHTML = "";
    myUrl = `https://www.superheroapi.com/api.php/${token_hero}/search/${heroName}/`;
    myURL2 = `http://www.omdbapi.com/?i=tt3896198&apikey=${token_movie}&s=${heroName}`;

    getHeroInfo();
    getMovieInfo();
});

let getHeroInfo = async() => {
    const response = await fetch(myUrl);
    const data = await response.json();
    dataHero = data;
    console.log(dataHero);
    heroResults = dataHero.results;
    console.log(heroResults);
    showInfo();

}

let getMovieInfo = async() => {
    const response2 = await fetch(myURL2);
    const data2 = await response2.json();
    dataMovie = data2;
    movieResults = dataMovie.Search;
    //console.log(movieResults);
    showInfo2();
}

let showInfo = () => {
    let h2Node = document.createElement('h2');
    h2Node.textContent = `${heroResults.length} hero result(s) of \"${inputTagValue}\" research :`;
    article2.appendChild(h2Node);

    // loop all results after search
    for (oneHero of heroResults) {
        let nameNode = document.createElement('p');
        nameNode.textContent = oneHero.name;
        let idNode = document.createElement('p');
        idNode.textContent = oneHero.id;
        let imgNode = document.createElement('img');
        imgNode.src = oneHero.image.url;
        let heroBtnNode = document.createElement('button');
        heroBtnNode.appendChild(imgNode);
        article2.appendChild(heroBtnNode);
        article2.appendChild(idNode);
        article2.appendChild(nameNode);

        // select one hero after search
        heroBtnNode.addEventListener('click', () => {
            article2.innerHTML = "";
            article2.appendChild(imgNode);
            article2.appendChild(idNode);
            article2.appendChild(nameNode);
            // put other detail properties

            for (const [key, value] of Object.entries(oneHero)) {
                if (!(key == 'id' || key == 'name' || key == 'image')) {
                    proBtnNode = document.createElement('button');
                    proBtnNode.textContent = key;
                    proBtnNode.value = value;
                    console.log(key);
                    article2.appendChild(proBtnNode);
                }
            }

            proBtnNode.addEventListener('click', () => {
                console.log(proBtnNode.value);
            })

            /*
            for (properties in oneHero) {
                if (!(properties == 'id' || properties == 'name' || properties == 'image')) {
                    proBtnNode = document.createElement('button');
                    proBtnNode.textContent = properties;
                    proBtnNode.value = properties;
                    console.log(properties);
                    article2.appendChild(proBtnNode);
                }
            }
            proBtnNode.addEventListener('click', () => {
                for (p in oneHero.properties) {
                    let pNode = document.createElement('p');
                    pNode.textContent = `${p}: ${oneHero.properties[p]}`;
                    //article3.appendChild(pNode);
                    proBtnNode.insertAdjacentElement('afterend', pNode);

                }
            })*/
        })
    }
}






let showInfo2 = () => {
    let h2Node = document.createElement('h2');
    h2Node.textContent = `${movieResults.length} movie result(s) of \"${inputTagValue}\" research :`;
    article4.appendChild(h2Node);

    for (oneMovie of movieResults) {
        let movieNode = document.createElement('p');
        movieNode.textContent = oneMovie.Title;
        let imgNode = document.createElement('img');
        imgNode.src = oneMovie.Poster;
        article5.appendChild(imgNode);
        article5.appendChild(movieNode);
    }
}