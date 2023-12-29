fetch("https://api.pokemontcg.io/v2/cards?name:charizard").then((resp) => resp.json())
    .then((dataObj) => renderNavBar(dataObj));

function renderNavBar (dataObj){
    console.log(dataObj.data);
    let cardArray = dataObj.data;
    const navForPoke = document.querySelector("#navBar")


    navForPoke.textContent = "";
    navForPoke.style.display = "flex";
    navForPoke.style.height = 151;
    navForPoke.style.overflowX = "scroll"; 


    console.log(navForPoke);
    cardArray.forEach( cardObj => {
        const img = document.createElement("img");
        const imgSrc = cardObj.images.small;
        const name = cardObj.name;



        img.src = imgSrc;
        img.style.margin = 3;
        


        
        navForPoke.appendChild(img);
        
        
    });
        
    };
