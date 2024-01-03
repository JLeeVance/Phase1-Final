fetch("https://api.pokemontcg.io/v2/cards/?q=set.name:base")
.then((resp) => resp.json())
.then((dataObj) => renderNavBar(dataObj));


// console.log(dataObj.data[24][`set`][`series`])

const imgForDisplay = document.querySelector(".poke-image");
// console.log(imgForDisplay)

const pokeName = document.querySelector(".poke-name");

// Selecting the span elements with the class "title" so that we can keep the titles in the description box BOLD while dynamically changing the text content inside
const typeTitle = document.querySelector(".selectedType .title");
const descTitle = document.querySelector(".selectedDesc .title");
const rarityTitle = document.querySelector(".selectedRarity .title");
const selectedNatDex = document.querySelector(".selectedNatDex .title");
const rulesTitle = document.querySelector(".selectedRules .title");

function renderNavBar(dataObj) {
  // console.log(dataObj.data[24]);
  let cardArray = dataObj.data;
  //      pulled the card array from the data object within the object returned from the fetch.
  //      assigned it to cardArray
  const navForPoke = document.querySelector(".navBar");
  //      pulled the <nav> for the pokemon to be rendered to

  cardArray.forEach((cardObj) => {
    console.log(cardObj);
    // debugger
    const img = document.createElement("img");
    //      created <img> for each image being rendered
    const imgSrc = cardObj.images.small;
    //      the image source was within the key of images
    //      chose the small one for loading time?
    img.src = imgSrc;
    img.className = "navBar";
    const name = cardObj.name;
    //      created the variable of name for EACH card as it was passed through the loop.
    const cardType = cardObj.supertype;
    //      created the variable 'cardType' - 'Pokemon' - 'Trainer' - 'Item' etc
    const cardHp = cardObj.hp;
    //      created the variable 'cardHP' to be used in the description box
    const flavorText = cardObj.flavorText;
    //      created the variable flavorText which is the text description for the Pokemon
    //      on the card, IF if it present on the card.
    const cardRarity = cardObj.rarity;
    //      created the cardRarity variable for each card, could be used in the description when clicked
    const urlToBuyCard = cardObj.tcgplayer["url"];
    //      created the urlToBuyCard variable incase we want a cute lil buy button next to the 'Add to my collection' button
    const evolvesFrom = cardObj.evolvesFrom;
    //      created the nationalPokedexNumbers variable for each card, showing which number the pokemon is in the national pokedex
    const nationalPokedexNumbers = cardObj.nationalPokedexNumbers;
    // created the cardRules variable for each card, showing the rules for TRAINER cards - not applicable to Pokemon cards
    const cardRules = cardObj.rules;

    navForPoke.appendChild(img);

    const attackArray = cardObj.attacks;
    const attacks = [];
    // attackArray.forEach((attackObj) => {
    //     attacks.push({'name':attackObj.name , 'attackText':attackObj.text , 'damage':attackObj.damage})
    // })
    // console.log(attacks)

    img.addEventListener("click", (e) => {
      imgForDisplay.src = e.target.currentSrc; //click for image
      pokeName.textContent = name; //click for name
      typeTitle.textContent = cardType; //click for type
      descTitle.textContent = flavorText; //click for description
      selectedNatDex.textContent = nationalPokedexNumbers; //click for national pokedex number
      rarityTitle.textContent = cardRarity; //  click for rarity
      rulesTitle.textContent = cardRules; //  click for rules
      console.log(e);
    });
  });
}


const collectionDisplay = document.querySelector("#collection-container");
const buttonAddCollect = document.querySelector("#addToCollection");
buttonAddCollect.addEventListener("click", () => addtoCollection());
//When clicked
function addtoCollection() {

    let name = pokeName.textContent;
    let ownedImgSrc = imgForDisplay.src;
    let collectionObject = {
        "name": name,
        "src": ownedImgSrc,
    };
    // console.log(collectionObject);
    fetch("http://localhost:3000/data", {
        method: "POST",
        body: JSON.stringify({
            "name": name,
            "src": ownedImgSrc,
        }),
        headers: {
            "content-type": "application/json",
            "accept": "application/json",
        }
    }).then((resp) => resp.json())

    .then((data) => console.log(data));
}
//1. Grab data from current img.src on disply, and name.
//2. Create data object to send to my collection
//3. PATCH request data into db.json
//4. Attach render character function at end.

// The code below was a fetch to the card branch of the API, the cards are contained in the data key, I accessed the 24th card object in the array from
// the data key via bracket notation, and could only get to the nested information in the set object via bracket notation!

// fetch("https://api.pokemontcg.io/v2/cards/").then((resp) => resp.json())
//     .then((dataObj) => console.log(dataObj.data[24][`set`][`series`]))

//  The code above resulted in "Base" being console.logged.
