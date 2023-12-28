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

             pokemon.card.find(fieldForSearch)
                   .then(card => {
                   console.log(card.name)  //=> 'Charizard'
              })   
    
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

          pokemon.card.all({ q: 'name:charizard' , orderBy: '-set.releaseDate' })
            .then((result) => {
                 functionGoesHere
             })




# GET a set



##          HTTPS request:
- 
                            GET https://api.pokemontcg.io/v2/sets/<id>  

- Parameters:
    - id: the Id of the set you are wanting.
- Query Parameters
    - select: a comma deliminated list of fields to return in the response. By default, all fields are returned if this query selector is not used. 
- There is also some fun little code for fetching sets it seems.

                        pokemon.set.find('swsh1')
                            .then(set => {
                              console.log(set.name) //=> "Sword & Shield"
                         })


# The Set Object 
#### Attributes


|The|Set|Object|
|----|----------|----|
id |string |Unique identifier for the object.
name |string |The name of the set.
series |string |The series the set belongs to, like Sword and Shield or Base.
printedTotal |integer |The number printed on the card that represents the total. This total does not include secret rares.
total|integer |The total number of cards in the set, including secret rares, alternate art, etc.
legalities |hash|The legalities of the set. If a given format is not legal, it will not appear in the hash. This is a hash with the following fields
--|standard:string |The standard game format. Possible values are Legal.
-- |expanded:string	|The expanded game format. Possible values are Legal.
-- |unlimited:string |The unlimited game format. Possible values are Legal.
ptcgoCode |string |The code the Pokémon Trading Card Game Online uses to identify a set.
releaseDate |string |The date the set was released (in the USA). Format is YYYY/MM/DD.
updatedAt |String |The date and time the set was updated. Format is YYYY/MM/DD HH:MM:SS.
images |hash |Any images associated with the set, such as symbol and logo. This is a hash with the following fields:
-- |symbol:string |The url to the symbol image.
-- |logo:string	|The url to the logo image.

# Query Parameters 
#### All query parameters are optional.

Parameter |Description |Default Value
|---------|------------|-------------|
q |The search query. |Examples can be found below.	
page |The page of data to access. |1
pageSize |The maximum amount of cards to return. |250 (max of 250)
orderBy |The field(s) to order the results by. |Examples can be found below.	
select |A comma delimited list of fields to return in the response (ex. ?select=id,name). |By default, all fields are returned if this query parameter is not used.	

####  Query Examples for Sets
1. Get all sets

                        sets = Set.all()
2. Filter sets

                        sets = Set.where(q='legailities.standard:legal')
3. Get a specific page of data

                        sets = Set.where(page=2, pageSize=10)


# Using a fetch for the type of POKEMON
#### GET all possible types

1. HTTP Request:

        GET https://api.pokemontcg.io/v2/types
2. No parameters for the following:
    - URL
    - Body
    - Query

**We were given some code samples, I THINK this is trying to tell us we can use the same sort of formatting as we have in the above examples, matching the key to the provided value of the type we are searching for!

3. Code Example:

                 pokemon.type.all()
    -ExampleResponse

                {
                    "data": [
                        "Colorless",
                        "Darkness",
                        "Dragon",
                        "Fairy",
                        "Fighting",
                        "Fire",
                        "Grass",
                        "Lightning",
                        "Metal",
                        "Psychic",
                        "Water"
                    ]
                }


## **There is another fetch for subtypes, but I do not think we will be filtering by that, if we do, the link to the page with a few examples is below.**

https://docs.pokemontcg.io/api-reference/subtypes/get-subtypes

##  RAREITY Searching, or "fetching"

1. This is built off of the inbedded 'pokemon API' search method? We need to verify, but If we can use this formatting it will make things much easier. 

        pokemon.rarity.all()
- example response


        {
            "data": [
                "Amazing Rare",
                "Common",
                "LEGEND",
                "Promo",
                "Rare",
                "Rare ACE",
                "Rare BREAK",
                "Rare Holo",
                "Rare Holo EX",
                "Rare Holo GX",
                "Rare Holo LV.X",
                "Rare Holo Star",
                "Rare Holo V",
                "Rare Holo VMAX",
                "Rare Prime",
                "Rare Prism Star",
                "Rare Rainbow",
                "Rare Secret",
                "Rare Shining",
                "Rare Shiny",
                "Rare Shiny GX",
                "Rare Ultra",
                "Uncommon"
            ]
        }

- HTPP Request

        GET https://api.pokemontcg.io/v2/rarities



# This is the Javascript Dev TCG SDK 
####    SDK (software development kit) - A set of platform-specific building tools for developers. 
####    They help us work with the API easiser within our code!


<strong>This is the Pokémon TCG SDK Javascript implementation. It is a wrapper around the Pokémon TCG API of pokemontcg.io.</strong>

#### Installation

        npm install --save pokemontcgsdk

#### Usage
###### Configuration

        import pokemon from 'pokemontcgsdk'
        pokemon.configure({apiKey: '123abc'})

#### Cards

###### Get a single card by ID

            pokemon.card.find('base1-4')
                .then(card => {
                    console.log(card.name) // "Charizard"
                })

###### Filter cards via the q parameter

            pokemon.card.where({ q: 'name:blastoise' })
                .then(result => {
                    console.log(result.data[0].name) // "Blastoise"
                })

###### Filter cards via the q parameter and specific page

                pokemon.card.where({ q: 'name:blastoise', pageSize: 10, page: 3 })
                .then(result => {
                    console.log(result.data[0].name) // "Blastoise"
                })

###### Automatically page through card data

                pokemon.card.all({ q: 'name:blastoise' })
                    .then((cards) => {
                        console.log(cards[0].name) // "Blastoise"
                    })

- Using the all function, pagination happens automatically, and the result will simply contain the data and no pagination info.

#### Sets


###### Get a single set by ID

        pokemon.set.find('base1')
        .then(set => {
            console.log(set.name) // "Base"
        })

###### Filter sets via the q parameter

        pokemon.set.where({ q: 'series:base' })
        .then(result => {
            console.log(result.data[0].name) // "Base"
        })

###### Filter cards via the q parameter and specific page

        pokemon.set.where({ q: 'series:base', pageSize: 1, page: 1 })
        .then(result => {
            console.log(result.data[0].name) // "Base"
        })

###### Automatically page through card data

        pokemon.set.all({ q: 'series:base' })
        .then((cards) => {
            console.log(cards[0].name) // "Base"
        })

- Using the all function, pagination happens automatically, and the result will simply contain the data and no pagination info.

#### Supertypes

        pokemon.supertype.all()
#### Subtypes

        pokemon.subtype.all()
#### Types

        pokemon.type.all()
#### Rarity

        pokemon.rarity.all()

Please refer to https://docs.pokemontcg.io for more information on query syntax and what fields are available.


###### Build tasks are in npm scripts:

npm run build
npm run test