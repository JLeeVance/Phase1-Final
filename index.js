fetch("https://api.pokemontcg.io/v2/cards/pagesize")
.then((resp) => resp.json())
.then((dataObj) => renderNavBar(dataObj))
.then(fetchAndRenderLocal())

const imgForDisplay = document.querySelector(".poke-image"); /* grabbed the img container for poke Display */
const pokeName = document.querySelector(".poke-name")        /* grabbed the poke name container for poke Display */

// Selecting the span elements with the class "title" so that we can keep the titles in the description box BOLD while dynamically changing the text content inside
const typeTitle = document.querySelector(".selectedType .title");
const descTitle = document.querySelector(".selectedDesc .title");
const rarityTitle = document.querySelector(".selectedRarity .title");
const selectedNatDex = document.querySelector(".selectedNatDex .title");
const rulesTitle = document.querySelector(".selectedRules .title");

const form = document.querySelector(".form") /* grabbed search button */
form.addEventListener('submit' , (e) => handleSubmit(e))
function handleSubmit (e) {
    e.preventDefault();
    let searchField = 
    console.log(e.target[0].value)
}




function renderNavBar (dataObj){
    let cardArray = dataObj.data;                       /* pulled the card array from the data object within the object returned from the fetch. */
    const navForPoke = document.querySelector(".navBar")/*     pulled the <nav> for the pokemon to be rendered to */

    cardArray.forEach(cardObj => {                      /* console.log(cardObj) */
        const img = document.createElement("img");      /* created <img> for each image being rendered */
        const imgSrc = cardObj.images.large;            /* grabbed img src from the API (data.images.small) */
        img.src = imgSrc;
        img.className = "navBar";
        const name = cardObj.name;                      /* created the variable of name for EACH card as it was passed through the loop. */
        const cardType = cardObj.supertype;             /* created the variable 'cardType' - 'Pokemon' - 'Trainer' - 'Item' etc */
        const cardHp = cardObj.hp;                      /* created the variable 'cardHP' to be used in the description box */
        const flavorText = cardObj.flavorText           /* created the variable flavorText which is the text description for the Pokemon   */
        const cardRarity = cardObj.rarity               /* created the cardRarity variable for each card, could be used in the description when clicked  */
        const nationalPokedexNumbers = cardObj.nationalPokedexNumbers
        const cardRules = cardObj.cardRules

        /* const urlToBuyCard = cardObj.tcgplayer['url'] */   /* created the urlToBuyCard variable incase we want a cute lil buy button next to the 'Add to my collection' button */
        /* const evolvesFrom = cardObj.evolvesFrom; */
        /* stretch goals! */

        navForPoke.appendChild(img);

        // const attackArray = cardObj.attacks;
        // const attacks = []; /* This does work! I think the errors are due to the cards with no attacks */
                            /*  attackArray.forEach((attackObj) => {                                                                */
                            /*      attacks.push({'name':attackObj.name , 'attackText':attackObj.text , 'damage':attackObj.damage}) */
                            /*  })                                                                                                  */
                            /*  console.log(attacks)                                                                                */
        img.addEventListener("click", (e) => {
          imgForDisplay.src = e.target.currentSrc; //click for image
          pokeName.textContent = name; //click for name
          typeTitle.textContent = cardType; //click for type
          descTitle.textContent = flavorText; //click for description
          selectedNatDex.textContent = nationalPokedexNumbers; //click for national pokedex number  
          rarityTitle.textContent = cardRarity; //  click for rarity
          rulesTitle.textContent = cardRules; //  click for rules
        //   console.log(e);
        });  
    });       
   };
const collectionDisplay = document.querySelector("#collection-container"); /*grabbed the container*/
const buttonToAdd = document.querySelector("#addToCollection");            /* grabbed button*/


buttonToAdd.addEventListener("click", () => addToCollection());/*called function inside event listener*/


function addToCollection() {                /* This function is only called in the event listener*/
    let name = pokeName.textContent;        /* pulled name info from existing poke on display */
    let ownedImgSrc = imgForDisplay.src;    /* Got source for current poke img on display */
    let type = typeTitle.textContent;
    let description = descTitle.textContent;
    let natPokeNum = selectedNatDex.textContent;
    let rules = rulesTitle.textContent;


    let collectionObject = {                /* Created our object we are sending to local db */
        "name": name,
        "src": ownedImgSrc,
        "type": type,
        "description": description,
        "natPokeNum": natPokeNum,
        "rules": rules,
    };

    fetch("http://localhost:3000/data", {   /* fetched to our local db via URL */
        method: "POST",                     /* POST because we are creating a new object */
        headers: {
            "content-type": "application/json",
            "accept": "application/json",
        },
        body: JSON.stringify(collectionObject),
    })
    .then((resp) => resp.json())
    .then(() => createCard(collectionObject) )      /* moved the function out of this code block */
}


function createCard(collectionObject) {
    const myCollection = document.querySelector("#myCollection-div");
    const card = document.createElement("card");
    const img = document.createElement("img");
    const h4 = document.createElement("h4");
    img.src = collectionObject.src;
    h4.textContent = collectionObject.name;
    card.append(h4, img);
    myCollection.append(card);

}
function fetchAndRenderLocal() {                                        /* This fuction creates a card tag, img tag, and the header */
    const myCollection = document.querySelector("#myCollection-div");   /* grabbed the div that the cards are going into */
    fetch("http://localhost:3000/data").then(resp => resp.json()).then((localCardObj) => {
    localCardObj.forEach((localCardObj) => {
            const card = document.createElement("card");
            const img = document.createElement("img");
            const h4 = document.createElement("h4");
            img.src = localCardObj.src;             /* Used a forEach loop of our array of abjects */                                     
            h4.textContent = localCardObj.name;     /* Pulled the data for the client rendering from local db */    
            card.append(h4,img);                    /* added h4 and img tags to the card */
            myCollection.append(card);              /* added card to the myCollection variable defined on line 89 */
        })
    })
 }