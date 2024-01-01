
const cardsUrl = 'https://api.pokemontcg.io/v2/cards'

fetch(cardsUrl)
.then(r=>r.json())
.then(cardsArr => renderCards(cardsArr.data))

function renderCards(cardsArr) {

    const nav = document.querySelector('nav')
    
    cardsArr.forEach(card => {

        const img = document.createElement('img')

        img.src = card.images.large

        nav.appendChild(img)
    })
}