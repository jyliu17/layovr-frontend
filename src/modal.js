// const airportsUl = document.querySelector('#airports-ul')
// const airportsDetailOuterDiv = document.querySelector('#airport-detail-outer-div')
// const airportsDiv = document.querySelector('#airports-div')
// const amenitiesUl = document.querySelector('#amenities-ul')
// const restaurantsUl = document.querySelector('#restaurants-ul')
// const storesUl = document.querySelector('#stores-ul') 
// const formDiv = document.querySelector("#form-div")
// const commentsUl = document.querySelector("#comments-ul")
const modal = document.querySelector(".modal")
const span = document.getElementsByClassName("close")[0]
const modalContent = document.querySelector(".modal-content")
//******  Event Handler for amenitiesUl */


amenitiesUl.addEventListener("click", event => {

    if(event.target.className === "amenity-likebtn"){
        const id = event.target.dataset.id

        const amenityLi = event.target.closest("li")
    
        const likeButton = amenityLi.querySelector("button")
        const newLikes = parseInt(likeButton.textContent) + 1

        fetch(`http://localhost:3000/amenities/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ likes: newLikes })
        })
        .then(response => response.json())
        .then(newLike => {
         
        likeButton.textContent = `${newLike.likes} 🛫`
        })
    } 
    // if(event.target.matches(".amenity-image")){
    //     const id = event.target.dataset.id
    //     modal.style.display = 'block'
        //fetch amenity by id
        //then display amentiy contents/attributes on modal
    // }
})

span.onclick = () => {
    modal.style.display = "none";
}

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

restaurantsUl.addEventListener("click", event => {

    if(event.target.className === "restaurant-likebtn"){
        const id = event.target.dataset.id

        const restaurantLi = event.target.closest("li")
    
        const likeButton = restaurantLi.querySelector("button")
        const newLikes = parseInt(likeButton.textContent) + 1

        fetch(`http://localhost:3000/restaurants/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ likes: newLikes })
        })
        .then(response => response.json())
        .then(newLike => {
         
        likeButton.textContent = `${newLike.likes} 🛫`
        })
    }
    if(event.target.matches(".restaurant-image")){
        const id = event.target.dataset.id
        modal.style.display = 'block'
        getRestaurantById(id)
        
    }
})

function getRestaurantById(id) {
    fetch(`http://localhost:3000/restaurants/${id}`)
        .then(response => response.json())
        .then(restaurantObj => {
            modalContent.innerHTML = ""
            showRestaurantOnModal(restaurantObj)     
        })
}

function showRestaurantOnModal(restaurantObj) {
    const restaurantDetailDiv = document.createElement("div")
    const restaurantDetailH4 = document.createElement("h4")
    const restaurantDetailImgDiv = document.createElement("div")
    restaurantDetailImgDiv.className = "circular--square"
    const restaurantDetailImg = document.createElement("img")
    restaurantDetailH4.className = "restaurant-detail-name"
    restaurantDetailH4.textContent = restaurantObj.name
    restaurantDetailImg.className = "restaurant-image"
    restaurantDetailImg.dataset.id = restaurantObj.id
    restaurantDetailImg.src = restaurantObj.image
    const restaurantDetailCost = document.createElement("p")
    restaurantDetailCost.textContent = `${restaurantObj.cost}`
    restaurantDetailCost.className = "restaurant-detail-cost"
    const restaurantDetailCuisine = document.createElement("p")
    restaurantDetailCuisine.textContent = `Cuisine: ${restaurantObj.cuisine}`
    restaurantDetailCuisine.className = "restaurant-detail-cuisine"

    restaurantDetailImgDiv.append(restaurantDetailImg)
    restaurantDetailDiv.append(restaurantDetailH4, restaurantDetailImgDiv, restaurantDetailCost, restaurantDetailCuisine)
    modalContent.append(restaurantDetailDiv)
}



storesUl.addEventListener("click", event => {

    if(event.target.className === "store-likebtn"){
        const id = event.target.dataset.id

        const storeLi = event.target.closest("li")
    
        const likeButton = storeLi.querySelector("button")
        const newLikes = parseInt(likeButton.textContent) + 1

        fetch(`http://localhost:3000/stores/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ likes: newLikes })
        })
        .then(response => response.json())
        .then(newLike => {
         
        likeButton.textContent = `${newLike.likes} 🛫`
        })
    }
    if(event.target.matches(".store-image")){
        const id = event.target.dataset.id
        modal.style.display = 'block'
        getStoreById(id)
    }
})

function getStoreById(id) {
    fetch(`http://localhost:3000/stores/${id}`)
        .then(response => response.json())
        .then(storeObj => {
            modalContent.innerHTML = ""
            showStoreOnModal(storeObj)     
        })
}

function showStoreOnModal(storeObj) {
    const storeDetailDiv = document.createElement("div")
    const storeDetailH4 = document.createElement("h4")
    const storeDetailImgDiv = document.createElement("div")
    storeDetailImgDiv.className = "circular--square"
    const storeDetailImg = document.createElement("img")
    storeDetailH4.className = "store-detail-name"
    storeDetailH4.textContent = storeObj.name
    storeDetailImg.className = "store-image"
    storeDetailImg.dataset.id = storeObj.id
    storeDetailImg.src = storeObj.image
    const storeDetailCost = document.createElement("p")
    storeDetailCost.textContent = `${storeObj.cost}`
    storeDetailCost.className = "store-detail-cost"
    const storeDetailCategory = document.createElement("p")
    storeDetailCategory.textContent = `Category: ${storeObj.category}`
    storeDetailCategory.className = "store-detail-category"


    storeDetailImgDiv.append(storeDetailImg)
    storeDetailDiv.append(storeDetailH4, storeDetailImgDiv, storeDetailCost, storeDetailCategory)
    modalContent.append(storeDetailDiv)
}

    
