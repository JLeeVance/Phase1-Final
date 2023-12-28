# Phase1-Final

** For Developers use during the process
** Not intended to sustain in final edit

# Fetching to the API we are using

While we could access the API without an API key, I have signed up for the Developer community
through Pokémon. Without one included in our code, our users would possibly hit a "limit' to how many requests we get a day! SO we have a key that needs to be present in our header I believe. This will also speed up the process overall for our communication with the API from what I understand.

** I will provide you each with the API key via messaging when we are all back together!
** We need to ask about it though, as I do not want to ruin anything by using it, but after reading n 



‘Authentication to the API is performed via the X-API-Key header’ is what the documents on their website say if we choose to use the imbedded API key. 

**All request to the API must be made over HTTPS. Calls made over plain HTTP will fail, and redirect automatically to HTTPS**


GET a Card.

	GET https://api.pokemontcg.io/v2/cards/<id>


-	Fetch the details of a single card
        -   Needs the value of the key ‘id’ of the card.


(	https://docs.pokemontcg.io/api-reference/cards/search-cards )




The Card Object Attributes


|KEY NAME |DATA Type| Info|
|---------|---------|-----|
id |string| -- 
name |string | --
supertype |string | --
subtypes list |string | --
level |string | --
hp |string | --
types list |string |Energy for a card
evolvesFrom |string |Which Pokémon this card evolves from. 
evolvesTo |string |*Can be multiple*
rulesList |string |Rules associated with the card
abilities List | -- | --	
-- |name:string |Name of ability
-- |text:string |the text value of the ability
-- |type:string |the type of the ability
attacks list | -- | --		
-- |cost:string |energy to execute
-- |name:string	|the attack name
-- |text:string	|textual description associated with the task
-- |damage:string |amount of damage for attack
weaknesses list|--|--	
-- |type:string |the type of weakness
-- |value:string |value of the weakness
resistances list | -- | --	
--|type:string |the type of resistance
-- |value:string |value of resistance
set	|hash |the set details embedded within the card
number |string | number of card
artist |string |artist of card artwork
rarity |string |‘common’ ‘secret rare’
nationalPokedexNumbers |list (int) |the National number for any given Pokémon. 
images |hash |the images for a card
-- |small:string |URL for lower-res image for card
-- |large:string |URL for higher-res image for card
tcgplayer |hash |TCGPlayer info for any card
-- |url:string |link to TCGPlayer store to purchase card
-- |updatedAt:string |the date the price was last updated
-- |prices:hash	|a hash of price types
--|--|‘low    ’ – ‘mid’ - ‘high’
--|‘market’ = marketValue|--
		
