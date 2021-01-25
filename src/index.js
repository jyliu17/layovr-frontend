// STABLE ELEMENTS

const airportsUl = document.querySelector('#airports-ul')
const amenitiesUl = document.querySelector('#amenities-ul')
const restaurantsUl = document.querySelector('#restaurants-ul')
const storesUl = document.querySelector('#stores-ul')

// FUNCTIONS


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

function renderAirport(airportObj) {

    const airportLi = document.createElement("li")
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

    airportLi.append(nameH4, airportImg, airportLike)
    airportsUl.append(airportLi)
    
}

//***** Getting amenities ***/
// function getAmenities () {
//     fetch('http://localhost:3000/amenities')
//         .then(response => response.json())
//         .then(amenitiesArray => {
//             amenitiesArray.forEach(amenityObj => {
//                 renderAmenity(amenityObj)
//             })
//         });
// }

function renderAmenity (amenityObj) {
    const amenityLi = document.createElement("li")
    const amenityH4 = document.createElement("h4")
    const amenityImg = document.createElement("img")
    amenityH4.className = "amenity-name"
    amenityH4.textContent = amenityObj.name
    
    amenityImg.className = "amenity-image"
    amenityImg.dataset.id = amenityObj.id
    amenityImg.src = amenityObj.image

    
    amenityLi.append(amenityH4, amenityImg)
    amenitiesUl.append(amenityLi)
}

//***** Getting restaurants ***/

function getRestaurants () {
    fetch('http://localhost:3000/restaurants')
        .then(response => response.json())
        .then(restaurantsArray => {
            restaurantsArray.forEach(restaurantObj => {
                renderRestaurant(restaurantObj)
            })
        });
}

function renderRestaurant (restaurantObj) {
    const restaurantLi = document.createElement("li")
    const restaurantH4 = document.createElement("h4")
    const restaurantImg = document.createElement("img")
    restaurantH4.className = "restaurant-name"
    restaurantH4.textContent = restaurantObj.name
    restaurantImg.className = "restaurant-image"
    restaurantImg.dataset.id = restaurantObj.id
    restaurantImg.src = restaurantObj.image

    restaurantLi.append(restaurantH4, restaurantImg)
    restaurantsUl.append(restaurantLi)
}



getAirports() 
getAmenities()
getRestaurants()
// getStores()


//**********  Event Listener on Airports (click on image) ****/

airportsUl.addEventListener("click", event => {
    if(event.target.className === "airport-image"){
        const id = event.target.dataset.id
        console.log(event.target)
        getAirportById(id)

        getAmenities(id)
        // getRestaurants(id)
        // getStores(id)
        
    }
    if(event.target.className === "airport-likebtn"){
        const id = event.target.dataset.id
        updateLikes(id)
    }

})

function getAmenities(id){
    fetch(`http://localhost:3000/amenities`)
    .then(response => response.json())
    .then(amenitiesArray => {
        amenitiesUl.innerHTML = ""
        amenitiesArray.forEach(amenity => {
            // console.log(amenity.airport_id == id)
            // amenitiesUl.innerHTML = ""
            if(amenity.airport_id == id) {
                renderAmenity(amenity)
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
      .then(newLike => console.log())
    }



function getAirportById(id){
    fetch(`http://localhost:3000/airports/${id}`)
    .then(response => response.json())
    .then(airportObj => {
        // once we click the airport 
        
    })
}

// function renderAirportInfo(airportObj) {

    // airport.dataset.id = airportObj.id
    
// }

