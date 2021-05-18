const token_hero = '338148107599656';
let myUrl = `https://www.superheroapi.com/api.php/${token_hero}/search/`;

const token_movie = `7e451c2`;
let myURL2 = `http://www.omdbapi.com/?i=tt3896198&apikey=${token_movie}&s=`;

let dataHero;
let heroResults;
let dataMovie;
let movieResults;
let inputTagValue;

let inputTag = document.querySelector('#searchArea');
let searchBtn = document.querySelector('#searchBtn');
let heroSection = document.querySelector('#heroes');
let movieSection = document.querySelector('#movies')
let favSection = document.querySelector('#favorites');

searchBtn.addEventListener('click', event => {
    event.preventDefault();
    let heroName = inputTag.value;
    inputTagValue = inputTag.value // put the input value inside a variable to use later
    inputTag.value = "";
    heroSection.innerHTML = "";
    movieSection.innerHTML = "";
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
    showInfo();
}

let getMovieInfo = async() => {
    const response2 = await fetch(myURL2);
    const data2 = await response2.json();
    dataMovie = data2;
    movieResults = dataMovie.Search;
    //console.log(movieResults);
    showMovie();
}


let heroBtnNode;
let imgNode;
let nameNode;
let detailsContainerNode;

//show options after research
let heroOptions = (one) => {
    let articleNode = document.createElement('article');
    nameNode = document.createElement('h3');
    nameNode.textContent = `${one.id} : ${one.name}`;
    imgNode = document.createElement('img');
    imgNode.src = one.image.url;
    heroBtnNode = document.createElement('button');
    heroBtnNode.appendChild(nameNode);
    heroBtnNode.appendChild(imgNode);
    articleNode.appendChild(heroBtnNode);
    heroSection.appendChild(articleNode);

    // call all other properties with their details and put inside a div one by one
    detailsContainerNode = document.createElement("div");
    detailsContainerNode.appendChild(createDetail('powerstats', one.powerstats));
    detailsContainerNode.appendChild(createDetail('appearance', one.appearance));
    detailsContainerNode.appendChild(createDetail('biography', one.biography));
    detailsContainerNode.appendChild(createDetail('connections', one.connections));
    detailsContainerNode.appendChild(createDetail('work', one.work));
}

// inject all detail info inside a detail tag according to property-name and property object
let createDetail = (proName, obj) => {
    let detailNode = document.createElement('details');
    let sumaryNode = document.createElement('summary');
    sumaryNode.textContent = proName;
    detailNode.appendChild(sumaryNode);
    let dlNode = document.createElement('dl');

    for (let key in obj) {
        let dtNode = document.createElement('dt');
        dtNode.textContent = key;
        let ddNode = document.createElement('dd');
        ddNode.textContent = obj[key];
        dlNode.appendChild(dtNode);
        dlNode.appendChild(ddNode);
    }
    detailNode.appendChild(dlNode);
    return detailNode;
}

// select one hero after search
let pickOneHero = (hero, im, nm, div) => {

    heroBtnNode.addEventListener('click', () => {

        let favIcon = "star-fav.svg";
        let unfavIcon = "star.svg";
        heroSection.innerHTML = "";
        let articleNode = document.createElement('article');
        let favBtnNode = document.createElement('button');
        let favIconNode = document.createElement('img');
        let stylesIcon = {
            "width": "15px",
            "margin": "1px"
        };
        Object.assign(favIconNode.style, stylesIcon);
        favIconNode.src = unfavIcon;
        articleNode.appendChild(nm);
        articleNode.appendChild(im);
        articleNode.appendChild(div);
        favBtnNode.appendChild(favIconNode);
        articleNode.appendChild(favBtnNode);
        heroSection.appendChild(articleNode);

        // add or remove favorite
        favBtnNode.addEventListener('click', () => {

            let heroString = localStorage.getItem('favHero');
            let heroArr = heroString === null ? [] : JSON.parse(heroString);

            let inArr = -1;
            for (let i = 0; i < heroArr.length; i++) {
                if (heroArr[i].id === hero.id) {
                    inArr = i;
                }
            }

            if (inArr === -1) { // if object does not exist it, then inArr is -1 
                heroArr.push(hero);
                favIconNode.src = favIcon;

            } else {
                heroArr.splice(inArr, 1);
                favIconNode.src = unfavIcon;
            }
            localStorage.setItem('favHero', JSON.stringify(heroArr));
        })
    })
}

let showInfo = () => {
    let h2Node = document.createElement('h2');
    h2Node.textContent = `${heroResults.length} hero result(s) of \"${inputTagValue}\" research :`;
    heroSection.appendChild(h2Node);
    // loop all results after search
    for (let oneHero of heroResults) {
        let oneOfHero = oneHero;
        heroOptions(oneOfHero);
        pickOneHero(oneHero, imgNode, nameNode, detailsContainerNode);
    }
}


let movieOptions = (one) => {
    let articleNode = document.createElement('article');
    let titleNode = document.createElement('h3');
    titleNode.textContent = one.Title;
    let imgNode = document.createElement('img');
    imgNode.src = one.Poster;
    articleNode.appendChild(titleNode);
    articleNode.appendChild(imgNode);
    movieSection.appendChild(articleNode);
}

let showMovie = () => {
    let h2Node = document.createElement('h2');
    h2Node.textContent = `${movieResults.length} movie result(s) of \"${inputTagValue}\" research :`;
    movieSection.appendChild(h2Node);
    for (oneMovie of movieResults) {
        movieOptions(oneMovie);
    }
}