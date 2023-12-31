const urL = "https://api.pokemontcg.io/v2/cards/?"
const limit = "&pageSize=100"
fetch(urL+limit)
.then((resp) => resp.json())
.then((dataObj) => renderNavBar(dataObj))
.then(fetchAndRenderLocal())

window.addEventListener("load", function(){                                 /* Event listener for "window" load. ONLY when EVERYTHING is loaded     */
    setTimeout(
        function openInstructions(event){
            document.querySelector(".popup").style.display = "block";       /* Changed display for the div with class of .popup                     */
        },
        1000                                                                /* Used the setTimeout() function to trigger the called function        */
    )                                                                       /* 1 second after page load                                             */
});

document.querySelector("#close").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
});

const imgForDisplay = document.querySelector(".poke-image"); /* grabbed the img container for poke Display                                          */
const pokeName = document.querySelector(".poke-name")        /* grabbed the poke name container for poke Display                                    */
const typeTitle = document.querySelector(".selectedType .title");       /* Selecting the span elements with the class "title"                       */
const descTitle = document.querySelector(".selectedDesc .title");       /* allowing us to keep the text-content for the Titles BOLD,                */
const rarityTitle = document.querySelector(".selectedRarity .title");   /* while dynamically changing the text content inside                       */
const selectedNatDex = document.querySelector(".selectedNatDex .title");
const scrollContainer = document.querySelector(".navbar");              /* grabbed scrollContainer globally                                         */

const form = document.querySelector(".form")                            /* grabbed search form                                                      */
form.addEventListener('submit' , (e) => {
    handleSubmit(e);                                                    /* called function handleSubmit, providing (e)                              */
})

function handleSubmit(e) {                                              /* function handles the fetch for pokemon name search queries               */
    e.preventDefault();
    let searchValue = `q=name:${e.target[0].value.toLowerCase()}`;      /* isolated the value that was typed into the input field                   */
    fetch(`${urL}${searchValue}${limit}`)                                       /* used string interpolation to combine both variables */
      .then((resp) => resp.json())                              
      .then((data) => {                                                 /* used the length of the data being returned to check if                   */
        if (data.data.length < 1) {                                     /*      the fetch was successful                                            */
            throw new Error ("no pokemon")                              /* 'created' our own error to look for                                      */
        }
        if (scrollContainer.hasChildNodes()) {                          /* in the event of a sucessful fetch, we can remove the present children    */
            scrollContainer.replaceChildren()};                         /*      nodes under our navbar                                              */
            renderNavBar(data);
        })                                                              
      .catch((error) => {                                               /* in the event of a thrown error, the fetch will 'catch' it                */
        alert("No Pokemon were found!");                                /* the alert to the client that their fetch was not successful              */
        return;                                                                  
      });
      e.target[0].value = ""                                            /* reset the value of the form via the event!                               */
  }

function renderNavBar (dataObj){
    let cardArray = dataObj.data;                                       /* pulled the card array from the data object within the object returned from the fetch. */
    imgForDisplay.src = cardArray[0].images.large;                      /* line 42->47 are setting default values upon                              */
    pokeName.textContent = cardArray[0].name;                           /*      first page load. The function is only called                        */
    typeTitle.textContent = cardArray[0].supertype;                     /*          on page load                                                    */
    descTitle.textContent = cardArray[0].flavorText;
    rarityTitle.textContent = cardArray[0].rarity;
    selectedNatDex.textContent = cardArray[0].nationalPokedexNumbers;
    
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

        scrollContainer.appendChild(img);
                                                                         
        img.addEventListener("click", (e) => {
          imgForDisplay.src = e.target.currentSrc;                          /* brings down src for img tag upon clicked */
          pokeName.textContent = name;                                      /* brings down name for poke display upon clicked */
          typeTitle.textContent = cardType;                                 /* brings down card `type` for poke display upon clicked */
          descTitle.textContent = flavorText;                               /* brings down poke description for display upon clicked */
          selectedNatDex.textContent = nationalPokedexNumbers;              /* brings down National Pokedex Number for poke display */ 
          rarityTitle.textContent = cardRarity;                             /* brings down card rarity for poke display */
        });  
    });  
}  

const collectionDisplay = document.querySelector("#collection-container"); /*grabbed the container*/
const buttonToAdd = document.querySelector("#addToCollection");            /* grabbed button*/
buttonToAdd.addEventListener("click", () => addToCollection());

function addToCollection() {                /* This function is only called in the event listener    */
    let name = pokeName.textContent;        /* line 82 -> 86 pulls data from current poke on display */
    let ownedImgSrc = imgForDisplay.src;    /*  it is used on line 90->94                            */
    let type = typeTitle.textContent;       
    let description = descTitle.textContent;
    let natPokeNum = selectedNatDex.textContent;


    let collectionObject = {                /* Created our object we are sending to local db */
        "name": name,
        "src": ownedImgSrc,
        "type": type,
        "description": description,
        "natPokeNum": natPokeNum,
    };

    fetch("http://localhost:3000/data", {   /* fetched to our local db via URL           */
        method: "POST",                     /* POST because we are creating a new object */
        headers: {
            "content-type": "application/json",
            "accept": "application/json",
        },
        body: JSON.stringify(collectionObject),
    })
    .then((resp) => resp.json())
    .then((newlyAdded) => createCard(newlyAdded) )      /* moved the function out of this code block */
}
function createCard(newlyAdded) {
    const myCollection = document.querySelector("#myCollection-div");
    const card = document.createElement("card");
    const img = document.createElement("img");
    const h4 = document.createElement("h4");
    const button = document.createElement("button");
    let id = newlyAdded.id;
    card.id = id;
    button.textContent = "X";
    button.addEventListener('click', (e) => {
        fetch(`http://localhost:3000/data/${id}`, {
            method: "DELETE",
        });
        const cardToRemove = card
        myCollection.removeChild(cardToRemove);
        })
    img.src = newlyAdded.src;
    h4.textContent = newlyAdded.name;
    card.append(h4, button, img);
    myCollection.append(card);
}
function fetchAndRenderLocal() {                                        /* This fuction creates a card tag, img tag, and the header */
    const myCollection = document.querySelector("#myCollection-div");   /* grabbed the div that the cards are going into */
    fetch("http://localhost:3000/data").then(resp => resp.json()).then((localCardObj) => {
    localCardObj.forEach((localCardObj) => {
        // let i = 0;
        const card = document.createElement("card");
        const img = document.createElement("img");
        const h4 = document.createElement("h4");
        const button = document.createElement("button");
        let id = localCardObj.id
        card.id = id;
        button.textContent = "X";
        button.addEventListener('click', (e) => {
            fetch(`http://localhost:3000/data/${id}`, {
                method: "DELETE",
            });
            const cardToRemove = card
            myCollection.removeChild(cardToRemove);

        })
        img.src = localCardObj.src;             /* Used a forEach loop of our array of abjects */                                     
        h4.textContent = localCardObj.name;     /* Pulled the data for the client rendering from local db */    
        card.append(h4, button, img);                    /* added h4 and img tags to the card */
        myCollection.append(card);              /* added card to the myCollection variable defined on line 89 */
        })
    })
}
