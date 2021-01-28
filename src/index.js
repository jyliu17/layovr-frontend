// STABLE ELEMENTS

const airportsUl = document.querySelector('#airports-ul')
const airportsDetailOuterDiv = document.querySelector('#airport-detail-outer-div')
const airportsDiv = document.querySelector('#airports-div')
const amenitiesUl = document.querySelector('#amenities-ul')
const restaurantsUl = document.querySelector('#restaurants-ul')
const storesUl = document.querySelector('#stores-ul')
const formDiv = document.querySelector("#form-div")
const commentsUl = document.querySelector("#comments-ul")

// FUNCTIONS

getAirports()
//***** Getting all airports ***/
function getAirports() {
    fetch('http://localhost:3000/airports/')
        .then(response => response.json())
        .then(airportArray => {
            airportArray.sort((a,b)=> (a.code > b.code ? 1 : -1))
            airportArray.forEach(airportObj => {
                renderAirport(airportObj)
            })
        });
}

//****** Render Airport Div, Amenities, Restaurants, Stores, Comment*****/

function renderAirport(airportObj) {

    const airportLi = document.createElement("li")
    const airportImgDiv = document.createElement('div')
    airportImgDiv.className = "circular--landscape"
    const nameH4 = document.createElement("h4")
    nameH4.className = "airport-name"
    nameH4.textContent = airportObj.code
    const airportImg = document.createElement("img")
    airportImg.className = "airport-image"
    airportImg.dataset.id = airportObj.id
    airportImg.src = airportObj.image
    airportImg.alt = airportObj.code

    const airportLike = document.createElement("button")
    airportLike.className = "airport-likebtn"
    airportLike.textContent = `${airportObj.likes} 🛫`
    airportLike.dataset.id = airportObj.id


    airportImgDiv.append(airportImg, nameH4)
    airportLi.append(airportImgDiv, airportLike)
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
    airportInfoLikes.className = "airport-info-likes"
    airportInfoLikes.textContent = `${airportObj.likes} Likes`

    airportInfoDiv.append(airportInfoName, airportInfoLocation, airportInfoLikes)
    airportsDetailOuterDiv.innerHTML = null
    airportsDetailOuterDiv.append(airportInfoDiv)
}

function renderAirportCommentForm(airportObj) {

    const id = airportObj

    formDiv.innerHTML = null
    formDiv.innerHTML = `<form class="comment-form" data-id="${airportObj}">
        <h4 id="comments-heading">COMMENTS</h4>
        <input type="text" name="name" class="field-style" placeholder="Full Name"/>
        <br>
        <input type="textarea" name="comment" class="field-style" placeholder="Comment" id="comment-field"/>
        <br>
        <input type="submit" value="Submit" />
    </form>`
}

function renderComment(commentObj) {

    const commentLi = document.createElement("li")
    const commentAuthor = document.createElement("div")
    const commentContent = document.createElement("div")
    const commentDelete = document.createElement("button")
    const commentTimestamp = document.createElement('div')

    commentAuthor.className = "author"
    commentAuthor.textContent = commentObj.author
    commentAuthor.dataset.id = commentObj.id

    commentTimestamp.className = "timestamp"
    const timestamp = commentObj.created_at.slice(0, 10)
    commentTimestamp.textContent = timestamp

    commentContent.className = "content"
    commentContent.textContent = commentObj.content

    commentDelete.className = "delete"
    commentDelete.textContent = "Remove Comment"
    commentDelete.dataset.id = commentObj.id

    commentLi.append(commentAuthor, commentTimestamp, commentContent, commentDelete)
    commentsUl.append(commentLi)
}

function renderAmenity(amenityObj) {
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

function renderRestaurant(restaurantObj) {
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
    if (event.target.className === "airport-image") {
        const id = event.target.dataset.id
        getAirportById(id)
        getAmenitiesThroughAA(id)
        getRestaurants(id)
        getStores(id)
        renderAirportCommentForm(id)
        getComments(id)
    }
    if (event.target.className === "airport-likebtn") {
        const id = event.target.dataset.id
        const airportLi = event.target.closest("li")
        const wholeAirportDiv = airportLi.parentElement.parentElement
   
        const likeButton = airportLi.querySelector("button")
        const newLikes = parseInt(likeButton.textContent) + 1

        // const numLikes = wholeAirportDiv.getElementsByClassName("airport-info-likes")
        // debugger
        // const newInfoLikes = parseInt(numLikes.textContent) + 1

        fetch(`http://localhost:3000/airports/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ likes: newLikes })
        })
            .then(response => response.json())
            .then(newLike => {

                likeButton.textContent = `${newLike.likes} 🛫`
                // newInfoLikes.textContent = `${newLike.likes} Likes`
            })
    }
})

function getAirportById(id) {
    fetch(`http://localhost:3000/airports/${id}`)
        .then(response => response.json())
        .then(airportObj => renderAirportInfoDiv(airportObj))

}

function getAmenities(amenId) {
    fetch(`http://localhost:3000/amenities`)
        .then(response => response.json())
        .then(amenitiesArray => {
            amenitiesArray.forEach(amenity => {
            if (amenity.id == amenId) {
            renderAmenity(amenity)
            }
        })
    })
}

function getAmenitiesThroughAA(id) {
    amenitiesUl.innerHTML = ""
    fetch(`http://localhost:3000/airport_amenities`)
        .then(response => response.json())
        .then(airportAmenitiesArray => {
            airportAmenitiesArray.forEach(aaObj => {
                if (aaObj.airport_id == id) {
                    const amenId = aaObj.amenity_id
                    getAmenities(amenId)
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
                if (restaurantObj.airport_id == id) {
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
                if (storeObj.airport_id == id) {
                    renderStore(storeObj)
                }
            })
        })
}
function getComments(id) {
    fetch('http://localhost:3000/comments')
        .then(response => response.json())
        .then(commentsArray => {
            commentsUl.innerHTML = ""
            commentsArray.forEach(commentObj => {
                if (commentObj.airport_id == id) {
                    renderComment(commentObj)
                }
            })
        })
}
//**** EVENT LISTENER FOR AIRPORT COMMENTS */

formDiv.addEventListener("submit", event => {
    event.preventDefault()

    const newName = event.target.name.value
    const newComment = event.target.comment.value
    const id = event.target.dataset.id

    fetch(`http://localhost:3000/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author: newName, content: newComment, airport_id: id }),
    })
        .then(response => response.json())
        .then(newPost => {
            renderComment(newPost)
        })

})

commentsUl.addEventListener("click", event => {

    if (event.target.matches("button")) {
        const id = event.target.dataset.id
        const commentLi = event.target.closest("li")
        commentLi.remove()
        deleteComment(id)
    }
})

function deleteComment(id) {
    fetch(`http://localhost:3000/comments/${id}`, {
        method: 'DELETE',
    })
}
