fetch("https://api.pokemontcg.io/v2/cards/?q=nationalPokedexNumbers:1").then((resp) => resp.json())
    .then((dataObj) => renderNavBar(dataObj));

    // console.log(dataObj.data[24][`set`][`series`])

function renderNavBar (dataObj){
    // console.log(dataObj.data[24]);
    let cardArray = dataObj.data;
    //      pulled the card array from the data object within the object returned from the fetch.
    //      assigned it to cardArray.
    const navForPoke = document.querySelector("#navBar")
    //      pulled the <nav> for the pokemon to be rendered to

    navForPoke.textContent = "";
    //      removed default text, can do this manually later!
    navForPoke.style.display = "flex";
    navForPoke.style.height = 151;
    //      set height for the <nav> to 151px
    navForPoke.style.overflowX = "scroll"; 
    //      set the overflow of the X axis style property to scroll, allowing us to scroll back and forth
    //      through the rendered cards
    cardArray.forEach( cardObj => {
        const img = document.createElement("img");
        //      created <img> for each image being rendered
        const imgSrc = cardObj.images.small;
        //      the image source was within the key of images
        //      chose the small one for loading time?
        const name = cardObj.name;
        //      created the variable of name for EACH card as it was passed through the loop.
        const flavorText = cardObj.flavorText
        //      created the variable flavorText which is the text description for the Pokemon
        //      on the card, IF if it present on the card. 
        const cardRarity = cardObj.rarity
        //      created the cardRarity variable for each card, could be used in the description when clicked
        const urlToBuyCard = cardObj.tcgplayer['url']
        //      created the urlToBuyCard variable incase we want a cute lil buy button next to the 'Add to my collection' button
        const attackArray = cardObj.attacks
        const attacks = [];
        attackArray.forEach((attackObj) => {
            attacks.push({'name':attackObj.name , 'attackText':attackObj.text , 'damage':attackObj.damage})
        })
        console.log(attacks)

        img.src = imgSrc;
        img.style.margin = 3;
        
        navForPoke.appendChild(img); 
    });
        
   };





// The code below was a fetch to the card branch of the API, the cards are contained in the data key, I accessed the 24th card object in the array from
// the data key via bracket notation, and could only get to the nested information in the set object via bracket notation!

// fetch("https://api.pokemontcg.io/v2/cards/").then((resp) => resp.json())
//     .then((dataObj) => console.log(dataObj.data[24][`set`][`series`]))

//  The code above resulted in "Base" being console.logged.