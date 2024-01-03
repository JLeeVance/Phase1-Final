fetch("https://api.pokemontcg.io/v2/cards/?q=set.name:base")
.then((resp) => resp.json())
.then((dataObj) => renderNavBar(dataObj))


const imgForDisplay = document.querySelector(".poke-image");
// console.log(imgForDisplay)
const pokeName = document.querySelector(".poke-name")

function renderNavBar (dataObj){
    // console.log(dataObj.data[24]);
    let cardArray = dataObj.data;
    //      pulled the card array from the data object within the object returned from the fetch.
    //      assigned it to cardArray
    const navForPoke = document.querySelector(".navBar")
    //      pulled the <nav> for the pokemon to be rendered to


    cardArray.forEach(cardObj => {
        // console.log(cardObj)
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
        const flavorText = cardObj.flavorText
        //      created the variable flavorText which is the text description for the Pokemon
        //      on the card, IF if it present on the card. 
        const cardRarity = cardObj.rarity
        //      created the cardRarity variable for each card, could be used in the description when clicked
        const urlToBuyCard = cardObj.tcgplayer['url']
        //      created the urlToBuyCard variable incase we want a cute lil buy button next to the 'Add to my collection' button
        const evolvesFrom = cardObj.evolvesFrom;

        navForPoke.appendChild(img);

        const attackArray = cardObj.attacks
        const attacks = [];
        // attackArray.forEach((attackObj) => {
        //     attacks.push({'name':attackObj.name , 'attackText':attackObj.text , 'damage':attackObj.damage})
        // })
        // console.log(attacks)
        img.addEventListener('click', (e) => {   /*  I added this to proceed with the collectio box */
            imgForDisplay.src = e.target.currentSrc;
            pokeName.textContent = name;
        })
        
    });       
   };


const collectionDisplay = document.querySelector("#collection-container"); /*grabbed the container*/
const buttonToAdd = document.querySelector("#addToCollection");


buttonToAdd.addEventListener("click", () => addtoCollection());


function addtoCollection() {
    let name = pokeName.textContent;
    let ownedImgSrc = imgForDisplay.src;
    let collectionObject = {
        "name": name,
        "src": ownedImgSrc,
    };

    fetch("http://localhost:3000/data", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json",
        },
        body: JSON.stringify(collectionObject),
    })
    .then((resp) => resp.json())
    .then(() => fetchAndRenderLocal())
}

function fetchAndRenderLocal() {
    const myCollection = document.querySelector("#myCollection-div");
    fetch("http://localhost:3000/data").then(resp => resp.json()).then((data) => {
    data.forEach((localCardObj) => {
            const card = document.createElement("card");
            const img = document.createElement("img");
            const h4 = document.createElement("h4");
            img.src = localCardObj.src;
            h4.textContent = localCardObj.name;
            
            card.append(h4,img);
            myCollection.append(card);
        })
    })
 }