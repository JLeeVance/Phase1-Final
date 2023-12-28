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


 # GET a Card.

	    GET https://api.pokemontcg.io/v2/cards/<id>
-	Fetch the details of a single card
 -   Needs the value of the key ‘id’ of the card.


(	https://docs.pokemontcg.io/api-reference/cards/search-cards )




# The Card Object Attributes



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

**Fun things to note about the card Object**
- All query parameters are optional 
    - meaning our parameter could have multiple field of search, they MUST be
    deliminated by a comma. 
- If we use the API key in our header code correctly there is a fun little card object 'finder"
    -         pokemon.card.find(fieldForSearch)
    -               .then(card => {
    -               console.log(card.name)  //=> 'Charizard'
    -          })   
    
                                          '

<strong>Search Parameters</strong>
Parameter|Description|Default Value
|--------|-----------|-------------|
q|The search query.|Examples can be found below.	
page|The page of data to access.|1
pageSize|The maximum amount of cards to return.|250 (max of 250)
orderBy|The field(s) to order the results by.|Examples can be found below.	
select|A comma delimited list of fields to return in the response (ex. ?select=id,name).|By default, all fields are returned if this query parameter is not used.	

<strong>Searching cont.. Keyword Matching</strong>

**Examples** 
1. You wanted to search for a card with the name of 'Charizard'
    - (name:charizard)
2. If you have a pokemon that happens to have V or other letters in the title
    - (name:"venusaur v")
3. Two fields?
    - (name:charizard subtypes:mega)
4. Search for all "mega" subtypes, BUT NOT an certain type?
    - (subtypes:mega -types:water)
5. Exact Matching
    - (!name:charizard)
6. Range Searches! Some fields support searching on a range (ones that contain numerical data 'int')
    - we use bracket notation to access
    - example: (nationalPokedexNumbers:[1 TO 151]) //=> **This would give us ONLY the first 151 pokemon**
7. We can search on Nested Fields!
    - Use a period as a seperator to access the nested fields.
    - Some Examples:
        - (     set.id:sm1    )  //=> filter by set ID
        - (     attacks.name:waterCannon    )   //=> filter on cards with an attack of waterCannon
8. WE CAN PREORDER OUR DATA?!
    - Using the ' orderBy ' query parameter. 
    -      pokemon.card.all({ q: 'name:charizard' , orderBy: '-set.releaseDate' })
    -        .then((result) => {
    -             functionGoesHere
    -         })





