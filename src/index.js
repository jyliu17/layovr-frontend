// STABLE ELEMENTS

const airportsUl = document.querySelector('#airports-ul')
// const airportsInfoOuterDiv = document.querySelector('#airports-info-outer-div')
const airportsDiv = document.querySelector('#airports-div')
const amenitiesUl = document.querySelector('#amenities-ul')
const restaurantsUl = document.querySelector('#restaurants-ul')
const storesUl = document.querySelector('#stores-ul')

// FUNCTIONS

getAirports() 
//***** Getting all airports ***/
function getAirports () {
    fetch('http://localhost:3000/airports')
        .then(response => response.json())
        .then(airportArray => {
            airportArray.forEach(airportObj => {
                renderAirport(airportObj)
            })
        });
}

//****** Render Airport Div, Amenities, Restaurants, Stores *****/

function renderAirport(airportObj) {

    const airportLi = document.createElement("li")
    const airportImgDiv = document.createElement('div')
    airportImgDiv.className = "circular--landscape"
    const nameH4 = document.createElement("h4")
    nameH4.className = "airport-name"
    nameH4.textContent = airportObj.name
    const airportImg = document.createElement("img")
    airportImg.className = "airport-image" 
    airportImg.dataset.id = airportObj.id
    airportImg.src = airportObj.image 
    airportImg.alt = airportObj.name

    const airportLike = document.createElement("button")
    airportLike.className = "airport-likebtn"
    airportLike.textContent = `${airportObj.likes} 🛫`
    airportLike.dataset.id = airportObj.id

    airportImgDiv.append(airportImg)
    airportLi.append(nameH4, airportImgDiv, airportLike)
    airportsUl.append(airportLi)
}

function renderAirportInfoDiv(airportObj) {
    const airportInfoDiv = document.createElement('div')
    const airportInfoName = document.createElement('h3')
    const airportInfoLocation = document.createElement('p')
    const airportInfoLikes = document.createElement('p')
    airportInfoDiv.id = "airport-info-div"
    airportInfoName.textContent = `${airportObj.name}`
    airportInfoLocation.textContent = `${airportObj.city}, ${airportObj.country}`
    airportInfoLikes.textContent = `${airportObj.likes} Likes`

    airportInfoDiv.append(airportInfoName, airportInfoLocation, airportInfoLikes)
    airportsDiv.append(airportInfoDiv)
}


function renderAmenity (amenityObj) {
    const amenityLi = document.createElement("li")
    const amenityH4 = document.createElement("h4")
    const amenityImgDiv = document.createElement("div")
    amenityImgDiv.className = "circular--square"
    const amenityImg = document.createElement("img")
    amenityH4.className = "amenity-name"
    amenityH4.textContent = amenityObj.name
    
    amenityImg.className = "amenity-image"
    amenityImg.dataset.id = amenityObj.id
    amenityImg.src = amenityObj.image

    const amenityLike = document.createElement("button")
    amenityLike.className = "amenity-likebtn"
    amenityLike.textContent = `${amenityObj.likes} 🛫`
    amenityLike.dataset.id = amenityObj.id

    amenityImgDiv.append(amenityImg)
    amenityLi.append(amenityH4, amenityImgDiv, amenityLike)
    amenitiesUl.append(amenityLi)
}

function renderRestaurant (restaurantObj) {
    const restaurantLi = document.createElement("li")
    const restaurantH4 = document.createElement("h4")
    const restaurantImgDiv = document.createElement("div")
    restaurantImgDiv.className = "circular--square"
    const restaurantImg = document.createElement("img")
    restaurantH4.className = "restaurant-name"
    restaurantH4.textContent = restaurantObj.name
    restaurantImg.className = "restaurant-image"
    restaurantImg.dataset.id = restaurantObj.id
    restaurantImg.src = restaurantObj.image

    const restaurantLike = document.createElement("button")
    restaurantLike.className = "restaurant-likebtn"
    restaurantLike.textContent = `${restaurantObj.likes} 🛫`
    restaurantLike.dataset.id = restaurantObj.id

    restaurantImgDiv.append(restaurantImg)
    restaurantLi.append(restaurantH4, restaurantImgDiv, restaurantLike)
    restaurantsUl.append(restaurantLi)
}
function renderStore(storeObj) {
    const storeLi = document.createElement("li")
    const storeH4 = document.createElement("h4")
    const storeImgDiv = document.createElement("div")
    storeImgDiv.className = "circular--square"
    const storeImg = document.createElement("img")
    storeH4.className = "store-name"
    storeH4.textContent = storeObj.name
    storeImg.className = "store-image"
    storeImg.dataset.id = storeObj.id
    storeImg.src = storeObj.image

    const storeLike = document.createElement("button")
    storeLike.className = "store-likebtn"
    storeLike.textContent = `${storeObj.likes} 🛫`
    storeLike.dataset.id = storeObj.id

    storeImgDiv.append(storeImg)
    storeLi.append(storeH4, storeImgDiv, storeLike)
    storesUl.append(storeLi)
}


//**********  Event Listener on Airports (click on image) ****/

airportsUl.addEventListener("click", event => {
    if(event.target.className === "airport-image"){
        const id = event.target.dataset.id
        console.log(event.target)
        getAirportById(id)
        getAmenities(id)
        getRestaurants(id)
        getStores(id)
        
    }
    if(event.target.className === "airport-likebtn"){
        const id = event.target.dataset.id
        updateLike(id)
        const airportLike = event.target.querySelector(".")
        const numLikes = parseInt(airportLike.textContent) + 1
        airportLike.textContent = numLikes
    }

})

function getAirportById(id){
    fetch(`http://localhost:3000/airports/${id}`)
    .then(response => response.json())
    .then(airportObj => renderAirportInfoDiv(airportObj)) 
        
}

function getAmenities(id){
    fetch(`http://localhost:3000/amenities/?_limit=1`)
    .then(response => response.json())
    .then(amenitiesArray => {
        amenitiesUl.innerHTML = ""
        amenitiesArray.forEach(amenity => {
            if(amenity.airport_id == id) {
                renderAmenity(amenity)
            }
        })
        
    })
}

function getRestaurants(id) {
    fetch('http://localhost:3000/restaurants/?_limit=1')
        .then(response => response.json())
        .then(restaurantsArray => {
            restaurantsUl.innerHTML = ""
            restaurantsArray.forEach(restaurantObj => {
                if(restaurantObj.airport_id == id){
                renderRestaurant(restaurantObj)
                }
            })
        })
    }

    function getStores(id) {
        fetch('http://localhost:3000/stores/?_limit=1')
            .then(response => response.json())
            .then(storesArray => {
                storesUl.innerHTML = ""
                storesArray.forEach(storeObj => {
                    if(storeObj.airport_id == id){
                    renderStore(storeObj)
                    }
                })
            })
        }

function updateLikes(id) {
    fetch(`http://localhost:3000/airports/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({likes:id})
      })
      .then(response => response.json())
      .then(newLike => {
       
      })
    }